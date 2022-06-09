const express = require('express')
const router = express.Router()
const db = require('../data/db')
const today = new Date() // função para requisitar a data atual do sistema
const month = today.getMonth() + 1 // função para requisitar o mês atual do sistema
const year = today.getFullYear() // função para requisitar o ano atual do sistema

router.get('/totalhours', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')

  var sql =
    'SELECT hours_assigned, month, role_name FROM RoleAssignment WHERE year = ' +
    year
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
  })
})

router.get('/totalhours/:role', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let role = req.params['role']

  var sql =
    'SELECT hours_assigned, month, role_name FROM RoleAssignment WHERE role_name = ? AND year = ' +
    year
    // ` AND RoleAssignment.role_name IN 
    //   ( 
    //     SELECT role FROM Role WHERE Role.type = ?
    //   )
    // `
  db.all(sql, [role], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
  })
})

router.get('/hoursavailable', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')

  var sql = 'SELECT SUM(projects_workload) AS projects_workload FROM Employee'
  db.get(sql, [], (err, row) => {
    if (err) {
      throw err
    }
    res.json(row)
  })
})

router.get('/hoursavailable/:type', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let type = req.params['type']

  var sql =
    'SELECT SUM(projects_workload) AS projects_workload FROM Employee WHERE type = ?'
  db.get(sql, [type], (err, row) => {
    if (err) {
      throw err
    }
    res.json(row)
  })
})

// É passado nos parametros (url) o type de funcionário a ser consultado.
router.get('/hoursavailablefiltred/:role', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let role = req.params['role']

  var sql = 'SELECT SUM(projects_workload) AS projects_workload FROM Employee WHERE role_name = ?'
  db.get(sql, [role], (err, row) => {
    if (err) {
      throw err
    }
    res.json(row)
  })
})

router.get('/hoursavailablefiltred/:role/:type', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let role = req.params['role']
  let type = req.params['type']

  var sql =
    'SELECT SUM(projects_workload) AS projects_workload FROM Employee WHERE role_name = ? AND type = ?'
  db.get(sql, [role, type], (err, row) => {
    if (err) {
      throw err
    }
    res.json(row)
  })
})

router.get('/roletotalhours', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')

  var sql = 'SELECT SUM(hours_assigned) FROM RoleAssignment WHERE role_id = 1'
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
  })
})

// faz uma requisição para consultar o número de funcionários em determinado projeto
router.get('/projectemployees/:project_id/', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let project_id = req.params['project_id']

  var sql =
    'SELECT COUNT(DISTINCT employee_id) FROM EmployeeAssignment WHERE project_id = ?'
  db.all(sql, [project_id], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
  })
})

// filtra a consulta do número de funcionários em um projeto, se são CLT ou TERCEIROS
router.get('/projectemployees/:project_id/:type', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let project_id = req.params['project_id']
  let type = req.params['type']

  var sql =
    'SELECT COUNT(DISTINCT employee_id) FROM EmployeeAssignment WHERE project_id = ?' +
    ` AND EmployeeAssignment.employee_id IN 
      ( 
        SELECT Employee.id FROM Employee WHERE Employee.type = ?
      )
    `
  db.all(sql, [project_id, type], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
  })
})

router.get('/monthemployeesassigned', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let role = req.params['role']
  let type = req.params['type']

  var sql =
    'SELECT COUNT(employee_id) FROM EmployeeAssignment WHERE month = ? AND type = ?'
  db.all(sql, [role, type], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
  })
})

module.exports = router
