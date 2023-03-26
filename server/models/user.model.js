const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { OrgSchema } = require("./organization.model");
const { IndividualSchema } = require("./individual.model");

const UserSchema = new Schema({
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
    // in the case of an organization => teams that are part of the organization
    teams: [String],
    // orgs that the user is part of
    // applies to an individual user
    orgs: [String],
    tasks: [String],
    projects: [String],
    // clients under the user
    clients: [String],
    socialAuth: {
        google: {
            status: Boolean,
            id: String,
            email: String,
            name: String,
            profilePicUrl: String
        }
    },
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
    },
    isActive: Boolean,
    // if userType is organization
    organization: OrgSchema,
    // if userType is individual
    individual: IndividualSchema
}, {
    timestamps: true
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    User,
    UserSchema
};