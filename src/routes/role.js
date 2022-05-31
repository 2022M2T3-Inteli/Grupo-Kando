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
router.get('/role', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

  	var sql = 'SELECT * FROM Role ORDER BY id COLLATE NOCASE';
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
router.post('/roleinsert', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "INSERT INTO Role (name) VALUES ('" + req.body.name + "')";                       																																																																																

	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	// db.close(); // Fecha o banco
	res.end();
});

// Atualiza um registro (é o U do CRUD - Update)
router.post('/roleupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "UPDATE Role SET name = '" + req.body.name + "' WHERE id = " + req.body.id;
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	// db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
router.delete('/roledelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "DELETE FROM Role WHERE id = " + req.body.id;
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