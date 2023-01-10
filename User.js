var mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    mailid:  String, // String is shorthand for {type: String}
    pass: String,
    
  });

  const blog = mongoose.model('Blog', blogSchema);

  module.exports = blog;