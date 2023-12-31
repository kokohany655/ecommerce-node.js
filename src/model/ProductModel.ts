import mongoose ,{Schema} from 'mongoose'

const productSchema:Schema =new mongoose.Schema({
    title:{
        type:String,
        required:[true,'product title is requierd'],
        minlength:[3 , 'Too short product title'],
        maxlength:[100 , 'Too long product title']
    },
    slug:{
        type:String,
        requierd:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:[true,'product description is required'],
        minlength:[20, "Too short product description"]
    },
    quantity:{
        type:Number,
        required:[true, "product quantity is required"]
    },
    sold:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:[true, "product price is required"],
        max:[200000 , 'Too long price']
    },
    priceAfterDicount:{
        type:Number
    },
    imageCover:{
        type:String,
        required:[true, 'porduct image cover is required']
    },
    colors:[String],
    image:[String],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:[true, 'product must be belong to category']
    },
    subCategory:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'SubCategory'
    }],
    brand:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand'
    },
    ratingAverge:{
        type:Number,
        min:[1,'rating must above or equal 1.0'],
        max:[5,'rating must be below or equal 5.0']
    },
    ratingQuantity:{
        type:Number,
        default:0
    }
},
{
    timestamps:true ,
    toJSON:{virtuals : true},
    toObject:{virtuals : true}

}
)

productSchema.virtual('reviews' ,{
    ref:'Review' ,
    foreignField : "product", 
    localField :'_id'
})

productSchema.pre(/^find/ , function(next){
    this.populate([
        { path:"category" , select :"name -_id"},
        { path : "reviews" , select : "name"}
    ])
    next()
})

const setImage= (doc:any)=>{
    if(doc.imageCover){
        doc.imageCover = `${process.env.BASE_URL}/product/${doc.imageCover}`
    }

    if(doc.image){
        const imageList: string[] = []
        doc.image.forEach((img:any)=> {
            const image_url = `${process.env.BASE_URL}/product/${img}`
            imageList.push(image_url)
        });
        doc.image = imageList
    }
}

productSchema.post('init', function(doc) {
    setImage(doc)
  });

  productSchema.post('save', function(doc) {
    setImage(doc)
  });

const Product =mongoose.model('Product' , productSchema)

export default Product