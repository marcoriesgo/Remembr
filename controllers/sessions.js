const express = require('express');
const router = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

router.get('/new', (req, res) => {
    res.render('sessions/new.ejs');
});

router.post('/', (req, res)=>{
    User.findOne({ username: req.body.username },(err, foundUser) => {
        if( bcrypt.compareSync(req.body.password, foundUser.password) ){
            req.session.currentUser = foundUser;
            res.redirect('back'); // REDIRECTS to CURRENT PAGE
        } else {
            // do nothing - send error?
            res.redirect('back'); // REDIRECTS to CURRENT PAGE
        }
    });
});

router.delete('/', (req, res) => {
    req.session.destroy(()=>{
        res.redirect('back'); // REDIRECTS to CURRENT PAGE
    });
})

module.exports = router;