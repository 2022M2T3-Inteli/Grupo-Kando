const express = require('express')
const router = express.Router()
const path = require(path)
const db = require(path.join(__dirname, '../data/db'))

router.get('/dassignment', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*') 
  	var sql = 'SELECT * FROM DepartmentAssignment ORDER BY id COLLATE NOCASE'
	db.all(sql, [],  (err, rows ) => {
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

	sql = "INSERT INTO DepartmentAssignment (department_id, project_id) VALUES ('" + req.body.employee_id + "', '" + req.body.project_id + "')"                      																																																																																

	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
	})
	res.end()
})

router.post('/dassignmentupdate', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')

	sql = "UPDATE DepartmentAssignment SET department_id = '" + req.body.employee_id + "', project_id = '" + req.body.project_id + "' WHERE id = " + req.body.id
	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
		res.end()
	})
})

router.delete('/dassignmentdelete', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')
	sql = "DELETE FROM DepartmentAssignment WHERE id = " + req.body.id
	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
        else console.log(sql)
		res.end()
	})
})

module.exports = router