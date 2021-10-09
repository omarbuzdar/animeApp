const express = require('express');

const router = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

router.get('/', services.homeRoute);

router.get('/ranks', services.ranks);

router.get('/playLists', services.playLists);

router.get('/ranks/add-anime', services.addAnime);

router.get('/ranks/add-rank', services.addRank);

//API
router.post('/ranks/api/anime', controller.create);
router.get('/ranks/api/anime', controller.find);
router.put('/ranks/api/anime/:id', controller.update);
router.delete('/ranks/api/anime/:id', controller.delete);

module.exports = router;