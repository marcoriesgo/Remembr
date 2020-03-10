//Start the dependencies, including express:
const express = require('express');
const memories = express.Router();


//3 different for each category

//Access the memories model (database) in order to make routes to call it:
//Access each of the three models/databases to make calls to them
const People = require('../models/people');
const Places = require('../models/places');
const Occassions = require('../models/occassions');


// Create the first mvp REST routes:
// Index Route to Homepage:
memories.get('/', (req, res) => {
      res.render('./memories/onboarding.ejs');
});




//Quotes API Calls:
const axios = require('axios');

const quote = "";
const author = "";

axios.get('http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en')
  .then(response => {
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
    console.log(error);
});







/*
//
AUTHENTICATION ROUTES:
//
*/
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

memories.get('/signup', (req, res) => {
  res.render('./memories/signup.ejs');
});

memories.get('/login', (req, res) => {
  res.render('./memories/login.ejs');
});

//POST Route for when the user signs up to the app:
memories.post('/signup', (req, res)=>{
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  User.create(req.body, (err, createdUser)=>{
      res.redirect('/home');
  });
});


//POST ROUTE IN ORDER TO CHECK THE LOGIN FORM FOR CREDENTIALS:
memories.post('/login', (req, res)=>{
  User.findOne({ username: req.body.username },(err, foundUser) => {
      if( bcrypt.compareSync(req.body.password, foundUser.password) ){
          req.session.currentUser = foundUser;
          res.redirect('/home');
      } else {
          res.render('./memories/wrong.ejs');
      }
  });
});

//Delete route to delete the session:
memories.delete('/logout', (req, res) => {
  req.session.destroy(()=>{
      res.redirect('/memories');
  });
})


/*
//
PEOPLE ROUTES:
//
*/

// JSON Route to view the people database
// memories.get('/people/json', (req, res) => {
//   if(currentUser !== 'undefined') {
//     People.find((err, people) => {
//       res.send(people);
//     });
//   } else {
//     console.log(err)
//   }
// });


// Main page route:
memories.get('/people', (req, res) => {
    People.find( {}, (err, people) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/people.ejs', { 
        people,
        currentUser: req.session.currentUser
      });
    });
});

// Create the NEW person memory route: (always above id routes):
memories.get('/people/new', (req, res) => {
    res.render('./memories/newperson.ejs', {
      currentUser: req.session.currentUser
    });
});


// Make a SHOW person memories route:
memories.get ('/people/:id', (req, res) => {
    People.findById(req.params.id, (err, people) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/showperson.ejs', { 
        people: people,
        currentUser: req.session.currentUser
       });
    });
});

// Create a POST route to add the new person:
memories.post ('/people', (req, res) => {
    People.create(req.body, (err, people) => {
      if(err) { 
        res.send(err);
      } else {
        res.redirect('/memories/people', {
          currentUser: req.session.currentUser
        });
      }
    });
});

// Create a GET route to redirect to edit page:
memories.get('/people/:id/edit', (req, res) => {
    People.findById(req.params.id , (err, people) => {
          if(err) { 
            console.log(err); 
          }
          res.render('./memories/editperson.ejs', {
            people: people,
            currentUser: req.session.currentUser
          }
        );
    });
});

// PUT route to add the changes in the memory:
memories.put('/people/:id', (req, res) => {
    People.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, people) => {
        if(err) { 
            console.log(err);
        }
        res.redirect('/memories/people/' + people.id);
    });
});

// Make a delete route to delete the memories:
memories.delete('/people/:id', (req, res) => {
    People.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/memories/people');//redirect back to memories index
    });
});





/*
//
PLACES ROUTES:
//
*/

//Places Route:
// Main page route:
memories.get('/places', (req, res) => {
    Places.find( {}, (err, places) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/places.ejs', { 
        places,
        currentUser: req.session.currentUser
       });
    });
});

// Create the NEW person memory route: (always above id routes):
memories.get('/places/new', (req, res) => {
    res.render('./memories/newplace.ejs', {
      currentUser: req.session.currentUser
    });
});

// Make a SHOW person memories route:
memories.get ('/places/:id', (req, res) => {
    Places.findById(req.params.id, (err, places) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/showplaces.ejs', 
      { places: places,
        currentUser: req.session.currentUser
       });
    });
});

// Create a POST route to add the new memory:
memories.post ('/places', (req, res) => {
    Places.create(req.body, (err, places) => {
      if(err) { 
        res.send(err);
      } else {
        res.redirect('/memories/places');
      }
    });
});

// Create a GET route to redirect to edit page:
memories.get('/places/:id/edit', (req, res) => {
    Places.findById(req.params.id , (err, places) => {
          if(err) { 
            console.log(err); 
          }
          res.render('./memories/editplace.ejs', 
          {places: places,
            currentUser: req.session.currentUser
          }
        );
    });
});

// PUT route to add the changes in the memory:
memories.put('/places/:id', (req, res) => {
    Places.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, places) => {
        if(err) { 
            console.log(err);
        }
        res.redirect('/memories/places/' + places.id);
    });
});

// Make a delete route to delete the memories:
memories.delete('/places/:id', (req, res) => {
    Places.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/memories/places');//redirect back to memories index
    });
});





/*
//
OCCASSIONS ROUTES:
//
*/


// Main page route:
memories.get('/occassions', (req, res) => {
    Occassions.find( {}, (err, occassions) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/occassions.ejs', { 
        occassions,
        currentUser: req.session.currentUser
       });
    });
});

// Create the NEW person memory route: (always above id routes):
memories.get('/occassions/new', (req, res) => {
    res.render('./memories/newoccassion.ejs', {
      currentUser: req.session.currentUser
    });
});

// Make a SHOW occassion memories route:
memories.get ('/occassions/:id', (req, res) => {
    Occassions.findById(req.params.id, (err, occassions) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/showoccassions.ejs', 
      { occassions: occassions,
        currentUser: req.session.currentUser
       });
    });
});

// Create a POST route to add the new memory:
memories.post ('/occassions', (req, res) => {
    Occassions.create(req.body, (err, occassions) => {
      if(err) { 
        res.send(err);
      } else {
        res.redirect('/memories/occassions');
      }
    });
});

// Create a GET route to redirect to edit page:
memories.get('/occassions/:id/edit', (req, res) => {
    Occassions.findById(req.params.id , (err, occassions) => {
          if(err) { 
            console.log(err); 
          }
          res.render('./memories/editoccassion.ejs', 
          {occassions: occassions,
            currentUser: req.session.currentUser
          }
        );
    });
});

// PUT route to add the changes in the memory:
memories.put('/occassions/:id', (req, res) => {
    Occassions.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, occassions) => {
        if(err) { 
            console.log(err);
        }
        res.redirect('/memories/occassions/' + occassions.id);
    });
});

// Make a delete route to delete the memories:
memories.delete('/occassions/:id', (req, res) => {
    Occassions.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/memories/occassions');//redirect back to memories index
    });
});



/*
//
POTENTIAL SEED ROUTES:
//
*/

// //Create a seed route to call trial memories:
// memories.get('/seed/newmemories', (req, res) => {
//     const newMemories = [
//     {
//     personName: "Laura",
//     personImg: "https://livingcities.s3.amazonaws.com/people/432/display.jpg",
//     personRelation: "Mom"
//     },
//     {
//     placeName: "LA Fitness",
//     placeImg: "https://media.glassdoor.com/l/39/92/ea/66/typical-new-look-of-an-la-fitness.jpg",
//     placeActivity: "Gym"
//     },
//     {
//     occassionName: "Marco Birthday",
//     occassionDate: "July 8"
//     }
//     ];

//     Memory.create(newMemories, (err, memory) => {
//     if(err) { 
//         console.log(err); 
//     }
//     console.log( "Seed memories created." );
//     res.redirect('/memories');
//     });
// });

//Use module exports so that the file can be accessed in the server.js:
//Export this router and then make it a requirement for server.js
module.exports = memories;