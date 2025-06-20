const multer=require('multer');
const path=require('path');
const {v4:uuidv4}=require('uuid');

const storage =multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

const fileFilter=(req,file,cb)=>{
    const allowedTypes=/jpeg|jpg|png|gif|pdf|doc|docx|txt|zip|rar/;
    const extname=allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype=allowedTypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb(new Error('Invalid file type. only images,documents,and archives are allowed'));

    }
};
const upload =multer({
    storage:storage,
    limits:{
        fileSize:10*1024*1024 // 10 MB
    },
    fileFilter:fileFilter   
});

module.exports=upload;