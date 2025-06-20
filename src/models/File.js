const mongoose =require('mongoose');


    const fileSchema=new mongoose.Schema({
        filename:{
            type:String,
            required:true
        },
        originalName:{
            type:String,
            required:true
        },
        mimetype:{
            type:String,
            required:true
        },
        size:{
            type:Number,
            required:true
        },
        uploadDate:{
            type:Date,
            default:Date.now
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        s3Key:{
            type:String,
            required:false
        },
        localPath:{
            type:String,
            required:false
        },
        shareToken:{
            type:String,
            unique:true,
            sparse:true
        },
        expiresAt:{
            type:Date,
            required:false
        }
    },{
        timestamps: true,
        
    });
    module.exports = mongoose.model('File', fileSchema);