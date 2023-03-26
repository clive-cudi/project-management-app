const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// individual specific
const IndividualSchema = new Schema({
    uid: {
        type: String
    }
}, {
    timestamps: true
});

const Individual = mongoose.model("Individual", IndividualSchema);

module.exports = {
    Individual,
    IndividualSchema
}