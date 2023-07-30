import mongoose from 'mongoose'

const subCategorySchema =new mongoose.Schema(
    {
        name:{type:String , trim: true , unique:true , minLength:2 , maxLength:20},
        slug:{type:String , lowercase:true},
        category:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Category",
            required:true
        }
    },
    {
        timestamps: true
    }
)

const SubCategory = mongoose.model('SubCategory' , subCategorySchema)

export default SubCategory