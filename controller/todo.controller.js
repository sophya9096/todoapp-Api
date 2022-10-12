const { TodoModel } = require("../models");

ObjectId = require('mongoose').Types.ObjectId;


exports.getTodos = async (req, res) => {
  const { id } = req.user;
  console.log(id);
  try {
    const task = await TodoModel.find({ createdBy: id }).populate("createdBy", {
      password: 0,
    });
    console.log(task);
    console.log(task.lenght);
    if (task.lenght < 1) {
      return res.send({
        sucess: false,
        message: "you dont have any task",
      });
    }
    res.send({
      sucess: true,
      task,
    });
  } catch (error) {
    console.log("internal server error: ", error.message);
  }
};

exports.createTodo = async (req, res) => {
  const { title, description, isCompleted } = req.body;

  try {
    const todo = await TodoModel.create({
      title,
      description,
      isCompleted,
      createdBy: req.user.id,
    });
    todo.save();
    res.send({
      sucess: true,
      message: "User todo create sucessfully!",
      todo,
    });
  } catch (error) {
    console.log("internal server error: ", error.message);
  }
};

exports.updateTodo = async (req, res) => {
  const { id } = req.params;

  const updateKeys = Object.keys(req.body);
  const allowedKeys = ["title", "description", "isCompleted"];
  const isValidKey = updateKeys.every((key) => allowedKeys.includes(key));
  if (!ObjectId.isValid(id)) {
    return res.status(400).send({
      sucess: false,
      message: "please provide valid todo id"
    })
  }
  if (!isValidKey) {
    return res.send({
      sucess: false,
      message: "please provide valid keys",
    });
  }
  if(updateKeys < 1){
    return res.send({
        sucess: false,
        message: "Fields are required in body",
      });
  }
  try {
    const updateTodo = await TodoModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updateTodo) {
      return res.status(404).send({
        sucess: false,
        message: "task not found",
      });
    }
    res.send({
      sucess: true,
      updateTodo,
    });
  } catch (error) {
    console.log("internal server error: ", error.message);
  }
};

exports.deleteTodoById = async(req,res)=>{
    const {id} = req.params;
    if (!ObjectId.isValid(id)) {
        return res.status(400).send({
          sucess: false,
          message: "please provide valid todo id"
        })
      }

    try {
        const deleteTask = await TodoModel.findByIdAndDelete(id);
        if (!deleteTask) {
            return res.status(400).send({
                sucess: false,
                message: "task not found",
            })
        }
        res.send({
            sucess: true,
            message: 'Task delete sucessfully'
        })
    } catch (error) {
        console.log("internal server error: ", error.message);
    }
}