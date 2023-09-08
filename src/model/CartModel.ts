import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema(
    {
        cartItem:[
            {
                product:{
                    type : mongoose.Schema.Types.ObjectId,
                    ref: "Product"
                },
                quantity:{
                   type:Number ,
                   default:1 
                },
                price:Number,
                color:String
            }
        ],
        totalPriceCart :Number,
        TotalPriceAfterDiscount : Number,
        user:{
            type:mongoose.Schema.Types.ObjectId ,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
)

const Cart = mongoose.model('Cart' , cartSchema)

export default Cart