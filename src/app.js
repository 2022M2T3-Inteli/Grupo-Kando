const express = require('express')
const app = express()
const path = require('path')

const port = process.env.PORT || 8080;

const dashboardRoute = require("./routes/Dashboard")
const projectsRoute = require("./routes/Projects")
const employeesRoute = require("./routes/Employees")
const departmentRoute = require("./routes/Department")
const rolesRoute = require("./routes/Roles")


app.use("/dashboard", dashboardRoute)
app.use("/projects", projectsRoute)
app.use("/employees", employeesRoute)
app.use("/departments", departmentRoute)
app.use("/roles", rolesRoute)

app.use(express.static(path.join(__dirname, 'public')))

app.set("view engine", "ejs")
app.set('views', path.join(__dirname, './views'));

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