const express = require('express')
const router = express.Router()
const db = require('../data/db')

router.get('/totalhours', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*') 
	var sql = 'SELECT SUM(hours_assigned) FROM RoleAssignment'
	db.all(sql, [],  (err, rows ) => {
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

	sql = "INSERT INTO DepartmentAssignment (name) VALUES ('" + req.body.name + "')"                       																																																																																

	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
	})
	res.end()
})

router.post('/dassignmentupdate', (req, res) => {
	
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