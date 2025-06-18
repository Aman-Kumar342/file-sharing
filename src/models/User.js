const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password:{
        type:String,
        requires:true,
        minlength:6
    },
    name:{
        type:String,
        requires:true,
        trim:true
    },
    isActive:{
        type:Boolean,
        default: true
    }
},{
    timestamps: true
});

// hash password before saving

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    try{
        const salt =await bcrypt.genSalt(12);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }catch(err){
        next(err);
    }
});

// compare password method

userSchema.methods.comparePassword=async function(candidatePassword){
    return await bcrypt.compare(candidatePassword,this.password);
};

module.exports=mongoose.model('user',userSchema);