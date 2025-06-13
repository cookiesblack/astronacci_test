const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: Date,
});

module.exports = mongoose.model('Article', ArticleSchema);
