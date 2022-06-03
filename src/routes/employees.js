const express = require('express')
const router = express.Router()
const db = (__dirname, '../data/db')

router.get('/allemployees', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')

  var sql = 'SELECT * FROM Employee ORDER BY id COLLATE NOCASE'
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
  })
})

router.get('/employee/:id', (req, res) => {
  res.statusCode = 200 // retorna que executou sem erros
  res.setHeader('Access-Control-Allow-Origin', '*') // evita problemas com cors

  var sql = 'SELECT * FROM Employee WHERE id = ?' // seleciona da tabela employee todos as informações do employee que tiver o id requisitado

  db.get(sql, [id], (err, row) => {
    if (err) {
      throw err // se houver algum erro
    }
    res.json(row) // retorno da linha da tabela com o id que foi requisitado
  })
})

router.post('/employeesinsert', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')

  sql =
    "INSERT INTO Employee (name, location, role_id, projects_workload, available_projects_workload, type, tags) VALUES ('" +
    req.body.name +
    "', '" +
    req.body.location +
    "', '" +
    req.body.role +
    "', '" +
    req.body.projects_workload +
    "', '" +
    req.body.available_projects_workload +
    "','" +
    req.body.tags +
    "', '" +
    req.body.projects +
    "')"

  db.run(sql, [], err => {
    if (err) {
      throw err
    }
  })
  res.end()
})

router.post('/employeesupdate', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')

  sql =
    "UPDATE Employee SET name = '" +
    req.body.name +
    "', tags = '" +
    req.body.tags +
    "',  location = '" +
    req.body.location +
    "', role_id = '" +
    req.body.role_id +
    "', projects_workload = '" +
    req.body.projects_workload +
    "', available_projects_workload = '" +
    req.body.available_projects_workload +
    "', type = '" +
    req.body.type +
    "' WHERE id = " +
    req.body.id
  db.run(sql, [], err => {
    if (err) {
      throw err
    }
    res.end()
  })
})

router.delete('/employeesdelete', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')

  sql = 'DELETE FROM Employee WHERE id = ' + req.body.id
  db.run(sql, [], err => {
    if (err) {
      throw err
    } else console.log(sql)
    res.end()
  })
})

module.exports = router
