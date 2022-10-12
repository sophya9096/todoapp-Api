const jwt = require('jsonwebtoken');

const { config } = require('../config');
const {userModel} = require('../models');

module.exports = async(req,res,next)=>{
    const token = req.header("x-auth-header");
    if(!token){
        return res.status(400).send({
            sucess: false,
            message: "Please provide Token",
        })
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findById({_id: decoded.id});
        if(!user){
            return res.status(404).send({
                sucess: false,
                message: "user dose not exist",
            })
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log("token Error" , error.message);
        return res.status(401).send({
            sucess: false,
            message: 'token is not valid',
        })
    }
}