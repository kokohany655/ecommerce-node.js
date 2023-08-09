import mongoose from 'mongoose'

const categorySchema =new mongoose.Schema(
    {
        name:{type:String , unique:true , minlength:3 , maxlength: 20, required:true},
        slug:{type:String , lowercase:true},
        image:String
    },
    {
        timestamps:true
    }
)

const setImage = (doc:any)=>{
    if(doc.image){
        doc.image  = `${process.env.BASE_URL}/category/${doc.image}`
       }
}

categorySchema.post('init', function(doc) {
   setImage(doc)
});

categorySchema.post('save', function(doc) {
    setImage(doc)
 });

const Category = mongoose.model('Category' , categorySchema)

export default Category