const express = require('express') // faz uma requisição do módulo express
const router = express.Router() // define a variável router como o método Router() do express
const db = require('../data/db') // faz uma requisição do arquivo js que abre o banco de dados

const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({ extended: true })
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

const today = new Date() // função para requisitar a data atual do sistema
const month = today.getMonth() + 1 // função para requisitar o mês atual do sistema
const year = today.getFullYear() // função para requisitar o ano atual do sistema

// bloco que seleciona todos os projetos registrados no banco de dados
router.get('/all', (req, res) => {
  // define /all como o endereço que exibirá o retorno dos comandos abaixo
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS
  var sql = 'SELECT * FROM Project ORDER BY id COLLATE NOCASE' // código sql que seleciona os projetos, ordenando por id
  db.all(sql, [], (err, rows) => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    res.json(rows) // retorna a lista de projetos em json
  })
})

router.get('/:id', (req, res) => {
  let id = req.params['id']
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  var sql = 'SELECT * FROM Project WHERE id = ?' // seleciona da tabela employee todos as informações do employee que tiver o id requisitado

  db.get(sql, [id], (err, row) => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    res.json(row) // retorno da linha da tabela com o id que foi requisitado
  })
})

// bloco que insere um novo projeto no banco de dados
router.post('/', urlencodedParser, (req, res) => {
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS
  // res.send(req.body)

  sql =
    "INSERT INTO Project (name, location, start_date, end_date, description, department_name) VALUES ('" +
    req.body.name +
    "', '" +
    req.body.location +
    "', '" +
    req.body.start_date +
    "', '" +
    req.body.end_date +
    "','" +
    req.description +
    "', '" +
    req.body.department_name +
    "')" // código sql que insere um um novo projeto no banco de dados, requisitando nome, localização, data de início, de final, descrição e departamento

  db.run(sql, [], err => {
    // executa o código sql acima no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
  })
  res.render('projects/projects')
})

router.post('/edit', urlencodedParser, (req, res) => {
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  sql =
    "UPDATE Project SET name = '" +
    req.body.project_name +
    "', location = '" +
    req.body.project_location +
    "',  start_date = '" +
    req.body.project_start_date +
    "', end_date = '" +
    req.body.project_end_date +
    "', description = '" +
    req.body.project_description +
    "', department_name = '" +
    req.body.project_department +
    "' WHERE id = " +
    req.body.id // código sql que faz um update de um funcionário já existente no banco de dados, requisitando nome, tags, localização, função, carga horária já usada para projetos, carga horária disponível para projetos e tipo (CLT ou TERCEIRO)
  db.run(sql, [], err => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    }
    res.redirect('back')
  })
})

router.post('/assignments/:data', urlencodedParser, (req, res) => {
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  let data = req.params['data']
  // data = JSON.stringify(data)
  // data = JSON.parse(data)

  // data.forEach((role, roleIndex) => {
  //   role.years.forEach((year, yearIndex) => {
  //     year.months.forEach((month, monthIndex) => {
  //       // let sql = `INSERT INTO RoleAssignment (project_id, role_name, hours_assigned, month, year) VALUES ('${}')`
  //       console.log(month)
  //     })
  //   })
  // })
  // console.log(data)
  res.send(console.log(data))
})

// // bloco que atualiza od dados de um projeto já existente no banco de dados
// router.patch('/', urlencodedParser, (req, res) => {
//   res.statusCode = 200 // código de status de que o comando foi executado sem erros
//   res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

//   sql =
//     "UPDATE Project SET name = '" +
//     req.body.name +
//     "', location = '" +
//     req.body.location +
//     "',  start_date = '" +
//     req.body.start_date +
//     "', end_date = '" +
//     req.body.end_date +
//     "', description = '" +
//     req.body.description +
//     "', department_id = '" +
//     req.body.department_id +
//     "', roles_id = '" +
//     req.body.roles_id +
//     "' WHERE id = " +
//     req.body.id // código sql que faz um update em um projeto já existente no banco de dados, requisitando nome, localização, data de início, de final, descrição, departamento, funções e id

//   db.run(sql, [], err => {
//     // executa o código sql no banco de dados
//     if (err) {
//       throw err // caso ocorra erro, ele será mostrado no terminal
//     }
//     res.end()
//   })

// })

// bloco que apaga um projeto do banco de dados
router.delete('/:id', urlencodedParser, (req, res) => {
  let id = req.params['id'] // uso da variável id para armazenar o parâmetro a ser requisitado
  res.statusCode = 200 // código de status de que o comando foi executado sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com o CORS

  sql = 'DELETE FROM Project WHERE id = ? ' // código sql que deleta um projeto do banco de dados, requisitando id
  db.run(sql, [id], err => {
    // executa o código sql no banco de dados
    if (err) {
      throw err // caso ocorra erro, ele será mostrado no terminal
    } else console.log(sql)
    res.end()
  })
})

router.get('/employeesassigned/:project_id', (req, res) => {
  res.statusCode = 200
  res.setHeader('Acces-Control-Allow-Origin', '*')
  let project_id = req.params['project_id']

  sql = `SELECT Employee.name, Employee.role_name, EmployeeAssignment.hours_assigned FROM Employee INNER JOIN EmployeeAssignment ON Employee.id = EmployeeAssignment.employee_id WHERE EmployeeAssignment.project_id = ? AND EmployeeAssignment.month = ${month} AND EmployeeAssignment.year = ${year}`

  db.all(sql, [project_id], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
  })
})

module.exports = router // exporta as rotas criadas para serem usadas na aplicação
