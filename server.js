const express= require ('express');
const cors=require('cors');
const connectDB=require('./src/config/database');

require('dotenv').config();

const app =express();
const PORT=process.env.PORT|| 8080;

//connect to mongoDB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//basic health check routes
app.get('/health',(req,res)=>{
    res.status(200).json({
        success:true,
        message: 'Server is running smoothly',
        timestamps: new Date().toISOString()
    });
});

// start server

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    console.log(`Health check : https:localhost:${PORT}/health`);

});
