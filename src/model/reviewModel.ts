import mongoose from 'mongoose'
import Product from './ProductModel'

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
reviewSchema.statics.calculateAvgAndRating = async function (productId:string) {
    const result = await this.aggregate([
        {$match: {'product': productId}},
        {$group: {_id:'$ratings' , ratingAverge : {$avg : 'ratings'} , ratingQuantity : {$sum:1}}},
    ])
    if(result.length > 0){
        await Product.findByIdAndUpdate(productId , 
            {
                ratingAverge : result[0].ratingAverge,
                ratingQuantity : result[0].ratingQuantity
            },{new : true})
    }else{
        await Product.findByIdAndUpdate(productId , 
            {
                ratingAverge : 0,
                ratingQuantity : 0
            },{new : true})
    }
}

reviewSchema.post('save' ,async function () {
  await this.constructor.prototype.calculateAvgAndRating(this.product)
})

reviewSchema.post('remove' ,async function () {
    await this.constructor.prototype.calculateAvgAndRating(this.product)
  })

reviewSchema.pre(/^find/ , function(next){
    this.populate({path:'user' , select:'name'})
    next()
})

const Review = mongoose.model('Review' , reviewSchema)

export default  Review