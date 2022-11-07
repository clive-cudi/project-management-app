const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrgSchema = new Schema({
    uid: {
        type: String,
        required: true,
    },
    details: {
        country: String,
        
    },
    projects: {
        type: [
            {
                projectID: String,
                status: String
            }
        ]
    },
    // an array of user uid's
    users: [String],
    // an array of tID's
    teams: [String]
}, {
    timestamps: true
});

const Organization = mongoose.model("Organization", OrgSchema);

module.exports = {
    Organization,
    OrgSchema
};