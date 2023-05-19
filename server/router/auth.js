const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dfilispou",
  api_key: "154533932989919",
  api_secret: "9ZQ1vw7nNrcLMcWOLxdjS_UoLzI",
});
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   folder: "knownfaces", // Specify the folder where you want to store the images
//   allowedFormats: ["jpg", "jpeg", "png"], // Specify the allowed image formats
// });

require("../db/conn");
const User = require("../model/userSchema");
const Investigator = require("../model/investigatorSchema");
const Comp = require("../model/complaintSchema");
const Invregi = require("../model/invregSchema");
// const upload = multer({ storage: storage });
const upload = multer({ dest: "uploads/" });
// const up = multer({ dest: "uploads/" });
router.get("/", (req, res) => {
  res.send("hello home page router");
});



router.post("/submit", upload.single("image"), async (req, res) => {
  const file = req.file;
  cloudinary.uploader
    .upload(file.path, { public_id: req.body.name, folder: "user" })
    .then(async (result) => {
      console.log(result["secure_url"]);
      console.log("File uploaded to Cloudinary");

      const name = req.body.name;
      const phone_no = req.body.phone_no;
      const image_url = result["secure_url"];
    
      if (!name || !phone_no || !image_url) {
        return res.status(422).json({ error: "please fill the required" });
      }

      try {
        const userExist = await User.findOne({ name: name });
        if (userExist) {
          return res.status(422).json({ error: "Name already Exist" });
        }

        const user = new User({ name, phone_no, image_url });

        await user.save();

        res.status(201).json({ message: "user registered successfully" });
      } catch (err) {
        console.log(err);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error uploading file to Cloudinary");
    });
});

router.post("/invreg", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(422).json({ error: "please fill the required" });
  }

  try {
    const invExist = await Invregi.findOne({ name: name });
    if (invExist) {
      return res
        .status(422)
        .json({ error: "Police station already registered" });
    }

    const inv = new Invregi({ name, password });

    await inv.save();

    res.status(201).json({ message: "police station registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/complaint", upload.single("images"), async (req, res) => {
    const file = req.file;
    cloudinary.uploader
      .upload(file.path, { public_id: req.body.cid+req.body.mname, folder: "complaints" })
      .then(async (result) => {
        console.log(result["secure_url"]);
        console.log("File uploaded to Cloudinary"); 
        const cimage_url = result["secure_url"];
        const cid = req.body.cid;
        const mname = req.body.mname;
        const mstate = req.body.mstate;
        const maddress = req.body.maddress;
        const mdate = req.body.mdate;
        const mlslocation = req.body.mlslocation;
        const iname = req.body.iname;
        const iaddress = req.body.iaddress;
        const mdescription = req.body.mdescription;
        const mphone_no = req.body.mphone_no;
      
        if (!cid || !mname || !mstate || !maddress || !mdate || !mlslocation || !iname || !iaddress || !mdescription || !mphone_no || !cimage_url) {
          return res.status(422).json({ error: "please fill the required" });
        }
  
        try {
          const compExist = await Comp.findOne({ cid: cid });
          if (compExist) {
            return res.status(422).json({ error: "Complaint already registered" });
          }
  
          const comp = new Comp({ cid, mname, mstate, maddress, mdate, mlslocation, iname, iaddress, mdescription, mphone_no, cimage_url });
  
          await comp.save();
  
          res.status(201).json({ message: "complaint registered successfully" });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error uploading file to Cloudinary");
      }); 
  
});
//login route

router.post("/login", async (req, res) => {
  try {
    let token;
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Please fill data" });
    }

    const invLogin = await Investigator.findOne({ username: username });

    //console.log(invLogin);

    if (invLogin) {
      const isMatch = await bcrypt.compare(password, invLogin.password);

      token = await invLogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
      } else {
        res.json({ message: "Investigator login successfully" });
      }
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;