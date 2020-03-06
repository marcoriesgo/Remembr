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
// Index:
memories.get('/', (req, res) => {
    Memory.find( {}, (err, memories) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/index.ejs', { memories });
    });
});

// Create the NEW memory route: (always above id routes):
memories.get('/new', (req, res) => {
    res.render('./memories/new.ejs');
});

// Make a SHOW memories route:
memories.get ('/:id', (req, res) => {
    Memory.findById(req.params.id, (err, memory) => {
      if(err) {
        console.log(err); 
      };
      res.render('./memories/show.ejs', 
      { memory: memory });
    });
});

// Create a POST route to add the new memory:
memories.post ('/', (req, res) => {
    Memory.create(req.body, (err, memory) => {
      if(err) { 
        res.send(err);
      } else {
        res.redirect('/memories');
      }
    });
});

// Create a GET route to redirect to edit page:
memories.get('/:id/edit', (req, res) => {
    Memory.findById(req.params.id , (err, memory) => {
          if(err) { 
            console.log(err); 
          }
          res.render('./memories/edit.ejs', 
          {memory: memory}
        );
    });
});

// PUT route to add the changes in the memory:
memories.put('/:id', (req, res) => {
    Memory.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, memory) => {
        if(err) { 
            console.log(err);
        }
        res.redirect('/memories/' + memory.id);
    });
});

// Make a delete route to delete the memories:
memories.delete('/:id', (req, res) => {
    Memory.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect('/memories');//redirect back to memories index
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