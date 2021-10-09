const mongoose = require('mongoose');

var schema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	rating: {
		type: String,
		required: true
	},
	pictureLink: {
		type: String,
		required: true
	}
})

const animeDB = mongoose.model('animedb', schema);

module.exports = animeDB;
