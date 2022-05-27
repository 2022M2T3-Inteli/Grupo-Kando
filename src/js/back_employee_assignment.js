const express = require('express');
const router = express.Router()

// const hostname = '127.0.0.1';
// const port = 3061;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'database.db';

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


/* Definição dos endpoints */

/****** CRUD ******************************************************************/

// Retorna todos registros (é o R do CRUD - Read)
router.get('/eassignment', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM EmployeeAssignment ORDER BY id COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

// urlencodedParser

// Insere um registro (é o C do CRUD - Create)
router.post('/eassignmentinsert', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	res.send(req.body)

	sql = "INSERT INTO EmployeeAssignment (employee_id, project_id, hours_assigned) VALUES ('" + req.body.employee_id + "', '" + req.body.project_id + "', '" + req.body.hours_assigned + "')";                       																																																																																

	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

// Atualiza um registro (é o U do CRUD - Update)
router.post('/eassignmentupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	res.send(req.body)

	sql = "UPDATE EmployeeAssignment SET employee_id = '" + req.body.employee_id + "', project_id = '" + req.body.project_id + "',  hours_assigned = '" + req.body.hours_assigned + "' WHERE id = " + req.body.id;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
router.delete('/eassignmentdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM EmployeeAssignment WHERE id = " + req.body.id;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
        else console.log(sql);
		res.end();
	});
	db.close(); // Fecha o banco
});


/* Inicia o servidor */
// app.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });

module.exports = router;