const express = require('express') // faz uma requisição do módulo express
const router = express.Router() // define a variável router como o método Router() do express
const db = require('../data/db') // faz uma requisição do arquivo js que abre o banco de dados

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })

// bloco que seleciona todos as funções registrados no banco de dados
router.get('/all', (req, res) => {
  // define /role como o endereço que exibirá o retorno dos comandos abaixo
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  var sql = 'SELECT * FROM Role ORDER BY name COLLATE NOCASE' // código sql que seleciona as funções, ordenando por nome
  db.all(sql, [], (err, rows) => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    res.json(rows) // retorna a lista de funcionários no formato json
  })
})

router.get('/:id', (req, res) => {
  let id = req.params['id']
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  var sql = 'SELECT * FROM Role WHERE id = ?' // seleciona da tabela employee todos as informações do employee que tiver o id requisitado

  db.get(sql, [id], (err, row) => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    res.json(row) // retorno da linha da tabela com o id que foi requisitado
  })
})

// bloco que insere uma nova função no banco de dados
router.post('/', urlencodedParser, (req, res) => {
  // define /roleinsert como o endereço que executará os comandos abaixo
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  sql = "INSERT INTO Role (name) VALUES ('" + req.body.name + "')" // código sql que insere uma nova função no banco de dados, requisitando o nome da função

  db.run(sql, [], err => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
  })
  res.render('roles/roles')
})

// bloco que atualiza dados de uma fnção no banco de dados
router.post('/edit', urlencodedParser, (req, res) => {
  // define /roleupdate como o endereço que executará os comandos abaixo
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  sql =
    "UPDATE Role SET name = '" + req.body.name + "' WHERE id = " + req.body.id // código sql que faz um update em uma função no banco de dados, requisitando nome e id
  db.run(sql, [], err => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    res.redirect('back')
  })
})

// bloco que apaga uma função do banco de dados
router.delete('/:id', urlencodedParser, (req, res) => {
  let id = req.params['id'] // uso da variável id para armazenar o parâmetro a ser requisitado
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  sql = 'DELETE FROM Role WHERE id = ? ' // código sql que deleta um projeto do banco de dados, requisitando id
  db.run(sql, [id], err => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    } else console.log(sql)
    res.end()
  })
})
module.exports = router // exporta as rotas criadas para serem usadas na aplicação
