// Constantes usadas pelo servidor
const express = require('express')
const app = express()
const path = require('path')

// Define a porta, deixando o heroku decidir a porta ou então rodando na 8080 caso seja localhost
const port = process.env.PORT || 8080;

// Importa cada rota definida na camada de modelo
const dashboardRoute = require("./routes/Dashboard")
const projectsRoute = require("./routes/Projects")
const employeesRoute = require("./routes/Employees")
const departmentRoute = require("./routes/Department")
const rolesRoute = require("./routes/Roles")

// Define a URL de acesso para cada rota
app.use("/dashboard", dashboardRoute)
app.use("/projects", projectsRoute)
app.use("/employees", employeesRoute)
app.use("/departments", departmentRoute)
app.use("/roles", rolesRoute)

// Define o caminho dos arquivos públicos (scripts, imagens e styles)
app.use(express.static(path.join(__dirname, 'public')))

// Define o uso de EJS
app.set("view engine", "ejs")
// Define qual o caminho que possui os views (Telas da aplicação)
app.set('views', path.join(__dirname, './views'));

// Acessa a página de login, caminho raiz da aplicação
app.get("/", function(req, res) {
	// Renderiza a página login, contida dentro da pasta de Views
	res.render("login")
})

// Acessa a página de Dashboard
app.get("/dashboard", function(req, res) {
	// Renderiza a página Dashaboard, contida dentro da pasta de Views
	res.render("dashboard/dashboard")
})


// Acessa a página de Employees
app.get("/employees", function(req, res) {
	// Renderiza a página de Employees, contida dentro da pasta de Views
	res.render("employees/employees")
})

// Acessa a página de Projetos
app.get("/projects", function(req, res) {
	// Renderiza a página de Projetos, contida dentro da pasta de Views
	res.render("projects/projects")
})

// Define o uso do Express.json, para retornar os dados das requisições em formato JSON
app.use(express.json())

// Define o servidor e executa a aplicação
const server = app.listen(port, () => {
	console.log(`Servidor executando em http://127.0.1:${port}`)
})