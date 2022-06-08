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
    'SELECT RoleAssignment.hours_assigned, RoleAssignment.month, RoleAssignment.role_name FROM RoleAssignment WHERE RoleAssignment.year = ' +
    year +
    ` AND RoleAssignment.role_name IN 
      ( 
        SELECT Role.name FROM Role WHERE Role.type = ?
      )
    `
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

  var sql =
    'SELECT SUM(projects_workload) FROM Employee'
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    }
    // console.log(rows)
    res.json(rows)
  })
})

// É passado nos parametros (url) o type de funcionário a ser consultado.
router.get('/hoursavailable/:role', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let role = req.params['role']

  var sql = 'SELECT SUM(projects_workload) FROM Employee WHERE role_name = ?'
  db.all(sql, [role], (err, rows) => {
    if (err) {
      throw err
    }
    // console.log(rows)
    res.json(rows)
  })
})


router.get('/hoursavailable/:role/:type', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let role = req.params['role']
  let type = req.params['type']

  var sql = 'SELECT SUM(projects_workload) FROM Employee WHERE role_name = ? AND type = ?'
  db.all(sql, [role, type], (err, rows) => {
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
