import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema(
    {
        username: {type: String, unique: true},
        password: String,
        type: String,
        name: String,
        lastname: String,
        gender: String,
        address: String,
        phone_number: String,
        mail: { type: String, unique: true},
        credit_card_number: String,
        picture: {type: String},
        blokiran: Number 
        
    },{
      versionKey:false  
    }
);

userSchema.pre('save',function(next){
  const user = this;

  if(!user.isModified('password')) return next()

  bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt) {
    if(err) return next(err)

    bcrypt.hash(user.password!,salt,function(err,hash){
      if(err) return next(err)

      user.password = hash
      next()
    })
  })
})

export default mongoose.model('User',userSchema, 'users');