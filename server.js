// Start dependencies and port:
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = 3000;
const session = require("express-session");

//Call for the methods controller:
const memoriesController = require('./controllers/memories');

// The following 3 lines are potential mongoDB code connections:
// mongoURI = process.env.MONGOURI ||'mongodb://localhost/marco_mongoose_store'
// Connect the above variable to mongoose:
// mongoose.connect(mongoURI);

//Connect mongoose to mongoDB:
mongoose.connect("mongodb://localhost:27017/marco_remembr_memories", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//Use a simple term for mongoose.connection for accessibility:
const db = mongoose.connection;

//Tell the database what to do when trying to connect to mongo:
db.on('error', console.error.bind(console, 'connection to mongo error:'));
db.once ('open', function() {
  console.log('DB: Connected to mongo');
});


//Create the middleware:

//Public folder static:
app.use(express.static(__dirname + '/public'));

//Method override for POST, DELETE, and PUT requests from forms:
app.use(methodOverride('_method'));

//Parse the info from the forms:
app.use(bodyParser.urlencoded({extended : false}));

//Session:
app.use(session({
  secret: "marcoriesgo", //some random string
  resave: false,
  saveUninitialized: false
}));

//Make the JSON Parser:
app.use(bodyParser.json());


//Tell the app to use the memories.js when /memories is called on:
app.use('/memories', memoriesController);

//If localhost:'port' is called, redirect it to /memories:
app.get('/', (req, res) => {
    res.render('memories/onboarding.ejs');
});

app.get('/home', (req, res) => {
  res.render('memories/index.ejs');
});

app.get('/login', (req, res) => {
  res.render('memories/login.ejs');
});

app.get('/logout', (req, res) => {
  res.render('memories/onboarding.ejs');
});

app.get('/wrongpassword', (req, res) => {
  res.render('memories/wrong.ejs');
});

//Renders the login page
app.get('/app', (req, res)=>{
  if(req.session.currentUser){
      res.render('memories/index.ejs');
  } else {
      res.redirect('/sessions/new');
  }
});

//Auth controllers:
const usersController = require('./controllers/users.js');
app.use('/users', usersController);
const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);

//App listener:
app.listen(port, () => {
    console.log('Looking for memories on port ' + port);
});