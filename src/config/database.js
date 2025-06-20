const mongoose =require('mongoose');
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn;

    }catch(error){

        console.error(`Data base connection Error: ${error.message}`);
        process.exit(1);
    }
};
module.exports=connectDB;