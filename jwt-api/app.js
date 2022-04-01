const express = require('express');
const app = express();
const Router = express.Router()
const bodyParser = require('body-parser')

const UserModel = require('./Models/User')
const MiddleWare =  require('./MiddleWare/JwtAuth')

Router.get('/test-route',function(req,res,next){
    
    return res.json({'name':req.body.userName},200)
})


Router.post('/get-access-loken',UserModel.createToken);

Router.post('/get-user-post',MiddleWare.verifyToken,UserModel.getPosts);
Router.post('/test',UserModel.getPosts);


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
 }));
 
app.use(Router)

app.listen(3000,function(err){
    if(err)
        throw new Error('Server Not started')
});