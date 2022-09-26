const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskID: {
        type: String,
        required: true
    },
    parent: {
        // parent can be, a team, individual or organization
        usertype: String,
        parentID: String
    },
    info: {
        created: {
            date: String,
            time: String
        },
        expiry: {
            date: String,
            time: String
        }
    }
}, {
    timestamps: true
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;