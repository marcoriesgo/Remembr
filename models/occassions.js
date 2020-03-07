//Start dependencies:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the schema:
const occassionsSchema = new Schema({
    occassionName: String,
    occassionDate: String,
    occassionImportance: String,
    occassionNotes: String
});

//Create the people model:
const Occassions = mongoose.model('Occassions', occassionsSchema);

//Export it so it can be used in controllers/memories.js
module.exports = Occassions;

