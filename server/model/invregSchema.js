const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');
// const bcrypt = require('bcryptjs');

const invregSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens: [
        {
            token: {
                type:String,
                required:true
            }
        }
    ]
})

// invregSchema.pre('save',async function(next){
//     if(this.isModified('password')){
//         this.password=bcrypt.hash(this.password,12);

//     }
//     next();
// })


invregSchema.methods.generateAuthToken = async function(){
    try{
      let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({token:token});
      await this.save();
      return token;
    }catch(err){
        console.log(err);
    }
}


const Invreg = mongoose.model('INVREG',invregSchema);
module.exports = Invreg;