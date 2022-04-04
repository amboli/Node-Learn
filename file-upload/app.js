const express = require('express');
const app = express();
const path = require('path');
const Router = express.Router()
const bodyParser = require('body-parser')

const UserModel = require('./Models/UserModel')

const multer = require('multer')


// step-1  configer storage

const StorageConf = multer.diskStorage({
    destination : path.join(__dirname,'assets','images'),
    filename    : (req,file,cb) =>{
        cb(null,file.fieldname + '_' + new Date().toDateString() + ' ' + path.extname(file.originalname))
    }
})

// step-2 set file size or limit

const maxSize = { fileSize : 1 * 1000 * 1000 }


/**
 *  step -3 file filter
 *      specific extension allowed
 *      
 * */

const fileFilter = (req,file,cb) =>{

    if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
        return cb(new Error('Only png|Jpg|Jpeg format allowed'))
    }
    cb(null,true)
}


// step -4 prepare multer file object

const imageUpload = multer({
    storage :   StorageConf,
    limits  :   maxSize,
    fileFilter
})


Router.post('/file-upload',imageUpload.single('image'),UserModel.fileUpload)


// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(Router)

app.use((err, req, res, next) => {
    
    if(typeof err.message === 'object'){
        err.message = err.message.join(",")
    }
    res.status(403).json({'status' : false,'msg' : err.message})
  })

app.listen(3000)

