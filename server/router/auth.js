const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dfilispou',
    api_key: '154533932989919',
    api_secret: '9ZQ1vw7nNrcLMcWOLxdjS_UoLzI'
  });
  

require('../db/conn');
const User = require("../model/userSchema");
const Investigator = require("../model/investigatorSchema");
const Comp = require("../model/complaintSchema");
const Invregi = require("../model/invregSchema");

router.get('/', (req, res) => {
    res.send('hello home page router');
});

// using promises 

// router.post('/submit', (req,res)=>{

//     const { name,phone_no,image_url } = req.body;

//     if(!name || !phone_no ||!image_url) {
//         return res.status(422).json({error:"please fill the required"});
//     }

//     User.findOne({name:name})
//     .then((userExist)=>{
//         if(userExist){
//             return res.status(422).json({ error: "Name already Exist"});
//         }

//         const user = new User({name,phone_no,image_url});

//         user.save().then(()=>{
//             res.status(201).json({message:"user registered successfully"});
//         }).catch((err)=> res.status(500).json({error:"Failed to register"}));
//     }).catch(err=>{console.log(err);});
// })

// Async-Await
// Handle image upload
// router.post('/upload', async (req, res) => {
//     try {
//       const result = await cloudinary.uploader.upload(req.body.image);
//       // Store the image URL in MongoDB
//       const image_url = new Image({ url: result.secure_url });
      
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   });

router.post('/submit', async (req,res)=>{
    console.log(req.body)
    // const image=req.file
    // const { name,phone_no,image } = req.body;
    // try {
    //     const result = await cloudinary.uploader.upload(image);
    //     // Store the image URL in MongoDB
    //      image_url = new Image({ url: result.secure_url });
    //     console.log(image_url);
    //   } catch (err) {
    //     console.error(err);
    //     res.status(500).json({ message: 'Server error' });
    //   }
    // if(!name || !phone_no || !image_url) {
    //     return res.status(422).json({error:"please fill the required"});
    // }

    // try{
     
    // const userExist = await User.findOne({name:name});
    // if(userExist){
    //     return res.status(422).json({ error: "Name already Exist"});
    // }

    // const user = new User({name,phone_no,image_url});

    // await user.save();    

    // res.status(201).json({message:"user registered successfully"});

    // } catch(err){
    //     console.log(err);
    // }

});






router.post('/invreg', async (req,res)=>{

    const { name,password } = req.body;

    if(!name || !password ) {
        return res.status(422).json({error:"please fill the required"});
    }

    try{
     
    const invExist = await Invregi.findOne({name:name});
    if(invExist){
        return res.status(422).json({ error: "Police station already registered"});
    }

    const inv = new Invregi({name,password});

    await inv.save();    

    res.status(201).json({message:"police station registered successfully"});

    } catch(err){
        console.log(err);
    }

});


router.post('/complaint', async (req,res)=>{

    const {cid,mname,mstate,maddress,mdate,mlslocation,iname,iaddress,mdescription,mphone_no  } = req.body;

    // if(!cid || !mname || !mstate || !maddress ||! mdate || !mlslocation || !iname|| !iaddress || !mdescription || !mphone_no ) {
    //     return res.status(422).json({error:"please fill the required"});
    // }

    try{
     
    // const compExist = await Comp.findOne({name:name});
    // if(userExist){
    //     return res.status(422).json({ error: "Name already Exist"});
    // } 

    const comp = new Comp({cid,mname,mstate,maddress,mdate,mlslocation,iname,iaddress,mdescription,mphone_no});

    await comp.save();    

    res.status(201).json({message:"complaint registered successfully"});

    } catch(err){
        console.log(err);
    }

});
//login route

router.post('/login',async (req,res)=>{
    try{
        let token;
        const { username, password } =req.body;

        if(!username || !password){
            return res.status(400).json({error:"Please fill data"});
        }
        
        const invLogin = await Investigator.findOne({username:username});

        //console.log(invLogin);

        if(invLogin){
            const isMatch = await bcrypt.compare(password, invLogin.password);

            token = await invLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly:true
            });


            if(!isMatch){
                res.status(400).json({ error:"Invalid credentials"});
            } else{
                res.json({message:"Investigator login successfully"});
            }
        }else{
            res.status(400).json({ error:"Invalid credentials"});
        }

        
        


    } catch(err) {
        console.log(err);
    }
})



module.exports = router;