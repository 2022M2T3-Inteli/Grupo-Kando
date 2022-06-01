const express = require('express')
const app = express()
const path = require('path')

const hostname = '127.0.0.1'
const port = 8080;

const dashboardRoute = require("./routes/Dashaboard")
const projectsRoute = require("./routes/Projects")
const employeesRoute = require("./routes/Employees")
const departmentRoute = require("./routes/Department")
const rolesRoute = require("./routes/Roles")

app.use("/", dashboardRoute)
app.use("/", projectsRoute)
app.use("/", employeesRoute)
app.use("/", departmentRoute)
app.use("/", rolesRoute)

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

app.use(express.json())

const server = app.listen(parseInt(8080), () => {
	console.log("Servidor executando na porta " + server.address().port)
})