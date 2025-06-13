const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    title: String,
    url: String,
    createdAt: Date,
});

module.exports = mongoose.model('Video', VideoSchema);
