import fs from 'fs'
import database from '../../config/database'
import Product from '../../model/ProductModel'
import dotenv from 'dotenv'

dotenv.config({path: '../../../.env'})

database()

const parse:any= fs.readFileSync('./product.json')

const products = JSON.parse(parse)

const insert  = async()=>{
    try {
        await Product.create(products)
        console.log('data inserted')
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

const deleteData = async()=>{
    try{
        await Product.deleteMany()
        console.log('data deleted')
        process.exit()
    }catch(error){
        console.log(error)
    }

}

if(process.argv[2] === '-i'){
    insert()
}else if(process.argv[2] === '-d'){
    deleteData()
}