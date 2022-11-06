const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    uid: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicUrl: {
        type: String
    },
    about: {
        type: String
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    usertype: {
        type: String,
        required: true
    },
    // teams that the user is part of
    teams: [String],
    // orgs that the user is part of
    orgs: [String],
    tasks: [String],
    info: {
        address: {
            country: String,
            location: String,
            street: String
        },
        skills: [String],
        gender: String,
        timezones: {
            default: String,
            other: [String]
        },
        phone: String,
        language: String
    },
    twoFA: {
        status: Boolean,
        secret: String
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;