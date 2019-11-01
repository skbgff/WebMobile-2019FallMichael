var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'TEST',
  userProperty: 'payload' + ''
});

var User = require('../models/User.js');
var Class = require('../models/Class.js');

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

// profile
router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

// user
router.put('/user/:id', function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body,{new: true},
    (err, result) => {
      // Handle any possible database errors
      if (err) {
        console.log('ERROR');
        console.log(result)
        return res.status(500).send(err);
      }
    });
});

/* GET ALL USERS */
router.get('/user/', function (req, res, next) {
  User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

// classes
/* GET ALL CLASS */
router.get('/class/', function (req, res, next) {
  Class.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE CLASS BY ID */
router.get('/class/:id', function (req, res, next) {
  Class.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET Multiple classe by multiple ids*/
router.get('/classes/not/:ids/', function (req, res, next) {
  //let data = req.params.ids.split(',');
  //Class.find().where('_id').ne(req.params.ids.split(',')).exec( function (err, records) {
  Class.find().where('_id').nin(req.params.ids.split(',')).exec( function (err, records) {
    if (err) return next(err);
    res.json(records);
  });
});

/* GET classe no in multiple ids*/
router.get('/classes/:ids/', function (req, res, next) {
  //let data = req.params.ids.split(',');
  Class.find().where('_id').in(req.params.ids.split(',')).exec( function (err, records) {
    if (err) return next(err);
    res.json(records);
  });
});


/* SAVE NEW CLASS */
router.post('/class/', function (req, res, next) {
  Class.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE CLASS */
router.put('/class/:id', function (req, res, next) {
  Class.findByIdAndUpdate(req.params.id, req.body,{new: true},
    (err, result) => {
      // Handle any possible database errors
      if (err) {
        console.log('ERROR');
        console.log(result)
        return res.status(500).send(err);
      }
    });
});

/* DELETE BOOK */
router.delete('/class/:id', function (req, res, next) {
  Class.findOneAndDelete({_id: req.params.id}, (err) => {
    if (err) return next(err);
    res.json({ message: 'Successfully deleted' });
  });
});

/* ENROLL USER IN CLASS */
router.post('/enroll/user/:user_id/class/:class_id', function (req, res, next) {
   User.findOne({_id: req.params.user_id}).then(theUser => {
    theUser.classes.push(req.params.class_id);
    theUser.save();
    res.json({ message: 'Successfully enrolled' });
  });
});

/* DROP USER FROM CLASS */
router.post('/drop/user/:user_id/class/:class_id', function (req, res, next) {
  User.findOne({_id: req.params.user_id}).then(theUser => {
    var array  = theUser.classes;

    // This is bad ans slow, we can get away with it because it is small
    // if time should use this method:
    // https://stackoverflow.com/questions/14763721/mongoose-delete-array-element-in-document-and-save
    for( var i = 0; i < array.length; i++){
      if ( array[i].toString() === req.params.class_id.toString()) {
        array.splice(i, 1);
      }
    }

    theUser.classes = array;
    theUser.save();
    res.json({ message: 'Successfully dropped' });
  });
});


module.exports = router;
