const dotenv = require('dotenv')
dotenv.config()
const JWT = require('jsonwebtoken')

module.exports.createToken = (req,res,next) =>{
    let  TOKEN;
    try{
        
        TOKEN  =JWT.sign({'username' : req.body.userName},process.env.JWT_SECRET_KEY,{
                expiresIn : '20s'
            })
        }
    catch(err)
        {
            console.log(err)
            const error = new Error('Something Wrong')
            next(error)
        }
    res.status(200).json({'userName' : req.body.userName ,'accessToken' : TOKEN})    
}

module.exports.getPosts = (req,res,next) =>{
    res.status(200).json({'status' : true,'result':['first post']});
}
