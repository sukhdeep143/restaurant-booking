const mongoose=require('mongoose')

require('dotenv').config()


const dbConnect=()=>{
        mongoose.
        connect(process.env.DATABASE_URL)
        .then(()=>console.log('DB connection Successful'))

        .catch((error)=>{
            console.log('DB connection Failed')
            console.error(error.message)
            process.exit(1)
        })
}

module.exports = dbConnect;