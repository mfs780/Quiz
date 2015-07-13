// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');
// var mongoose = require('mongoose').Mongoose;

// define our nerd model
// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Quiz', {
    quiz : {type : Object, default: {}}
});