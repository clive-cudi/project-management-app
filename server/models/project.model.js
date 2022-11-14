const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { User, UserSchema } = require('./user.model');
const { Team, TeamSchema } = require('./team.model');
const { Task, TaskSchema } = require('./task.model');

const ProjectSchema = new Schema({
    pid: {
        type: String,
        required: true
    },
    contributors: {
        teams: [TeamSchema],
        individuals: [UserSchema]
    },
    name: {
        type: String,
        required: true
    },
    info: {
        created: {
            date: String,
            time: String
        },
        description: String,
        expiry: {
            date: String,
            time: String
        },
        bugdet: String,
        status: String,
        manager: String,
        // clients by clientID (cid)
        clients: [String],
        parent: {
            uid: String
        }
    },
    stage: {
        type: String,
        required: true
    },
    tasks: [TaskSchema]
}, {
    timestamps: true
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = {
    Project,
    ProjectSchema
};