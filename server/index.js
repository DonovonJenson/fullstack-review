const express = require('express');
let app = express();
let mongo = require('../database/index.js')
let bodyParser = require('body-parser');
let getRepos = require('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
	res.status(201);
	var repoNumber = 0
	// This route should take the github username provided
  	// and get the repo information from the github API, then
	getRepos.getReposByUsername(req.body.term, (repos) => {
		repos.forEach((repo) => {
		repoNumber++;
		mongo.save('failed', repo);
		})
		res.end(repos.length.toString())
	})
		// save the repo information in the database
});

app.get('/repos', function (req, res) {
	res.status(200);
	//Still need to sort!
	mongo.topRepos((repos) => {
		while(repos.length > 25){
			repos.pop()
		}
		res.end(JSON.stringify(repos))
	});
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

