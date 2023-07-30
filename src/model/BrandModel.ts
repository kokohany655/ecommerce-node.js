import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema(
    {
        name: {type:String , unique:true , required:true , minLength : 2 , maxLength : 20},
        slug: {type:String , lowercase : true},

    },
    {
        timestamps: true
    }
)

const Brand = mongoose.model('Brand' , brandSchema)

export default Brand