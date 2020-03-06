//Start the dependencies, including express:
const express = require('express');
const memories = express.Router();

//Access the memories model (database) in order to make routes to call it:
const Memory = require('../models/memories');

//Create a route that will allow you to see the JSON database:
memories.get('/json', (req, res) => {
    Memory.find((err, memories) => {
      res.send(memories);
    });
});

// Create the first mvp REST routes:

// Index Route to Homepage:
memories.get('/', (req, res) => {
    Memory.find( {}, (err, memories) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/index.ejs', { memories });
    });
});

// People Routes
// Main page route:
memories.get('/people', (req, res) => {
    Memory.find( {}, (err, memories) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/people.ejs', { memories });
    });
});

// Create the NEW person memory route: (always above id routes):
memories.get('/people/new', (req, res) => {
    res.render('./memories/newperson.ejs');
});

// Make a SHOW person memories route:
memories.get ('/people/:id', (req, res) => {
    Memory.findById(req.params.id, (err, memory) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/showperson.ejs', 
      { memory: memory });
    });
});

// Create a POST route to add the new person:
memories.post ('/people', (req, res) => {
    Memory.create(req.body, (err, memory) => {
      if(err) { 
        res.send(err);
      } else {
        res.redirect('/memories/people');
      }
    });
});

// Create a GET route to redirect to edit page:
memories.get('/people/:id/edit', (req, res) => {
    Memory.findById(req.params.id , (err, memory) => {
          if(err) { 
            console.log(err); 
          }
          res.render('./memories/editperson.ejs', 
          {memory: memory}
        );
    });
});

// PUT route to add the changes in the memory:
memories.put('/people/:id', (req, res) => {
    Memory.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, memory) => {
        if(err) { 
            console.log(err);
        }
        res.redirect('/memories/people/' + memory.id);
    });
});

// Make a delete route to delete the memories:
memories.delete('/people/:id', (req, res) => {
    Memory.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/memories/people');//redirect back to memories index
    });
});



//Places Route:
// Main page route:
memories.get('/places', (req, res) => {
    Memory.find( {}, (err, memories) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/places.ejs', { memories });
    });
});

// Create the NEW person memory route: (always above id routes):
memories.get('/places/new', (req, res) => {
    res.render('./memories/newplace.ejs');
});

// Make a SHOW person memories route:
memories.get ('/places/:id', (req, res) => {
    Memory.findById(req.params.id, (err, memory) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/showplaces.ejs', 
      { memory: memory });
    });
});

// Create a POST route to add the new memory:
memories.post ('/places', (req, res) => {
    Memory.create(req.body, (err, memory) => {
      if(err) { 
        res.send(err);
      } else {
        res.redirect('/memories/places');
      }
    });
});

// Create a GET route to redirect to edit page:
memories.get('/places/:id/edit', (req, res) => {
    Memory.findById(req.params.id , (err, memory) => {
          if(err) { 
            console.log(err); 
          }
          res.render('./memories/editplace.ejs', 
          {memory: memory}
        );
    });
});

// PUT route to add the changes in the memory:
memories.put('/places/:id', (req, res) => {
    Memory.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, memory) => {
        if(err) { 
            console.log(err);
        }
        res.redirect('/memories/places/' + memory.id);
    });
});

// Make a delete route to delete the memories:
memories.delete('/places/:id', (req, res) => {
    Memory.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/memories/places');//redirect back to memories index
    });
});


//Occassions route:
// Main page route:
memories.get('/occassions', (req, res) => {
    Memory.find( {}, (err, memories) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/occassions.ejs', { memories });
    });
});

// Create the NEW person memory route: (always above id routes):
memories.get('/occassions/new', (req, res) => {
    res.render('./memories/newoccassion.ejs');
});

// Make a SHOW occassion memories route:
memories.get ('/occassions/:id', (req, res) => {
    Memory.findById(req.params.id, (err, memory) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/showoccassions.ejs', 
      { memory: memory });
    });
});

// Create a POST route to add the new memory:
memories.post ('/occassions', (req, res) => {
    Memory.create(req.body, (err, memory) => {
      if(err) { 
        res.send(err);
      } else {
        res.redirect('/memories/occassions');
      }
    });
});

// Create a GET route to redirect to edit page:
memories.get('/occassions/:id/edit', (req, res) => {
    Memory.findById(req.params.id , (err, memory) => {
          if(err) { 
            console.log(err); 
          }
          res.render('./memories/editoccassion.ejs', 
          {memory: memory}
        );
    });
});

// PUT route to add the changes in the memory:
memories.put('/occassions/:id', (req, res) => {
    Memory.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, memory) => {
        if(err) { 
            console.log(err);
        }
        res.redirect('/memories/occassions/' + memory.id);
    });
});

// Make a delete route to delete the memories:
memories.delete('/occassions/:id', (req, res) => {
    Memory.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/memories/occassions');//redirect back to memories index
    });
});

//Create a seed route to call trial memories:
memories.get('/seed/newmemories', (req, res) => {
    const newMemories = [
    {
    personName: "Laura",
    personImg: "https://livingcities.s3.amazonaws.com/people/432/display.jpg",
    personRelation: "Mom"
    },
    {
    placeName: "LA Fitness",
    placeImg: "https://media.glassdoor.com/l/39/92/ea/66/typical-new-look-of-an-la-fitness.jpg",
    placeActivity: "Gym"
    },
    {
    occassionName: "Marco Birthday",
    occassionDate: "July 8"
    }
    ];

    Memory.create(newMemories, (err, memory) => {
    if(err) { 
        console.log(err); 
    }
    console.log( "Seed memories created." );
    res.redirect('/memories');
    });
});

//Use module exports so that the file can be accessed in the server.js:
//Export this router and then make it a requirement for server.js
module.exports = memories;