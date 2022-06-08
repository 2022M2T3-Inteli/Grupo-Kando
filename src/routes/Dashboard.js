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
    'SELECT hours_assigned, month, employee_id FROM EmployeeAssignment WHERE year = ' +
    year
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
  })
})

router.get('/totalhours/:type', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let type = req.params['type']

  var sql =
    'SELECT EmployeeAssignment.hours_assigned, EmployeeAssignment.month, EmployeeAssignment.employee_id FROM EmployeeAssignment WHERE EmployeeAssignment.year = ' +
    year +
    ` AND EmployeeAssignment.employee_id IN 
      ( 
        SELECT Employee.id FROM Employee WHERE Employee.type = ?
      )
    `
  db.all(sql, [type], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
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

module.exports = router
