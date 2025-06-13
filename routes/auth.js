const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Register
router.get("/register", (req, res) => res.render("register"));
router.post("/register", async (req, res) => {
    const { username, password, membership } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, password: hashed, membership });
    res.redirect("/login");
});

// Login
router.get("/login", (req, res) => res.render("login"));
router.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login"
}));

// Google Auth
router.get("/auth/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => res.redirect("/dashboard"));

// Facebook Auth
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    (req, res) => res.redirect("/dashboard"));

// Logout
router.get("/logout", (req, res) => {
    req.logout(() => res.redirect("/login"));
});

module.exports = router;
