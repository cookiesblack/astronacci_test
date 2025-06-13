require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const Article = require('./models/Article');
const Video = require('./models/Video');
const authRoutes = require("./routes/auth");
require("./config/passport");

const app = express();

mongoose.connect(process.env.MONGO_URI);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);

app.get("/dashboard", async (req, res) => {
    if (!req.isAuthenticated()) return res.redirect("/login");

    let limit = 0;
    if (req.user.membership === "A") limit = 3;
    else if (req.user.membership === "B") limit = 10;
    else limit = 0;

    const articleQuery = Article.find().sort({ createdAt: -1 });
    const videoQuery = Video.find().sort({ createdAt: -1 });

    const articles = (limit > 0) ? await articleQuery.limit(limit) : await articleQuery;
    const videos = (limit > 0) ? await videoQuery.limit(limit) : await videoQuery;

    res.render("dashboard", {
        user: req.user,
        articles,
        videos
    });
});

app.listen(process.env.PORT, () => console.log("Running on port", process.env.PORT));
