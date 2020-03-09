//Start dependencies:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the places schema:
const placesSchema = new Schema({
    placeName: { type: String, required: true },
    placeLocation: { type: String, required: true },
    placeActivity: { type: String, required: true },
    placeImg: String
});

//Create the people model:
const Places = mongoose.model('Places', placesSchema);

//Export it so it can be used in controllers/memories.js
module.exports = Places;

