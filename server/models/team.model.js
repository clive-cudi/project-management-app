const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TeamSchema = new Schema({
    tid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    // [memberUID's]
    members: [String],
    parentOrgID: {
        type: String,
        required: true,
    },
    // [projectIds]
    projects: [String]
}, {
    timestamps: true
});

/**
 * @description
 * members: () => [MenberID's]
 * 
 * projects: () => [ProjectID's]
 */

const Team = mongoose.model("Team", TeamSchema);

module.exports = {
    Team,
    TeamSchema
};