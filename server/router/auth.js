
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const axios=require("axios");
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
const Invreg = require("../model/invregSchema");
const Message = require("../model/messageBoxSchema");
// const upload = multer({ storage: storage });
const upload = multer({ dest: "uploads/" });
// const up = multer({ dest: "uploads/" });
router.get("/", (req, res) => {
  res.send("hello home page router");
});

router.post("/api1/msgbx", async (req, res) => {
  console.log('hi');
const cmp = req.body.cmpid;
const cm=cmp[0];
// console.log(cm);
const bmp=req.body.person;
const bm=bmp[0];
// console.log(bm);
const a=await Comp.findOne({ cid:cm });
const b = await User.findOne({ name:bm })
console.log(a.mname);

const cmpid=cm;
// console.log(a);
const miname = a.mname;
console.log(miname);
const inname = a.iname;
const mphoto = a.cimage_url;
const person = bm;
const uphone = b.phone_no; 
const sphoto = b.image_url;
const uloc = b.loc;
const message = new Message({ cmpid, miname, inname,mphoto,person,uphone,sphoto,uloc });
// cmpid, miname, inname,mphoto,person,uphone,sphoto 
      await  message.save();
});



router.post("/api1/submit", upload.single("image"), async (req, res) => {
  const file = req.file;
  cloudinary.uploader
    .upload(file.path, { public_id: req.body.name, folder: "user" })
    .then(async (result) => {
      console.log(result["secure_url"]);
      console.log("File uploaded to Cloudinary");

      const name = req.body.name; 
      const phone_no = req.body.phone_no;
      const image_url = result["secure_url"];
      const loc = req.body.loc;
      console.log(name);
      console.log(loc);
      if (!name || !phone_no || !image_url || !loc) { 
        return res.status(422).json({ error: "please fill the required" });
      }
 
      try { 
        // const userExist = await User.findOne({ name: name });
        // if (userExist) {
        //   return res.status(422).json({ error: "Name already Exist" });
        // }

        const user = new User({ name, phone_no, image_url,loc });

        await user.save();
        
        res.send(image_url);
        
      } catch (err) {
        console.log(err);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error uploading file to Cloudinary");
    });
});

router.get('/api1/fetchcomplaint', async (req, res) => {
  try {
    const comp = await Comp.find();
    res.json(comp);
  } catch (error) {
    console.error('Error retrieving data', error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});


router.get('/api1/fetchmessage', async (req, res) => {
  try {
    const message = await Message.find();
    res.json(message);
  } catch (error) {
    console.error('Error retrieving data', error);
    res.status(500).json({ error: 'Failed to retrieve data' });
  }
});

router.post('/api1/deletecomplaint', async (req, res) => {
  try {
    const recordId  = req.body.variable;
    num=recordId+1
    console.log(num);
    const records = await Comp.find({}).sort({ _id: 1 }).limit(parseInt(num));
    if (records.length === 0) {
      return res.status(404).json({ error: 'Record not found' });
    }
    console.log(records)
    const recordToDelete = records[records.length-1];
    console.log(recordToDelete)
    await Comp.findByIdAndDelete(recordToDelete._id); 
      // await Comp.findOneAndDelete({ cid:recordId });
      res.status(200).json({ message: 'Record deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the record' });
    }
  });

router.post("/api1/stationreg", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(422).json({ error: "please fill the required" });
  }

  try {
    const invExist = await Invreg.findOne({ name: name });
    if (invExist) {
      return res
        .status(422)
        .json({ error: "Police station already registered" });
    }

    const inv = new Invreg({ name, password });

    await inv.save();

    res.status(201).json({ message: "police station registered successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/api1/complaint", upload.single("cimage_url"), async (req, res) => {
    const file = req.file;
    cloudinary.uploader
      .upload(file.path, { public_id: req.body.cid+"_"+req.body.mname, folder: "complaints" })
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
  
          res.send(cimage_url);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error uploading file to Cloudinary");
      }); 
  
});


router.get('/api1/fetchcimageurl', async (req, res) => {
  try {
    const comp = await Comp.find(); 
     
    
    res.json(comp);
    // console.log(comp);
  } catch (error) {
    console.error('Error retreiving data', error);
    res.status(500).json({error:'failed to retrieve data'});
  }
  }
);

 

router.get('/api1/fetchimageurl', async (req, res) => {
  try {
    const user = await User.find(); 
    
    
    res.json(user);
    // console.log(comp);
  } catch (error) {
    console.error('Error retreiving data', error);
    res.status(500).json({error:'failed to retrieve data'});
  }
  }
);
//login route

router.post("/api1/login", async (req, res) => {
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


router.post('/api1/invreg', async (req, res) => {
  try{
  const { name, password } = req.body;
  console.log(name);
  console.log(password);
  if (!name || !password) { 
    return res.status(400).json({ error: "Please fill data" });
  }
  const inv = await Invreg.findOne({ name: name });
  console.log(inv);
  if(inv){
  if(password===inv.password){
    res.json({ message: "Investigator login successful" });

  }}
  else{
    res.status(400).json({ error: "Invalid credentials" });
  }}
  catch (err) {
    console.log(err);
  }
}
);

module.exports = router;