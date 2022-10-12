const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    title:{
        type: String,
        require: true,
        trim: true,
    },
    description: {
        type: String,
        require: true,
        trim: true,
    },
    isCompleted: {
        type: Boolean,
        require: true,
        default: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
        require: true,
    }
},{timestamps: true});

exports.TodoModel = mongoose.model("todo", TodoSchema);