const express = require('express') // faz uma requisição do módulo express
const router = express.Router() // define a variável router como o método Router() do express
const db = require('../data/db') // faz uma requisição do arquivo js que abre o banco de dados

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })


// bloco que seleciona todos os funcionários registrados no banco de dados
router.get('/all', (req, res) => {
  // define /all como o endereço que exibirá o retorno dos comandos abaixo
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  var sql = 'SELECT * FROM Employee ORDER BY id COLLATE NOCASE' // código sql que seleciona os funcionários, ordenando por id
  db.all(sql, [], (err, rows) => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    res.json(rows) // retorna a lista de funcionários no formato json
  })
})

// bloco que seleciona todas as informções de determinado funcionário
router.get('/:id', (req, res) => {
  let id = req.params['id']
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  var sql = 'SELECT * FROM Employee WHERE id = ?' // seleciona da tabela employee todos as informações do employee que tiver o id requisitado

  db.get(sql, [id], (err, row) => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    res.json(row) // retorno da linha da tabela com o id que foi requisitado
  })
})

// bloco que mostra o número de projetos que um funcionário está
router.get('/projects/:employee_id', (req, res) => {
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS
  let employee_id = req.params['employee_id']

  var sql =
    'SELECT COUNT(DISTINCT project_id) AS projectsQty FROM EmployeeAssignment WHERE employee_id = ?' // seleciona da tabela employee todos as informações do employee que tiver o id requisitado

  db.get(sql, [employee_id], (err, rows) => {
    // executa o código sql no banco de dados, passando a variável employee id
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    console.log | rows
    res.json(rows) // retorno da linha da tabela com o id que foi requisitado
  })
})

// bloco que insere um novo funcionário no banco de dados
router.post('/', urlencodedParser, (req, res) => {
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  sql =
    "INSERT INTO Employee (name, location, role_name, projects_workload, available_projects_workload, type, tags) VALUES ('" +
    req.body.name +
    "', '" +
    req.body.location +
    "', '" +
    req.body.role_name +
    "', '" +
    req.body.projects_workload +
    "', '" +
    req.body.projects_work +
    "', '" +
    req.body.type +
    "','" +
    req.body.tags +
    "')" // código sql que insere um novo funcionário no banco de dados, requisitando nome, localização, função, carga horária já usada para projetos, carga horária disponível para projetos, tipo (CLT ou TERCEIRO) e tags

  db.run(sql, [], err => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
  })
  res.render('employees/employees')
})

// bloco que atualiza dados de funcionário já existente no banco de dados
router.post('/edit', urlencodedParser, (req, res) => {
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  sql =
    "UPDATE Employee SET name = '" +
    req.body.nameEdit +
    "', tags = '" +
    req.body.tagsEdit +
    "',  location = '" +
    req.body.locationEdit +
    "', role_name = '" +
    req.body.role_nameEdit +
    "', projects_workload = '" +
    req.body.projects_workloadEdit +
    "', available_projects_workload = '" +
    req.body.available_projects_workloadEdit +
    "', type = '" +
    req.body.typeEdit +
    "' WHERE id = " +
    req.body.id // código sql que faz um update de um funcionário já existente no banco de dados, requisitando nome, tags, localização, função, carga horária já usada para projetos, carga horária disponível para projetos e tipo (CLT ou TERCEIRO)
  db.run(sql, [], err => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    res.redirect('back')

  })
  // res.location('employees/employees')
})

// bloco que apaga um funcionário do banco de dados
router.delete('/:id', urlencodedParser, (req, res) => {
  let id = req.params['id'] // define a váriável id para armazenar o valor para ser usado como parâmetro da função
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  sql = 'DELETE FROM Employee WHERE id = ?' // código sql que deleta um funcionário do banco, requisitando id
  db.run(sql, [id], err => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    } else console.log(sql)
    res.end()
  })
})

router.get('/all', (req, res) => {
  // define /all como o endereço que exibirá o retorno dos comandos abaixo
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  var sql = 'SELECT hours_assigned FROM EmployeeAssignment WHERE employee_id = ?' // código sql que seleciona os funcionários, ordenando por id
  db.all(sql, [], (err, rows) => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    res.json(rows) // retorna a lista de funcionários no formato json
  })
})




module.exports = router // exporta as rotas criadas para serem usadas na aplicação
