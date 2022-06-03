const express = require('express')
const router = express.Router()
const db = require('../data/db')

router.get('/rassignment', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')

  	var sql = 'SELECT * FROM RoleAssignment ORDER BY id COLLATE NOCASE'
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err
		}
		res.json(rows)
	})
})

router.post('/rassignmentinsert', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.send(req.body)

	sql = "INSERT INTO RoleAssignment (project_id, role_id, hours_assigned) VALUES ('" + req.body.project_id + "', '" + req.body.role_id + "', '" + req.body.hours_assigned + "')"                       																																																																																

	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
	})
	res.end()
})

router.post('/rassignmentupdate', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')
	sql = "UPDATE RoleAssignment SET project_id = '" + req.body.project_id + "', role_id = '" + req.body.role_id + "',  hours_assigned = '" + req.body.hours_assigned + "' WHERE id = " + req.body.id
	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
		res.end()
	})
})

router.delete('/rassignmentdelete', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')

	sql = "DELETE FROM RoleAssignment WHERE id = " + req.body.id
	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
        else console.log(sql)
		res.end()
	})
})

module.exports = router