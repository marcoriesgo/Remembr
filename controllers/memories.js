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
SEED ROUTES:
//
*/

//Create a seed route to call people memories:
memories.get('/seed/newmemories', (req, res) => {
   const newPeople = [
   {
    personName: "Judy B. Iwanier, MSW",
    personProfession: "Doctor",
    personImg: "https://cdn4.sussexdirectories.com/rms/rms_photos/sized/94/63/326394-945486-2_320x400.jpg?pu=1495324926",
    personBirthday: "December 12",
    personPhone: "(310) 423-0736",
    personIntro: "West Hollywood doctor specializing in clinical social work."
    },
    {
    personName: "Lisa G Cook MD",
    personProfession: "Neurologist",
    personImg: "https://s3-us-west-1.amazonaws.com/co-directory-images/lisa-cook-91172618.jpg",
    personBirthday: "June 17",
    personPhone: "(310) 277-9534",
    personIntro: "Los Angeles Neurologist working out of Century City."
    },
    {
    personName: "Dr. Daniel C Slavin Ph.D.",
    personProfession: "Psychotherapist",
    personImg: "https://cdn0.sussexdirectories.com/rms/rms_photos/sized/22/16/81622-1512334-3_320x400.jpg?pu=1558799799",
    personBirthday: "February 7",
    personPhone: "(310) 553-9020",
    personIntro: "I will help you break unhealthy habits and improve your self-acceptance and a sense of well-being. I set clear and obtainable goals so that you know how to look at your issues and are able to solve them on your own after therapy."
    },
    {
    personName: "",
    personProfession: "",
    personImg: "",
    personBirthday: "",
    personPhone: "",
    personIntro: ""
    },
    {
    personName: "",
    personProfession: "",
    personImg: "",
    personBirthday: "",
    personPhone: "",
    personIntro: ""
    },
    {
    personName: "",
    personProfession: "",
    personImg: "",
    personBirthday: "",
    personPhone: "",
    personIntro: ""
    }
  ];
  const newPlaces = [
    {
    placeName: "Cedars-Sinai Neurology",
    placeLocation: "8635 W 3rd St #850W, Los Angeles, CA 90048",
    placeActivity: "Medical Clinic",
    greatFor: "Psychiatrists",
    placeNotes: "Neurology center at Cedars-Sinai hospital on the border between Beverly Hills and West Hollywood.",
    placeImg: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Cedars-Sinai_West.jpg"    
    },
    {
    placeName: "Kaiser Permanente",
    placeLocation: "6041 Cadillac Ave, Los Angeles, CA 90034",
    placeActivity: "Neurology Clinic",
    greatFor: "Neuroloists",
    placeNotes: "Neurology clinic directed by Paul Boris Kazimiroff, MD and owned by Kaiser Permanente.",
    placeImg: "https://thrive.kaiserpermanente.org/care-near-you/southern-california/west-los-angeles/wp-content/uploads/sites/14/2013/11/186bc70757bb85f6e270.png"    
    },
    {
    placeName: "Beverly Center",
    placeLocation: "8500 Beverly Blvd, Los Angeles, CA 90048",
    placeActivity: "Shopping Center",
    greatFor: "Stores",
    placeNotes: "High-end shopping mall offers luxury designer shops, well-known department stores & restaurants.",
    placeImg: "https://www.bergelectric.com/wp-content/uploads/2018/04/BC002.jpg"    
    },
    {
    placeName: "",
    placeLocation: "",
    placeActivity: "",
    greatFor: "",
    placeNotes: "",
    placeImg: ""
    },
    {
    placeName: "",
    placeLocation: "",
    placeActivity: "",
    greatFor: "",
    placeNotes: "",
    placeImg: ""
    },
    {
    placeName: "",
    placeLocation: "",
    placeActivity: "",
    greatFor: "",
    placeNotes: "",
    placeImg: ""
    }
   ];
   const newEvents = [
    {
    occassionName: "Panthers Annual Senior Fest",
    occassionDate: "May 2, 2020 at 10:30am",
    occassionPlace: "1150 East 4th Street, Long Beach, CA 90802",
    occassionNotes: "Join us during Older American Month with our 4th Annual Senior Fest. We celebrate our nations history with our theme of Suffragists and Suffragents. Our Senior Fest has doubled in size this year."  
    },
    {
    occassionName: "Wellness & Health Fair",
    occassionDate: "March 21, 2020 at 11am",
    occassionPlace: "The Salvation Army Long Beach",
    occassionNotes: "Join us for free health screenings, engage with a panel of speakers, and receive information on how to promote healthy choices (mentally and physically)."  
    },
    {
    occassionName: "Medicare Bingo & Snacks",
    occassionDate: "March 29, 2020 at 2pm",
    occassionPlace: "Staples La Habra Spotlight Space",
    occassionNotes: "Everything you need to know about Medicare through a game of bingo. Get snacks, play bingo, and learn about original Medicare"  
    },
    {
      occassionName: "",
      occassionDate: "",
      occassionPlace: "",
      occassionNotes: ""
    },
    {
      occassionName: "",
      occassionDate: "",
      occassionPlace: "",
      occassionNotes: ""
    },
    {
      occassionName: "",
      occassionDate: "",
      occassionPlace: "",
      occassionNotes: ""
    }
   ];

  People.create(newPeople, (err, people) => {
   if(err) { 
      console.log(err); 
    }
   console.log("Seed people memories created.");
  });

  Occassions.create(newEvents, (err, events) => {
    if(err) { 
        console.log(err); 
      }
    console.log("Seed events memories created.");
  });

  Places.create(newPlaces, (err, places) => {
    if(err) { 
        console.log(err); 
      }
    console.log("Seed places memories created.");
    res.redirect('/remembr');
  });
});


//Use module exports so that the file can be accessed in the server.js:
//Export this router and then make it a requirement for server.js
module.exports = memories;