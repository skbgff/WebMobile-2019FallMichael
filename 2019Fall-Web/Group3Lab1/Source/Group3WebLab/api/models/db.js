var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost/StudentPortal';


mongoose.connect(dbURI).then(() => console.log('connection successful'))
  .catch((err) => console.error(err));



// MODELS
require('./User');
require('./Class');
