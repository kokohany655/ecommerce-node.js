import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const userSchema =new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,'Please enter your Name'],
            trim:true
        },
        slug:{
            type:String,
            lowercase:true
        },
        email:{
            type:String ,
            required: true,
            unique: true,
            lowercase:true
        },
        passwordChangeAt: Date,
        phone:String,
        profileImg : String,
        resetPasswordCode:String,
        resetPasswordCodeExpire:Number,
        resetPasswordVerified:Boolean,
        password:{
            type:String ,
            required:true,
            minlength: 6
        },

        role:{
            type:String,
            enum:["user", "manager" , "admin"],
            default: "user"
        },
        active:{
            type: Boolean,
            default: true
        }
    },
    {
        timestamps:true
    }
)

userSchema.pre('save' , async function(next){
    this.password =await bcrypt.hash(this.password as string , 10)
    next()
})
const User = mongoose.model('User' , userSchema)

export default User