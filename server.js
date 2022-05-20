//empty object to act as endpoint for all routes
projectData = {};

//include express
const express = require('express');
// run instance of app
const app = express();

/* Dependancies */
//include body-parser
const bodyParser = require('body-parser');
//express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//include cors
const cors = require('cors');
app.use(cors());

//point to project folder
app.use(express.static('website'));

//run server
const port = 8000;
const server = app.listen(port, () => {
	console.log(`Server running on localhost:${port}`);
});

//POST route
app.post('/all', (req, res) => {
	console.log(`POSTing ${req.body}`);
	let data = req.body;
	projectData['date'] = data.date;
	projectData['temp'] = data.temp;
	projectData['content'] = data.content;
	console.log(projectData);
});

//GET route
app.get('/all', (req, res) => {
	console.log(`GETing ${projectData}`);
	console.log(projectData);
	res.send(projectData);
});
