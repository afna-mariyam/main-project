const jwt = require('jsonwebtoken');
const mongoose=require('mongoose');
// const bcrypt = require('bcryptjs');

const investigatorSchema = new mongoose.Schema({
    username:{
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


// investigatorSchema.pre('save',async function(next){
//     if(this.isModified('password')){
//         this.password=bcrypt.hash(this.password,12);

//     }
//     next();
// })
 

//token generate

investigatorSchema.methods.generateAuthToken = async function(){
    try{
      let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({token:token});
      await this.save();
      return token;
    }catch(err){
        console.log(err);
    }
}


const Investigator = mongoose.model('INVESTIGATOR',investigatorSchema);
module.exports = Investigator;