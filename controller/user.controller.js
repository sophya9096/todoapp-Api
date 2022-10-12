const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
ObjectId = require('mongoose').Types.ObjectId;

const {config} = require('../config');
const { userModel } = require('../models');

exports.getUser = async (req, res) => {
  res.json({ sucess: true, message: "User router work fine" });
};

exports.signUpUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({
      sucess: false,
      message: "username and password required",
    });
  }
  try {
    const user = await userModel.findOne({username});
    if (user) {
      res.status(409).send({
        sucess: false,
        message: "user already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const createUser = await userModel.create({
      username,
      password: hashPassword,
    });

    createUser.save();
    return res.send({
      sucess: true,
      username: createUser.username,
      message: "user created sucessfully",
    });
  } catch (error) {
    console.log(`server error: ${error.message}`);
  }
};
exports.findUserById = async(req,res)=>{
  const {id} = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      sucess: false,
      message: "please provide valid Object id"
    })
  }
  if(!id){
    return res.status(400).send({
      sucess: false,
      message: "please provide user id",
    })
  }
  try {
    const user = await userModel.findById({_id: id}).select("-password");
  if (!user) {
    return res.status(400).send({
      sucess: false,
      message: 'user not found'
    })
  }
  return res.send({
    sucess: true,
    message: 'user found sucessfully',
    user,
  })
  } catch (error) {
    console.log(`server error: ${error.message}`);
  }
}

exports.signIn = async(req,res)=>{
  const {username, password}= req.body;
  if(!username || !password){
    return res.status(400).send({
      sucess: false,
      message: 'please provide username and password',
    })
  }
  try {
    const user = await userModel.findOne({username});
    if (!user) {
      return res.status(400).send({
        sucess: false,
        message: 'user not found!'
      })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).send({
        sucess: false,
        message: 'please provide valid password',
      })
    }
    const payLoad = {
      username: user.username,
      id: user._id,
    }
    const token = jwt.sign(payLoad,config.JWT_SECRET,{
      expiresIn: "1h"
    });
    return res.send({
      sucess: true,
      message: "User login Sucessfully",
      token,
      id: user._id,
    })
  } catch (error) {
    console.log(`server error: ${error.message}`);
  }
}