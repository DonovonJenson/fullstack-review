const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.open('open', function() {
	//Happens when connection is made


});

let repoSchema = mongoose.Schema({
  id: { type: String, unique: true },	
  url: String,
  name : String,
  user : String

});

let Repo = mongoose.model('Repo', repoSchema);

//This adds a repo to mongo
let save = (err, repoObject) => {
	var newEntry = new Repo(repoObject)

	newEntry.save(function (err, newEntry) {
  	if (err) return console.error(err);
	});
	
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

let topRepos = (callback) => {
	Repo.find((err, repos) => {
  if (err) return console.error(err);
  callback(repos);
})
	//callback(Repo.find())
}

module.exports.save = save;


module.exports.topRepos = topRepos;