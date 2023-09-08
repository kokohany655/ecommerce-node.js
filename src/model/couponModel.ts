import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema({
    name:{type:String , trim :true , required:true , unique:true},
    expire:{type:Date , require:true},
    discount:{type:Number, required:true}
},
{
    timestamps:true
}
)

const Coupon = mongoose.model('Coupon' ,couponSchema) 

export default Coupon