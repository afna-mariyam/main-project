const mongoose=require('mongoose');

const complaintSchema = new mongoose.Schema({
    cimage_url:{
        type:String,
    },
    cid:{
        type:String,
        required:true
    },
    mname:{
        type:String,
        required:true
    },
    mstate:{
        type:String,
        required:true
    },
    maddress:{
        type:String,
        required:true
    },
    mdate:{
        type:Date,
        required:true
    },
    mlslocation:{
        type:String,
        required:true
    },
    iname:{
        type:String,
        required:true
    },
    iaddress:{
        type:String,
        required:true
    },
    
    mdescription:{
        type:String
    },
    mphone_no:{
        type:Number,
        required:true
    }
})

const Comp = mongoose.model('COMP',complaintSchema);
module.exports = Comp;