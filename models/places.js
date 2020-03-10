//Start dependencies:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the places schema:
const placesSchema = new Schema({
    placeName: { type: String, required: true, maxlength: 22 },
    placeLocation: { type: String, required: true },
    placeActivity: { type: String, required: true },
    greatFor: { type: String, maxlength: 14 },
    placeNotes: String,
    placeImg: String
});

//Create the people model:
const Places = mongoose.model('Places', placesSchema);

//Export it so it can be used in controllers/memories.js
module.exports = Places;

