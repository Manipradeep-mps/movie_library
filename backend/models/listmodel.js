const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: String,
    type: String,
    rank: Number,
    image: String,
    actors: String,
    description: String,
    genre: [String], 
    rating: Number,
    year: Number
});

const listSchema = new mongoose.Schema({
    listname: String,
    userid: mongoose.Schema.Types.ObjectId,
    listdata: [movieSchema] 
});

const listmodel = mongoose.model('list', listSchema);

module.exports = listmodel;
