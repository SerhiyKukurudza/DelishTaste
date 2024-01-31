const express = require("express");
const authController = require("../controllers/auth");
const connectionDataBase = require("../controllers/mysql");
const router = express.Router();

//-------------------------------------------------------------------------------------------------
router.get("/", authController.isLoggedIn, (req, res) => {
  const user = req.user ? true : false;
  console.log("Os dados do const user são: ".green + " " + user);
  const isAdmin = user && req.user.role === 1;

  console.log("Os dados do const user são: ".green + " " + user);
  console.log("É um administrador? ".green + " " + isAdmin);

  res.render("index", { user, isAdmin });
});

//-------------------------------------------------------------------------------------------------
router.get("/signUp", (req, res) => {
  res.render("signUp");
});

//-------------------------------------------------------------------------------------------------
router.get("/login", (req, res) => {
  res.render("login");
});

//-------------------------------------------------------------------------------------------------
router.get("/profile", authController.isLoggedIn, (req, res) => {
  const user = req.user ? true : false;
  const isAdmin = user && req.user.role === 1;

  if (req.user) {
    res.render("profile", {
      user: req.user,
      isAdmin,
      showProfileFragment: true,
    });
  } else {
    res.redirect("/login");
  }
});

//-------------------------------------------------------------------------------------------------
router.get("/backEnd", authController.isLoggedIn, (req, res) => {
  const user = req.user ? true : false;
  const isAdmin = user && req.user.role === 1;

  if (isAdmin) {
    res.render("backEnd");
  } else {
    res.render("403Forbidden");
  }
});

//-------------------------------------------------------------------------------------------------
router.get("/createRecipePage", authController.isLoggedIn, (req, res) => {
  const user = req.user ? true : false;
  const isAdmin = user && req.user.role === 1;

  if (req.user) {
    res.render("createRecipePage", {
      user: req.user,
      isAdmin
    });
  } else {
    res.redirect("/login");
  }
});

//-------------------------------------------------------------------------------------------------
router.get("/userManagementBackEnd", authController.isLoggedIn, (req, res) => {
  const user = req.user ? true : false;
  const isAdmin = user && req.user.role === 1;

  if (isAdmin) {
    res.render("userManagementBackEnd");
  } else {
    res.render("403Forbidden");
  }
});

//-------------------------------------------------------------------------------------------------
router.get("/recipeManagementBackEnd", authController.isLoggedIn, (req, res) => {
  const user = req.user ? true : false;
  const isAdmin = user && req.user.role === 1;

  if (isAdmin) {
    res.render("recipeManagementBackEnd");
  } else {
    res.render("403Forbidden");
  }
});

//-------------------------------------------------------------------------------------------------
router.get("/recipesForApprovalBackEnd", authController.isLoggedIn, (req, res) => {
  const user = req.user ? true : false;
  const isAdmin = user && req.user.role === 1;

  if (isAdmin) {
    res.render("recipesForApprovalBackEnd");
  } else {
    res.render("403Forbidden");
  }
});

module.exports = router;
