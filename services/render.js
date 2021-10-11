const axios = require('axios');

exports.homeRoute = (req, res, next) => {
	res.render('pages/home');
	/*if static - res.sendFile(__dirname + '/public/home.html');*/
}

exports.ranks = (req, res, next) => {
	//make get request to ranks/api/anime
	axios.get('http://localhost:3000/ranks/api/anime')
	.then(function(response) {
		console.log(response.data);
		res.render('pages/ranks', {anime: response.data});
	})
	.catch(err => {
		res.send(err);
	})
}

exports.playLists = (req, res, next) => {
	res.render('pages/playLists');
}

exports.addAnime = (req, res, next) => {
	console.log('getting the add anime page');
	res.render('pages/addAnime');
}

exports.addRank = (req, res, next) => {
	console.log('updating ranks');
	axios.get("http://localhost:3000/ranks/api/anime", {params: {id: req.query.id}})
	.then(function(animedata){
		res.render("pages/addRank", {anime: animedata.data});
	})
	.catch(err => {
		res.send(err);
	})
}