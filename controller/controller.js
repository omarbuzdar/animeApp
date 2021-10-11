var animeDB = require('../model/model');

//create and save new anime
exports.create = (req, res, next) => {
	//validate request
	if(!req.body){
		res.status(400).send({message: "Content can not be empty"});
		return;
	}

	//new user
	const anime = new animeDB({ 
		name: req.body.name,
		rating: req.body.rating,
		pictureLink: req.body.pictureLink
	})

	//save anime in database
	anime
		.save(anime)
		.then(data => {
			res.redirect('/ranks');
		})
		.catch(err => {
			res.status(500).send({
				message: err.message || "An error occured in the create operation"
			})
		})
}

//retrieve and return all anime/ retrieve and return a single anime
exports.find = (req, res, next) => {
	if(req.query.id){
		const id = req.query.id; 
		animeDB.findById(id)
		.then(anime => {
			if(!anime){
				res.status(404).send({message: "Couldn't find user with id " + id});
			} else {
				res.send(anime);
			}
		})
	} else { //returns all the items in the data
		animeDB.find()
	.then( anime => {
		res.send(anime)
	})
	.catch(err => {
		res.status(500).send({message: err.message || "An Error Occurred While Retrieving Anime"});
	})
	}
}

///update a new identified user by user id
exports.update = (req, res, next) => {
	if(!req.body){
		return res.status(400).send( {message: "Data to update cannot be empty"});
	}

	const animeID = req.params.id;
	animeDB.findByIdAndUpdate(animeID, req.body)
	.then(data => {
		if(!data){
			res.status(404).send({message: `Cannot Update anime with id: ${animeID}. Maybe anime not found`})
		} else {
			res.redirect('/ranks').send(req.body);
		}
	})
	.catch(err => {
		res.status(500).send({message: "Error Update anime info"})
	})
}

///Delete an anime with a specified anime id in the request

exports.delete = (req, res, next) => {
	const animeID = req.params.id;
	animeDB.findByIdAndDelete(animeID)
	.then(data => {
		if(!data){
			res.status(404).send({message: `Cannot delete anime with id ${animeID}. Make sure you sent the right anime id`});
		} else {
			res.send({
				message: "Anime was deleted successfully"
			})
		}
	})
	.catch(err => {
		res.status(500).send({
			message: `Could not delete anime with id ${animeID}`
		})
	})
}