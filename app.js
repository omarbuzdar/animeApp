const express = require('express');// Import the express library here
const ejs = require('ejs');//importing ejs- embedded javascript- here
const path = require('path');//importing path module of node
const morgan = require('morgan');
//const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const connectDB = require('./database/connection');

const app = express();// Instantiate the app here

app.set('view engine', 'ejs');// Set the view engine to ejs

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8080;// Port website will run on

app.listen( PORT, () => {// Invoke the app's `.listen()` method below:
	console.log(`Server is listening on port ${PORT}`);
      });

/////
app.use(morgan('tiny'));

///mongoDB Connection
connectDB();

//parse request to body parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(__dirname + '/public'));// Render static files
app.use('/ranks',express.static(__dirname + '/public'));//mounts /ranks so that requests from urls beginning with /ranks also use public

const router = require('./routes/router');
app.use('/', router);

// app.get('/', (req, res, next) => {
// 	res.render('pages/index');
// 	/*if static - res.sendFile(__dirname + '/public/index.html');*/
// });

// app.get('/ranks', (req, res, next) => {
// 	res.render('pages/ranks');
// });

// app.get('/playLists', (req, res, next) => {
// 	res.render('pages/playLists');
// });

// app.get('/ranks/add-anime', (req, res, next) => {
// 	console.log('getting the add anime page');
// 	res.render('pages/addAnime');
// });

// app.get('/ranks/add-rank', (req, res, next) => {
// 	console.log('updating ranks');
// 	res.render('pages/addRank');
// });


/**/