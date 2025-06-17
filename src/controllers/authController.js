const User=require('../models/User');

const{generateToken}=require('../utils/jwt');
const {registerSchema,loginSchema}=require('../utils/validation');;

const register=async(req,res)=>{
    try{
        const {error,value}=registerSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                success:false,
                message:error.details[0].message
            });
        }
        const {name, email,password}=value;

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(409).json({
                success:false,
                message:'user already exists'
            });
        }

        const user=new user({ name, email,password});
        await user.save();
        const token=generateToken({
            userId:user._id,
            email: user.email
        });
        res.status(201).json({
            success:true,
            message:'user regsterd succesfully',
            data:{
                token,
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email
                }
            }
        });
    }
    catch(error){
        console.error('Registration error:', error);
        res.status(500).json({
            success:false,
            message:'Internal server error'
        });
    }
};

const login=async(req,res)=>{
    try{
        // validate input
        const{error,value}=loginSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                success:false,
                message:error.details[0].message
            });
        }
        const {email,password}=value;
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:'invalid email or password'
            });
        }

        // check password
        const isPasswordValid=await user.comparePssword(password);
        if(!isPasswordValid){
            return res.status(401).json({
                success:false,
                message:'invalid email or password'
            });
        }

        // generate token 

        const token =generateToken({
            userId: user._id,
            email:user.email
        });
        res.status(200).json({
            success:true,
            message:'login successfully',
            data:{
                token,user:{
                    id:user._id,
                    name:user.name,
                    email:user.email
                }
            }
        });

    }
    catch(error){
        console.error('login error',error);
        res.status(500).json({
            success:false,
            message:'internal server error'
        });
    }
};
module.exports={
    register,
    login
};