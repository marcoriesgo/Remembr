//Start dependencies:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the places schema:
const memorySchema = new Schema({
    personName: String,
    personRelation: String,
    personImg: String,
    personBirthday: String,
    personNotes: String,
    placeName: String,
    placeLocation: String,
    placeActivity: String,
    placeImg: String,
    occassionName: String,
    occassionDate: String,
    occassionImportance: String,
    occassionNotes: String
});

//Create the places model:
const Memory = mongoose.model('Memory', memorySchema);


//Export it so it can be used in controllers/memories.js
module.exports = Memory;
