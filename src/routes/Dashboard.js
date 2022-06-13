const express = require('express')
const router = express.Router()
const db = require('../data/db')
const today = new Date() // função para requisitar a data atual do sistema
const month = today.getMonth() + 1 // função para requisitar o mês atual do sistema
const year = today.getFullYear() // função para requisitar o ano atual do sistema

// Endpoint que irá retornar os dados de horas totais de acordo com o ano (Gráfico de Horas Totais)
router.get('/totalhours', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Seleciona as colunas de horas alocadas, mês e função da tabela de alocação de função
  var sql =
    'SELECT hours_assigned, month, role_name FROM RoleAssignment WHERE year = ' +
    year

  // Faz a consulta ao banco, retornando todas as linhas de alocação de acordo com os parametros
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    }
    // Retorna os dados
    res.json(rows)
  })
})

// Endpoint semelhante ao de horas totais, com uma leve diferença de que neste é filtrado por função
router.get('/totalhours/:role', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let role = req.params['role']

  // Seleciona horas alocadas, mês e função da tabela de alocação de função, filtrando pelo ano e pelo nome da função
  var sql =
    'SELECT hours_assigned, month, role_name FROM RoleAssignment WHERE role_name = ? AND year = ' +
    year

  // Faz a consulta ao banco, passando a função selecionada como parâmetro
  db.all(sql, [role], (err, rows) => {
    if (err) {
      throw err
    }
    // Retorna os dados em forma de linha
    res.json(rows)
  })
})

// Endpoint que retorna as horas disponíveis para projetos dos funcionários
router.get('/hoursavailable', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Seleciona a coluna de tempo alocado para projetos da tabela de funcionários e os soma
  var sql = 'SELECT SUM(projects_workload) AS projects_workload FROM Employee'

  // Faz a consulta ao banco
  db.get(sql, [], (err, row) => {
    if (err) {
      throw err
    }
    // Retorna as horas disponíveis para projetos em uma linha
    res.json(row)
  })
})

// Endpoint semelhante ao anterior, porém filtrado pelo tipo de funcionários (CLT ou Terceiro)
router.get('/hoursavailable/:type', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Variável que irá guardar o dado passado pela URL
  let type = req.params['type']

  // Seleciona a coluna de horas disponíveis para projetos da tabela de funcionários filtrado pelo tipo passado na URL (CLT ou Terceiro) e os soma
  var sql =
    'SELECT SUM(projects_workload) AS projects_workload FROM Employee WHERE type = ?'

  // Consulta o banco passsando o tipo do funcionário como parâmetro
  db.get(sql, [type], (err, row) => {
    if (err) {
      throw err
    }
    res.json(row)
  })
})

// É passado nos parametros (url) o type de funcionário a ser consultado.
router.get('/hoursavailablefiltred/:role', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let role = req.params['role']

  var sql =
    'SELECT SUM(projects_workload) AS projects_workload FROM Employee WHERE role_name = ?'
  db.get(sql, [role], (err, row) => {
    if (err) {
      throw err
    }
    res.json(row)
  })
})

// Endpoint que irá retornar as horas disponíveis com filtro de função e de tipo (CLT ou Terceiro)
router.get('/hoursavailablefiltred/:role/:type', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let role = req.params['role']
  let type = req.params['type']

  var sql =
    'SELECT SUM(projects_workload) AS projects_workload FROM Employee WHERE role_name = ? AND type = ?'
  db.get(sql, [role, type], (err, row) => {
    if (err) {
      throw err
    }
    res.json(row)
  })
})

// Endpoint responsável por consultar o número de funcionários de um projeto filtrando pelo tipo dele (CLT ou Terceiro)
router.get('/projectemployees/:project_id/:type', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let project_id = req.params['project_id']
  let type = req.params['type']

  // Seleciona a coluna ID, soma a quantidade de IDs únicos na tabela de alocação de funcionários que pertençam ao projeto escolhido para a consulta
  var sql =
    'SELECT COUNT(DISTINCT employee_id) AS employee_qty FROM EmployeeAssignment WHERE project_id = ?' +
    ` AND EmployeeAssignment.employee_id IN 
      ( 
        SELECT Employee.id FROM Employee WHERE Employee.type = ?
      )
    `
  db.all(sql, [project_id, type], (err, rows) => {
    if (err) {
      throw err
    }
    // Retorna os funcionários alocados ao projeto que foi passado o ID
    res.json(rows)
  })
})

// Endpoint para consultar o número de funcionários em determinado projeto
router.get('/monthemployees/', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')

  var sql =
    'SELECT COUNT(DISTINCT employee_id) AS employeeQty, month FROM EmployeeAssignment WHERE EmployeeAssignment.year = ' +
    year +
    ' GROUP BY month'
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
  })
})

// Endpoint responsável por consultar o número de funcionários em determinado mês
router.get('/monthemployees/:type/', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')
  let type = req.params['type'] // define o tipo (CLT ou TERCEIRO) como parâmetro para a requisição

  var sql =
    'SELECT COUNT(DISTINCT employee_id) AS employeeQty, month FROM EmployeeAssignment WHERE EmployeeAssignment.year = ' +
    year +
    ` AND EmployeeAssignment.employee_id IN 
      ( 
        SELECT Employee.id FROM Employee WHERE Employee.type = ?
      ) GROUP BY month
    `
  db.all(sql, [type], (err, rows) => {
    if (err) {
      throw err
    }
    res.json(rows)
  })
})

// Endpoint responsável por consultar a quantidade de horas de projetos alocadas por função
router.get('/roleworkload', (req, res) => {
  res.statusCode = 200
  res.setHeader('Access-Control-Allow-Origin', '*')

  // Soma as horas de cada função, fazendo um agrupamento
  var sql =
    'SELECT SUM(hours_assigned), role_name FROM EmployeeAssignment INNER JOIN Employee ON EmployeeAssignment.employee_id = Employee.id GROUP BY role_name'
  db.all(sql, [], (err, rows) => {
    if (err) {
      throw err
    }
    // Retorna os dados solicitados
    res.json(rows)
  })
})

// Exporta a rota para ser usada no app.js (Script do Server)
module.exports = router
