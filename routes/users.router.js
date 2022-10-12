const express = require("express");

const { userControllers } = require('../controller');
const {authmiddleware} = require("../middlewares");

const app = express();

const router = express.Router();

router.get("/", userControllers.getUser);
router.post('/singup', userControllers.signUpUser);
router.get('/:id',authmiddleware, userControllers.findUserById);
router.post('/signin', userControllers.signIn);

exports.userRoute = app.use("/user", router);
