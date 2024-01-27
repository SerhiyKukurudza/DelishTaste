const appSetup = require("./controllers/appSetup");

const app = appSetup.app;
const port = 3050;

//Define Routes
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`.blue);
});

/*
// View com a lista de alunos proveniente da base de dados
app.get('/users', (req, res) => {
  connectionDataBase.query('SELECT * FROM users', (error, results) => {  
    if (error) {
      console.log('Erro ao buscar users:'.red, error);
      res.status(500).send('Erro ao buscar alunos');
    } else {
      res.render('users', { users: results });
    }
  });
});



// Array de alunos (simulando os dados da aula prática anterior)
let alunos = [
  { numero: 1, nome: 'João' },
  { numero: 2, nome: 'Maria' },
  // Adicione outros alunos conforme necessário
];

// GET - Retornar todos os alunos
app.get('/api/aluno', (req, res) => {
  res.json(alunos);
});

// GET - Retornar um aluno por número
app.get('/api/recipes/:id', (req, res) => {
  const alunoNumero = parseInt(req.params.numero);
  const aluno = alunos.find(a => a.numero === alunoNumero);

  if (aluno) {
    res.json(aluno);
  } else {
    res.status(404).json({ mensagem: 'Aluno não encontrado' });
  }
});

// POST - Adicionar um novo aluno
app.post('/api/aluno', (req, res) => {
    const novoAluno = req.body;
    alunos.push(novoAluno);
    res.json(novoAluno);
});

// PUT - Atualizar os dados de um aluno por número
app.put('/api/aluno/:numero', (req, res) => {
  const alunoNumero = parseInt(req.params.numero);
  const alunoIndex = alunos.findIndex(a => a.numero === alunoNumero);

  if (alunoIndex !== -1) {
    alunos[alunoIndex] = { ...alunos[alunoIndex], ...req.body };
    res.json(alunos[alunoIndex]);
  } else {
    res.status(404).json({ mensagem: 'Aluno não encontrado' });
  }
});

// DELETE - Apagar um aluno por número
app.delete('/api/aluno/:numero', (req, res) => {
  const alunoNumero = parseInt(req.params.numero);
  alunos = alunos.filter(a => a.numero !== alunoNumero);
  res.json({ mensagem: 'Aluno removido com sucesso' });
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor iniciado em http://localhost:${port}`);
});
*/
