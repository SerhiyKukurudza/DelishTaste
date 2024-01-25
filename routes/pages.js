const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.get("/", authController.isLoggedIn, (req, res) => {
  const user = req.user ? true : false;
  console.log("Os dados do const user são: ".green +  " " + user);

  res.render("index", { user });
});

router.get("/signUp", (req, res) => {
  res.render("signUp");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get('/profile', authController.isLoggedIn, (req, res) => {

  if( req.user ) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect('/login');
  }
})

module.exports = router;
