const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema def for a project client
const ClientSchema = new Schema({
    cid: {
        type: String,
        required: true
    },
    // id of the user that created the client
    // can be organization or individual in this case
    parentID: String,
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    title: String,
    email: {
        type: String,
        required: true
    },
    businessName: String,
    mobile: String,
    projects: [String]
}, {
    timestamps: true
});

const Client = mongoose.model("Client", ClientSchema);

module.exports = {
    Client,
    ClientSchema
}