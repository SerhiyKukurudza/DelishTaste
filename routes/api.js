const express = require("express");
const authController = require("../controllers/auth");
const connectionDataBase = require("../controllers/mysql");
const {
  colors,
  getUserBundle,
} = require("../controllers/miscellaneous");
const multer = require('multer');
const path = require('path');

const router = express.Router();

//-------------------------------------------------------------------------------------------------
router.get("/api/recipes", (req, res) => {
  const sql = "SELECT * FROM recipe;";

  connectionDataBase.query(sql, (err, recipes) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      res
        .status(500)
        .json({ error: "Erro ao buscar receitas na base de dados" });
      return;
    }
    res.json(recipes);
  });
});

//-------------------------------------------------------------------------------------------------
router.get("/api/recipes/:id", authController.isLoggedIn, (req, res) => {
  const user = req.user ? true : false;
  const isAdmin = user && req.user.role === 1;

  const idRecipe = req.params.id;
  const sql = "SELECT * FROM recipe WHERE id=?";

  connectionDataBase.query(sql, [idRecipe], (err, recipe) => {
    if (err) {
      console.error("Erro na consulta SQL:", err);
      res
        .status(500)
        .json({ error: "Erro ao buscar receitas na base de dados" });
      return;
    }

    // Renderiza a página recipe.mustache com os dados da receita
    res.render("recipe", { recipe: recipe[0], user, isAdmin }); // Assume que apenas uma receita será retornada

    // Se você precisar lidar com vários resultados, ajuste conforme necessário
  });
});

//-------------------------------------------------------------------------------------------------
router.get("/api/recipes/search", (req, res) => {
  const query = req.query.query.toLowerCase();
  console.log("Search query:", query);

  const sql = `SELECT * FROM recipe WHERE LOWER(title) LIKE '%${query}%'`;

  connectionDataBase.query(sql, (err, recipes) => {
    if (err) {
      console.error("Error executing SQL query:", err);
      res
        .status(500)
        .json({ error: "Error searching recipes in the database" });
      return;
    }

    console.log("Matching recipes from the database:", recipes);
    
    res.json({ recipes });
  });
});


//-------------------------------------------------------------------------------------------------
// Configuração do Multer para o destino do armazenamento e nome do arquivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/dishes/')); // Caminho correto em relação ao diretório do arquivo api.js
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().ToShortDate() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

//-------------------------------------------------------------------------------------------------
// Rota para criar receita
router.post('/api/createRecipe', upload.single('image'), async (req, res) => {

  console.log(req.body);
  try {
    const { title, ingredients, preparation, category, time, price, difficulty} = req.body;

    const imagePath = "/images/dishes/" + req.file.filename;

    const userBundle = JSON.parse(getUserBundle());
    const userName = userBundle[0].name;

    // Insira as informações da receita no banco de dados
    const sql =
    'INSERT INTO recipe (title, author, ingredients, preparation, category, time, price, difficulty, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    connectionDataBase.query(
      sql,
      [
        title,
        userName,
        ingredients,
        preparation,
        category,
        time,
        price,
        difficulty,
        imagePath,
      ],
      (err, results) => {
        if (err) {
          console.error('Erro ao inserir receita no banco de dados:', err);
          res.status(500).json({ message: 'Internal server error' });
        } else {
          res.status(201).json({ message: 'Recipe created successfully' });
        }
      }
    );

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//-------------------------------------------------------------------------------------------------
// Rota para buscar dados do dashboard
router.get('/api/dashboardData', (req, res) => {
  // Simula uma consulta ao banco de dados
  const query = 'SELECT "users" AS dataType, COUNT(*) AS dataCount FROM user UNION SELECT "recipes" AS dataType, COUNT(*) AS dataCount FROM recipe;';

  connectionDataBase.query(query, (err, result) => {
    if (err) {
      console.error('Erro na consulta ao banco de dados:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {

      const usersCount = result[0].dataCount;
      const recipesCount = result[1].dataCount;

      res.json({ usersCount, recipesCount });
    }
  });
});

//-------------------------------------------------------------------------------------------------
// Rota para buscar lista de utilizadores
router.get('/api/userList', (req, res) => {
  // Simula uma consulta ao banco de dados
  const query = 'SELECT * FROM user;';

  connectionDataBase.query(query, (err, users) => {
    if (err) {
      console.error('Erro na consulta ao banco de dados:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {

      res.json(users);
    }
  });
});





module.exports = router;
