import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        cartItems:[
            {
                product:{
                    type : mongoose.Schema.Types.ObjectId ,
                    ref:"Product"
                },
                quantity:Number,
                color:String,
                price:Number
            }
        ],

        taxPrice:{type:Number, default:0},
        shippingPrice:{type:Number , default:0},
        totalOrderPrice :Number ,

        shippiingAddress:{
            details:String,
            phone:String,
            city:String,
            postalCode :String
        },
        
        PaymentMethod : {
            type:String,
            enum:["card" , "cash"],
            default:'cash'
        },
        isPaid:{type:Boolean, default:false},
        paidAt:Date,
        isDelivered:{type:Boolean , default:false},
        deliveredAt : Date
    },{
        timestamps:true
    }
)

orderSchema.pre(/^find/ , function(next){
    this.populate([
        {path:"user" , select:"name profileImg email phone" },
        {path:"cartItem.product" , select:'title imageCover'}
    ])

    next()
})
const Order = mongoose.model('Order' , orderSchema)

export default Order