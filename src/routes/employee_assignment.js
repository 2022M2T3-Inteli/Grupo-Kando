const express = require('express')
const router = express.Router()
const path = require(path)
const db = require(path.join(__dirname, '../data/db'))

router.get('/eassignment', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')

  	var sql = 'SELECT * FROM EmployeeAssignment ORDER BY id COLLATE NOCASE'
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err
		}
		res.json(rows)
	})
})

router.post('/eassignmentinsert', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send(req.body)

	sql = "INSERT INTO EmployeeAssignment (employee_id, project_id, hours_assigned) VALUES ('" + req.body.employee_id + "', '" + req.body.project_id + "', '" + req.body.hours_assigned + "')"                       																																																																																

	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
	})
	res.end()
})

router.post('/eassignmentupdate', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send(req.body)

	sql = "UPDATE EmployeeAssignment SET employee_id = '" + req.body.employee_id + "', project_id = '" + req.body.project_id + "',  hours_assigned = '" + req.body.hours_assigned + "' WHERE id = " + req.body.id
	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
		res.end()
	})
})

router.delete('/eassignmentdelete', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')

	sql = "DELETE FROM EmployeeAssignment WHERE id = " + req.body.id
	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
        else console.log(sql)
		res.end()
	})
})

module.exports = router