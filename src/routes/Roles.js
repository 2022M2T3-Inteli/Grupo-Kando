const express = require('express') // faz uma requisição do módulo express
const router = express.Router() // define a variável router como o método Router() do express
const db = require('../data/db') // faz uma requisição do arquivo js que abre o banco de dados

// bloco que seleciona todos as funções registrados no banco de dados
router.get('/role', (req, res) => {
  // define /role como o endereço que exibirá o retorno dos comandos abaixo
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  var sql = 'SELECT * FROM Role ORDER BY id COLLATE NOCASE' // código sql que seleciona as funções, ordenando por id
  db.all(sql, [], (err, rows) => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    res.json(rows) // retorna a lista de funcionários no formato json
  })
})

// bloco que insere uma nova função no banco de dados
router.post('/roleinsert', (req, res) => {
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
  res.end()
})

// bloco que atualiza dados de uma fnção no banco de dados
router.post('/roleupdate', (req, res) => {
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
    res.end()
  })
})

// bloco que apaga uma função do banco de dados
router.delete('/roledelete', (req, res) => {
  // define /roledelete como o endereço que executará os comandos abaixo
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  sql = 'DELETE FROM Role WHERE id = ' + req.body.id // código sql que deleta uma função do banco de dados, requisitando id
  db.run(sql, [], err => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    } else console.log(sql)
    res.end()
  })
})

module.exports = router // exporta as rotas criadas para serem usadas na aplicação
