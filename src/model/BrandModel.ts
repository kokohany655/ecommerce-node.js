import mongoose from 'mongoose'

const brandSchema = new mongoose.Schema(
    {
        name: {type:String , unique:true , required:true , minLength : 2 , maxLength : 20},
        slug: {type:String , lowercase : true},
        image: String
    },
    {
        timestamps: true
    }
)

const setImage = (doc:any)=>{
    if(doc.image){
        doc.image  = `${process.env.BASE_URL}/brand/${doc.image}`
       }
}

brandSchema.post('init', function(doc) {
   setImage(doc)
});

brandSchema.post('save', function(doc) {
    setImage(doc)
 });

const Brand = mongoose.model('Brand' , brandSchema)

export default Brand