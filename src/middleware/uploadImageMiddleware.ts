import multer from 'multer'
import ApiError from '../utils/ApiError'

const multerOption = ()=>{
    
// this for diskstorage 

// const multerStorage = multer.diskStorage(
//     {
//         destination : (req , file , cb)=>{
//             cb(null , './src/upload/category')
//         },
//         filename: (req ,file , cb)=>{
//             const ext = file.mimetype.split('/')[1]
//             const filename = `category-${uuidv4()}-${Date.now()}.${ext}`
//             cb(null , filename)
//         }
//     }
// )



// we used memory because it gets a buffer image 
const multerStorage = multer.memoryStorage()

    const multerFilter = function(req:any, file:any, cb:any){
    if(file.mimetype.startsWith('image')){
        cb(null, true);
    }else{
        cb(new ApiError('only image allow' , 400) , false)
    }
    }

    const upload = multer({storage : multerStorage , fileFilter :  multerFilter})
    return upload
}


export const uploadImage = (fieldName:string)=>  multerOption().single(fieldName)



export const uploadListImage = (fields: multer.Field[])=> multerOption().fields(fields)









