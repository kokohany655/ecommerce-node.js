import mongoose from 'mongoose'

const database = ()=>{
    mongoose.connect(`${process.env.DB_URI}`).then(con=>{
        console.log(`Datebase Connecting...${con.connection.host}`)
    }).catch(err=>{
        console.log(`Database Error:${err}`)
        process.exit(1)
    })
}

export default database
