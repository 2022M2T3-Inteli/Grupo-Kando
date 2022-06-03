const express = require('express')
const app = express()
const path = require('path')

const port = 8080 || 5000;

const dashboardRoute = (__dirname, "/routes/Dashaboard")
const projectsRoute = (__dirname, "/routes/Projects")
const employeesRoute = (__dirname, "/routes/Employees")
const departmentRoute = (__dirname, "/routes/Department")
const rolesRoute = (__dirname, "/routes/Roles")

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

const server = app.listen(port, () => {
	console.log("Servidor executando na porta " + server.address().port)
})