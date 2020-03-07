//Start dependencies:
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the places schema:
const placesSchema = new Schema({
    placeName: String,
    placeLocation: String,
    placeActivity: String,
    placeImg: String
});

//Create the people model:
const Places = mongoose.model('Places', placesSchema);

//Export it so it can be used in controllers/memories.js
module.exports = Places;

