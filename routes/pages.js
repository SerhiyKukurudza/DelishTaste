const express = require("express");
const authController = require("../controllers/auth");
const connectionDataBase = require("../controllers/mysql");
const router = express.Router();

router.get("/", authController.isLoggedIn, (req, res) => {
  const user = req.user ? true : false;
  console.log("Os dados do const user são: ".green + " " + user);
  const isAdmin = (user && req.user.role === 1);

  console.log("Os dados do const user são: ".green +  " " + user);
  console.log("É um administrador? ".green + " " + isAdmin);

  res.render("index", { user, isAdmin});
});

router.get("/signUp", (req, res) => {
  res.render("signUp");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/profile", authController.isLoggedIn, (req, res) => {
  if (req.user) {
    res.render("profile", {
      user: req.user,
    });
  } else {
    res.redirect("/login");
  }
});

router.get("/", authController.isLoggedIn, (req, res) => {
  const user = req.user ? true : false;

  // Renderiza o modelo mustache com os dados das receitas
  res.render("index", { user });
});

router.get("/api/recipes", (req, res) => {
  // Consulta SQL para selecionar todas as receitas da tabela 'recipe'
  const sql = "SELECT * FROM recipe";

  // Execute a consulta
  connectionDataBase.query(sql, (err, recipes) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      res.status(500).json({ error: "Erro ao buscar receitas na base de dados" });
      return;
    }

    // Se a consulta for bem-sucedida, envie as receitas como resposta
    res.json(recipes);
  });
});

router.get('/backEnd', authController.isLoggedIn, (req, res) => {
  const user = req.user ? true : false;
  const isAdmin = (user && req.user.role === 1);

  if( isAdmin ) {
    res.render('backEnd');
  } else {
    res.render('403Forbidden');
    //res.status(403).send('Forbidden: Access Denied');
  }
})


router.all('*', (req, res) => {
  res.render('404NotFound');
})


module.exports = router;
