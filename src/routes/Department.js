const express = require('express') // faz uma requisição do módulo express
const router = express.Router() // define a variável router como o método Router() do express
const db = require('../data/db') // faz uma requisição do arquivo js que abre o banco de dados

// bloco que seleciona todos os departamentos registrados no banco de dados
router.get('/department', (req, res) => {
  // define /department como o endereço que exibirá o retorno dos comandos abaixo
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  var sql = 'SELECT * FROM Department ORDER BY id COLLATE NOCASE' // código sql que seleciona os departamentos, ordenando por id
  db.all(sql, [], (err, rows) => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    res.json(rows) // retorna a lista de departamentos no formato json
  })
})

// bloco que insere um novo departamento no banco de dados
router.post('/departmentinsert', (req, res) => {
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS
  res.send(req.body)

  sql = "INSERT INTO Department (name) VALUES ('" + req.body.name + "')" // código sql que insere um novo departamento no banco de dados, requisitando o nome

  db.run(sql, [], err => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
  })
  res.end()
})

// bloco que atualiza as informações de um departamento no banco de dados
router.post('/departmentupdate', (req, res) => {
  // define /departmentupdate como o endereço que vai rodar os comandos abaixo
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  sql =
    "UPDATE Department SET name = '" +
    req.body.name +
    "' WHERE id = " +
    req.body.id // código sql que faz um update em um departamento no banco de dados, requisitando nome e id
  db.run(sql, [], err => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    res.end()
  })
})

// bloco que apaga um departamento do banco de dados
router.delete('/departmentdelete', (req, res) => {
  // define /departmentdelete como o endereço que vai rodar os comandos abaixo
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  sql = 'DELETE FROM Department WHERE id = ' + req.body.id // código que deletaum departamento no banco de dados, requisitando id
  db.run(sql, [], err => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    } else console.log(sql)
    res.end()
  })
})

module.exports = router // exporta as rotas criadas para serem usadas na aplicação
