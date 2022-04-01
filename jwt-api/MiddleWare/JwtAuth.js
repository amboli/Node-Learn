const dotenv = require('dotenv')
dotenv.config()
const JWT = require('jsonwebtoken')


module.exports.verifyToken = (req,res,next) =>{
    
    let TOKEN =  req.headers.authorization.split(" ")[1]
    try{
        const decode = JWT.verify(TOKEN,process.env.JWT_SECRET_KEY)
    }
    catch(err){
        // next(err)
        res.status(403).json({'status' : false , 'msg' :  'EXPIRED TOKEN'})
    }
    next();
}