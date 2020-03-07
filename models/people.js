//Start dependencies:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the schema:
const peopleSchema = new Schema({
    personName: String,
    personRelation: String,
    personImg: String,
    personBirthday: String,
    personNotes: String
});

//Create the people model:
const People = mongoose.model('People', peopleSchema);

//Export it so it can be used in controllers/memories.js
module.exports = People;