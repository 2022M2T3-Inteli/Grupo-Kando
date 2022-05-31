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
router.get('/allemployees', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var sql = 'SELECT * FROM Employee ORDER BY id COLLATE NOCASE';
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
router.post('/employeesinsert', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO Employee (name, location, role_id, projects_workload, available_projects_workload, type, tags) VALUES ('" + req.body.name + "', '" + req.body.location + "', '" + req.body.role + "', '" + req.body.projects_workload + "', '" + req.body.available_projects_workload + "','" + req.body.tags + "', '" + req.body.projects + "')";                       																																																																																

	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	// db.close(); // Fecha o banco
	res.end();
});

// Atualiza um registro (é o U do CRUD - Update)
router.post('/employeesupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "UPDATE Employee SET name = '" + req.body.name + "', tags = '" + req.body.tags + "',  location = '" + req.body.location + "', role_id = '" + req.body.role_id + "', projects_workload = '" + req.body.projects_workload + "', available_projects_workload = '" + req.body.available_projects_workload + "', type = '" + req.body.type + "' WHERE id = " + req.body.id;
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	// db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
router.delete('/employeesdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM Employee WHERE id = " + req.body.id;
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
        else console.log(sql);
		res.end();
	});
	// db.close(); // Fecha o banco
});

module.exports = router;