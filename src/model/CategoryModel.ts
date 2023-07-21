import mongoose from 'mongoose'

const categorySchema =new mongoose.Schema(
    {
        name:{type:String , unique:true , minlength:3 , maxlength: 20, required:true},
        slug:{type:String , lowercase:true}
    },
    {
        timestamps:true
    }
)

const Category = mongoose.model('Category' , categorySchema)

export default Category