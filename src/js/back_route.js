const express = require('express'); 
const app = express();

const hostname = '127.0.0.1';
const port = 3061;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'banco.db';

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static("../frontend/"));

app.use(express.json());

// const department_assignment = require('./back_department_assignment')
// const department = require('./back_department.js')
// const employee_assignment = require('./back_employee_assignment')
// const employees = require('./back_employees')
// const projects = require('./back_projects')
// const role_assignment = require('./back_role_assignment')
// const role = require('./back_role')


app.use("/", require("./back_department"));

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
