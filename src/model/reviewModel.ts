import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
    {
        title :String,
        ratings : {type:Number , min:1 , max:5 , required:true},
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required:true
        },
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product',
            required : true 
        }
    }
)

reviewSchema.pre(/^find/ , function(next){
    this.populate({path:'user' , select:'name'})
    next()
})

const Review = mongoose.model('Review' , reviewSchema)

export default  Review