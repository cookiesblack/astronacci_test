const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    googleId: String,
    facebookId: String,
    name: String,
    membership: {
        type: String,
        enum: ['A', 'B', 'C'],
        default: 'A'
    },
    articleAccessed: { type: Number, default: 0 },
    videoAccessed: { type: Number, default: 0 }
});

module.exports = mongoose.model("User", userSchema);
