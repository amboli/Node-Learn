const multer = require("multer")

module.exports.fileUpload = (req,res,next) =>{
    // if(err){

    //     return res.status(403).json({'status' : false , 'msg' : err})
    // }
    return res.status(200).json({'status' : true , 'msg' : 'File Upload successfully'})
}