const mongoose=require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    phone_no:{
        type:Number,
        required:true
    },
    image_url:{
        type:String,
    }
})


const User = mongoose.model('USER',userSchema);
module.exports = User;