const express = require('express')
const app = express()
const path = require('path')
const db = require("./utils/db")

const hostname = '127.0.0.1'
const port = 8080;

const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static(path.join(__dirname, 'public')))

app.set("view engine", "ejs")

app.get("/", function(req, res) {
	res.render("login")
})

app.get("/dashboard", function(req, res) {
	res.render("dashboard/dashboard")
})

app.get("/employees", function(req, res) {
	res.render("employees/employees")
})

app.get("/projects", function(req, res) {
	res.render("projects/projects")
})

app.use("/", require("./routes/department"))
app.use("/", require("./routes/department_assignment"))
app.use("/", require("./routes/employee_assignment"))
app.use("/", require("./routes/employees"))
app.use("/", require("./routes/projects"))
app.use("/", require("./routes/role_assignment"))
app.use("/", require("./routes/role"))
app.use("/", require("./routes/dashboard"))

app.use(express.json())

const server = app.listen(parseInt(8080), () => {
	console.log("Servidor executando na porta " + server.address().port)
})