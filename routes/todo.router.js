const express = require("express");

const {authmiddleware} = require('../middlewares');
const { todosControllers } = require('../controller');
const app = express();

const router = express.Router();

router.get("/",authmiddleware, todosControllers.getTodos);
router.post("/create",authmiddleware, todosControllers.createTodo);
router.put("/update-todo/:id",authmiddleware,todosControllers.updateTodo);
router.delete("/delete-todo/:id", todosControllers.deleteTodoById);

exports.todoRoute = app.use("/todo", router);
