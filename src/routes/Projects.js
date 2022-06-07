const express = require('express')
const router = express.Router()
const db = require('../data/db')

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router.get('/all', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')
  	var sql = 'SELECT * FROM Project ORDER BY id COLLATE NOCASE'
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err
		}
		res.json(rows)
	})
})

router.post('/', urlencodedParser, (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')
	// res.send(req.body)

	sql = "INSERT INTO Project (name, location, start_date, end_date, description, department_id) VALUES ('" + req.body.name + "', '" + req.body.location + "', '" + req.body.start_date + "', '" + req.body.end_date + "','" + req.description + "', '" + req.body.department_id + "')"                       																																																																																

	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
	})
	res.end()
})

router.patch('/', urlencodedParser, (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')

	sql = "UPDATE Project SET name = '" + req.body.name + "', location = '" + req.body.location + "',  start_date = '" + req.body.start_date + "', end_date = '" + req.body.end_date + "', description = '" + req.body.description + "', department_id = '" + req.body.department_id + "', roles_id = '" + req.body.roles_id + "' WHERE id = " + req.body.id
	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
		res.end()
	})
})

router.delete('/:id', urlencodedParser, (req, res) => {
	let id = req.params["id"];
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')

	sql = "DELETE FROM Project WHERE id = ? " 
	db.run(sql, [id],  err => {
		if (err) {
		    throw err
		}
        else console.log(sql)
		res.end()
	})
})

module.exports = router