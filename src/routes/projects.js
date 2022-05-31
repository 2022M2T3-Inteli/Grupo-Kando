const express = require('express');
const router = express.Router()
const db = require('../utils/db');

// const hostname = '127.0.0.1';
// const port = 3061;

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


/* Definição dos endpoints */

/****** CRUD ******************************************************************/

// Retorna todos registros (é o R do CRUD - Read)
router.get('/allprojects', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  	var sql = 'SELECT * FROM Project ORDER BY id COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	// db.close(); // Fecha o banco
});

// urlencodedParser

// Insere um registro (é o C do CRUD - Create)
router.post('/projectsinsert', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	res.send(req.body)

	sql = "INSERT INTO Project (name, location, start_date, end_date, description, department_id) VALUES ('" + req.body.name + "', '" + req.body.location + "', '" + req.body.start_date + "', '" + req.body.end_date + "','" + req.description + "', '" + req.body.department_id + "')";                       																																																																																

	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	// db.close(); // Fecha o banco
	res.end();
});

// Atualiza um registro (é o U do CRUD - Update)
router.post('/projectsupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "UPDATE Project SET name = '" + req.body.name + "', location = '" + req.body.location + "',  start_date = '" + req.body.start_date + "', end_date = '" + req.body.end_date + "', description = '" + req.body.description + "', department_id = '" + req.body.department_id + "', roles_id = '" + req.body.roles_id + "' WHERE id = " + req.body.id;
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	// db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
router.delete('/projectsdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM Project WHERE id = " + req.body.id;
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
        else console.log(sql);
		res.end();
	});
	// db.close(); // Fecha o banco
});


/* Inicia o servidor */
// app.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

module.exports = router;