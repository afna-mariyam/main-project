const mongoose=require('mongoose');

const messageBoxSchema = new mongoose.Schema({
    cmpid:{
        type:String,
        required:true
    },
    miname:{
        type:String,
        required:true
    },
    inname:{
        type:String,
        required:true
    },
    mphoto:{
        type:String,
        required:true
    },
    person:{
        type:String,
        required:true
    },
    uphone:{
        type:Number,
        required:true
    },
    
    sphoto:{
        type:String,
required:true
    },
   
    uloc:{
        type:String,
        required:true
    }

})
const Message = mongoose.model('MESSAGE',messageBoxSchema);
module.exports = Message;