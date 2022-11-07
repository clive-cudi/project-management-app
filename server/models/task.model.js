const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    priority: {
        type: String,
        required: true
    },
    type: {
        // deliverable | milestone
        type: String,
        required: true
    },
    parent: {
        // parent can be, a team, individual or organization
        usertype: String,
        parentID: String,
        // project details as a parent to the task
        project: {
            pid: String
        }
    },
    // uid of the assignees
    assignees: [Array],
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

module.exports = {
    Task,
    TaskSchema
};