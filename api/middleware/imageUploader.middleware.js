const multer = require("multer");
const fs = require('fs');


const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {  
        let path = "uploads";
        if(req.image_path){
            path = req.image_path;
        }
        if(!fs.existsSync(path)) {
            fs.mkdirSync(path, {recursive: true});
        }
        cb(null, path);
    },
    
    filename: (req, file, cb) => {
        let filename = Date.now()+"-"+file.originalname;
        cb(null, filename);

    }
});

const imageFilter = (req, file, cb) => {
    let parts = file.originalname.split(".");
    let ext = parts[parts.length-1];

    let allowed = ['jpg','png','jpeg','bmp','svg','webp','gif'];
    
    if(allowed.includes(ext)){
        // file size 
        // control
        cb(null, true);            
    } else {
        cb(null, false);
    }
}

const imageUploader = multer({
    storage: myStorage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 5000000
    }
})

module.exports = imageUploader;