const express = require('express')
const router = express.Router()
const db = require('../data/db')

router.get('/role', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')

  	var sql = 'SELECT * FROM Role ORDER BY id COLLATE NOCASE'
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err
		}
		res.json(rows)
	})
})

router.post('/roleinsert', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')

	sql = "INSERT INTO Role (name) VALUES ('" + req.body.name + "')"                       																																																																																

	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
	})
	res.end()
})

router.post('/roleupdate', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')

	sql = "UPDATE Role SET name = '" + req.body.name + "' WHERE id = " + req.body.id
	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
		res.end()
	})
})

router.delete('/roledelete', (req, res) => {
	res.statusCode = 200
	res.setHeader('Access-Control-Allow-Origin', '*')

	sql = "DELETE FROM Role WHERE id = " + req.body.id
	db.run(sql, [],  err => {
		if (err) {
		    throw err
		}
        else console.log(sql)
		res.end()
	})
})

module.exports = router