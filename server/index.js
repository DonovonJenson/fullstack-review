const express = require('express');
let app = express();
let mongo = require('../database/index.js')
let bodyParser = require('body-parser');
let getRepos = require('../helpers/github.js');
var cool = require('cool-ascii-faces');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

app.get('/', function (req,res) {
	res.status(200);
	res.end('')
})

app.post('/repos', function (req, res) {
	res.status(201);
	var repoNumber = 0
	// This route should take the github username provided
  	// and get the repo information from the github API, then
	getRepos.getReposByUsername(req.body.term, (repos) => {
		if(!repos.message){
		repos.forEach((repo) => {
		repoNumber++;
		mongo.save('failed', repo);
		})
		res.end(JSON.stringify(repos))
		} else {
		res.end(JSON.stringify([]))
		}
	})
		// save the repo information in the database
});

app.get('/repos', function (req, res) {
	res.status(200);
	//Still need to sort!
	mongo.topRepos((repos) => {

		repos.sort((a,b) =>{
		return (a.size - b.size);
		})

		while(repos.length > 25){
			repos.pop()
		}

	res.end(JSON.stringify(repos))
	});
});

app.get("/favicon.ico", (req,res) =>{
	res.status(200);
	res.end('ok');
})

app.get('/cool', function(request, response) {
  response.send(cool());
});


