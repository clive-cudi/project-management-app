const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user.model');
const Team = require('./team.model');
const Task = require('./task.model');

const ProjectSchema = new Schema({
    pid: {
        type: String,
        required: true
    },
    contributors: {
        teams: [Team],
        individuals: [User]
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
        clients: [
            {
                firstName: String,
                LastName: String,
                title: String,
                email: String,
                businessName: String,
                mobile: String
            }
        ],
        parent: {
            usertype: String,
            uid: String
        }
    },
    tasks: [Task]
}, {
    timestamps: true
});

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;