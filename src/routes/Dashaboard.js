const express = require('express')
const router = express.Router()
const db = (__dirname, '../data/db')

router.get('/totalhours', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let totalHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

  data.forEach(element => {
    if (element.year == 2022) {
      switch (element.month) {
        case 1:
          totalHours[0] += element.hours_assigned
          break
        case 2:
          totalHours[1] += element.hours_assigned
          break
        case 3:
          totalHours[2] += element.hours_assigned
          break
        case 4:
          totalHours[3] += element.hours_assigned
          break
        case 5:
          totalHours[4] += element.hours_assigned
          break
        case 6:
          totalHours[5] += element.hours_assigned
          break
        case 7:
          totalHours[6] += element.hours_assigned
          break

        default:
          break
      }
    }
  })
  var sql = 'SELECT hours_assigned FROM RoleAssignment'
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
  })
})

router.get('/roletotalhours', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')

  var sql = 'SELECT SUM(hours_assigned) FROM RoleAssignment where role_id = 1'
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
  })
})

router.post('/dassignmentinsert', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(req.body)

  sql =
    "INSERT INTO DepartmentAssignment (name) VALUES ('" + req.body.name + "')"

  db.run(sql, [], err => {
    if (err) {
      throw err
    }
  })
  res.end()
})

router.post('/dassignmentupdate', (req, res) => {})

router.delete('/dassignmentdelete', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  sql = 'DELETE FROM DepartmentAssignment WHERE id = ' + req.body.id
  db.run(sql, [], err => {
    if (err) {
      throw err
    } else console.log(sql)
    res.end()
  })
})

module.exports = router
