const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

// takes to REGISTER page
router.get('/new', (req, res) => {
    res.render('users/new.ejs');
});

// POST CREATES new USER in DATABASE (REGISTERS a USER)
router.post('/', (req, res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err, createdUser)=>{
        res.redirect('/');
    });
});

module.exports = router;