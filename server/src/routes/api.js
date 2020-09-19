const router = require('express').Router();
const User = require('../models/user')

router.post('/user', (req, res) => {
    var user = new User({
        userID: req.body.userID,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    user.save().then((user) => {
        res.send(user);
    }, (e) => {
        res.status(400).send(e);
    });
});

router.get('/user/:userID', (req, res) => {
    var userID = req.params.userID;

    User.find({ userID: userID }).then((user) => {
        res.send(user);
    }, (e) => {
        res.status(400).send(e);
    });
});


router.put('/user/:userID', (req, res) => {
    var query = { userID: req.params.userID };
    User.findOneAndUpdate(query, {
        role: req.body.role,
        password: req.body.password
    }, { upsert: true }, (e, raw) => {
        if (e) {
            res.status(400).send('Invalid user supplied');
        }
        res.send(raw);
    });
});

router.delete('/user/:userID', (req, res) => {
    var query = { userID: req.params.userID };
    User.findOneAndRemove(query,
        (e, raw) => {
            if (e) {
                res.status(400).send('Invalid username supplied');
            }
            res.send(raw);
        });
});


module.exports = router;