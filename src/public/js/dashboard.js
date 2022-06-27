// Define os meses do ano para ser utilizado nos gráficos
const yearMounths = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
]

// Função que faz a requisição para gerar um dos dados do Gráfico de Horas Totais (Primeiro Gráfico)
function getHoursNeeded(role) {
  let url

  // Verifica se está filtrando ou não por funções
  if (role != 'all') {
    url = 'dashboard/totalhours/' + role
  } else {
    url = 'dashboard/totalhours'
  }

  // Instancia o objeto que será responsável por fazer as requisições
  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false) // Abre a requisição com o método get, passando a URL do endpoint e fazendo-a de forma síncrona
  xhttp.send() // Envia a requisição

  let data = JSON.parse(xhttp.responseText) // Pega os dados da resposta da requisição e os transforma para o formato JSON

  // Define as horas necessárias mês a mês
  let hoursNeededPeerMounth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  // Percorre cada índice do array de objetos que retornou do banco e define as horas mensais de acordo com cada mês.
  data.forEach(row => {
    switch (row.month) {
      case 1:
        hoursNeededPeerMounth[0] += row.hours_assigned // caso o mês seja 1, as horas necessárias em janeiro aumentarão
        break
      case 2:
        hoursNeededPeerMounth[1] += row.hours_assigned // caso o mês seja 2, as horas necessárias em fevereiro aumentarão
        break
      case 3:
        hoursNeededPeerMounth[2] += row.hours_assigned // caso o mês seja 3, as horas necessárias em março aumentarão
        break
      case 4:
        hoursNeededPeerMounth[3] += row.hours_assigned // caso o mês seja 4, as horas necessárias em abril aumentarão
        break
      case 5:
        hoursNeededPeerMounth[4] += row.hours_assigned // caso o mês seja 5, as horas necessárias em maio aumentarão
        break
      case 6:
        hoursNeededPeerMounth[5] += row.hours_assigned // caso o mês seja 6, as horas necessárias em junho aumentarão
        break
      case 7:
        hoursNeededPeerMounth[6] += row.hours_assigned // caso o mês seja 7, as horas necessárias em julho aumentarão
        break
      case 8:
        hoursNeededPeerMounth[7] += row.hours_assigned // caso o mês seja 8, as horas necessárias em agosto aumentarão
        break
      case 9:
        hoursNeededPeerMounth[8] += row.hours_assigned // caso o mês seja 9, as horas necessárias em setembro aumentarão
        break
      case 10:
        hoursNeededPeerMounth[9] += row.hours_assigned // caso o mês seja 10, as horas necessárias em outubro aumentarão
        break
      case 11:
        hoursNeededPeerMounth[10] += row.hours_assigned // caso o mês seja 11, as horas necessárias em novembro aumentarão
        break
      case 12:
        hoursNeededPeerMounth[11] += row.hours_assigned // caso o mês seja 12, as horas necessárias em dezembro aumentarão
        break

      default:
        break
    }
  })

  // Retorna as horas necessárias
  return hoursNeededPeerMounth
}

// Função que faz a requisição para gerar um dos dados do Gráfico de Horas Totais (Primeiro Gráfico)
function getHoursAvailable(role) {
  let url

  // Verifica se está com filtro de função aplicado ou não
  if (role != 'all') {
    url = 'dashboard/hoursavailablefiltred/' + role
  } else {
    url = 'dashboard/hoursavailable'
  }

  let xhttp = new XMLHttpRequest() // Instancia o objeto javascript que será responsável pela requisição
  xhttp.open('get', url, false) // Abre uma requisição no método Get de forma Síncrona
  xhttp.send() // Envia a requisição

  let data = JSON.parse(xhttp.responseText) // Guarda a resposta da requisição em formato JSON
  let hoursMonth = data.projects_workload // Define as horas disponíveis por mês

  // Define as horas mês a mês percorrendo o número de meses (formato do gráfico)
  let totalHours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  if (hoursMonth) {
    for (i = 0; i < 12; i++) {
      totalHours[i] = hoursMonth
    }
  }
  // Retorna as horas totais mensais
  return totalHours
}

// Função que gera os dados de horas totais por tipo (CLT e Terceiro) para o Gráfico de Horas Totais
function getHoursAvailableByType(role, type) {
  let url
  if (role != 'all') {
    // Caso seja com filtro de função, passará o tipo de funcionário na requisição para pegar o dado filtrado
    url = `dashboard/hoursavailablefiltred/${role}/${type}`
  } else {
    url = `dashboard/hoursavailable/${type}`
  }

  // Faz a requisição
  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  // Converte o dado retornado da requisição e define as horas mês a mês
  let data = JSON.parse(xhttp.responseText)
  let hoursMonth = data.projects_workload
  let totalHours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  if (hoursMonth) {
    for (i = 0; i < 12; i++) {
      totalHours[i] = hoursMonth
    }
  }
  // Retorna as horas por mês
  return totalHours
}

function getRoles() {
  let url = 'roles/all'

  let xhtpp = new XMLHttpRequest()
  xhtpp.open('get', url, false)
  xhtpp.send()

  let data = JSON.parse(xhtpp.responseText)

  let selectRoles = $('#hours-chart-select')[0]
  console.log(data)
  data.forEach(role => {
    selectRoles.innerHTML += `<option value="${role.name}">${role.name}</option>`
  })
}
getRoles()

// Define o array que será responsável por guardar os dados do primeiro Gráfico (Horas Totais)
let generalChartData = []

// Função que gera todos os dados do primeiro Gráfico, chamando as funções que geram cada tipo de dado dos gráficos
function generateHoursChartData(role) {
  generalChartData = [
    {
      labels: yearMounths,
      datasets: [
        {
          label: 'Total de Horas Necessárias por Mês',
          backgroundColor: 'rgb(200, 0, 0)',
          borderColor: 'rgb(200, 0, 0)',
          fill: {
            target: 'origin',
            above: 'rgb(200, 0, 0, 15%)' // Area will be red above the origin
          },
          data: getHoursNeeded(role)
        },
        {
          label: 'Total de Horas de Funcionários Disponíveis por mês',
          backgroundColor: 'rgb(140, 0, 140)',
          borderColor: 'rgb(140, 0, 140)',
          data: getHoursAvailable(role),
          pointRadius: 0
        },
        {
          label: 'Total de Horas de CLTs Disponíveis por Mês',
          backgroundColor: 'rgb(220, 220, 0)',
          borderColor: 'rgb(220, 220, 0)',
          // fill: {
          //     target: 'origin',
          //     above: 'rgb(220, 220, 0, 15%)',   // Area will be red above the origin
          // },
          data: getHoursAvailableByType(role, 'CLT'),
          pointRadius: 0
        },
        {
          label: 'Total de Horas de Terceiros Disponíveis por Mês',
          backgroundColor: 'rgb(100, 100, 100)',
          borderColor: 'rgb(100, 100, 100)',
          fill: {
            target: 'origin',
            above: 'rgb(100, 100, 100, 15%)' // Area will be red above the origin
          },
          data: getHoursAvailableByType(role, 'TERCEIRO'),
          pointRadius: 0
        }
      ]
    }
  ]
  // Chama a Função que gera o Gráfico
  return generateHoursChart()
}

// Define o gráfico de horas totais
let generalChart
// Define a função que irá gerar o gráfico de horas totais (Chart.js)
function generateHoursChart(role) {
  generalChart = new Chart($(`#general-hours-chart`), {
    type: 'line',
    data: generalChartData[0],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {},
      scales: {
        y: {
          min: 0,
          max: function () {
            let hoursNeeded = Math.max(...generalChartData[0].datasets[0].data)
            let avaliableHours = generalChartData[0].datasets[1].data[0]
            if (hoursNeeded > avaliableHours) {
              return hoursNeeded + 200
            } else {
              return avaliableHours + 200
            }
          }
        }
      }
    }
  })
}

// Define o gráfico de employees
let employeesChart
// Define a função que irá gerar o gráfico de employees
function generateEmployeesChart() {
  employeesChart = new Chart($('#general-employees-chart'), {
    type: 'line',
    data: employeesChartData,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      // maintainAspectRatio: false,
      plugins: {},
      scales: {
        y: {
          min: 0,
          max: Math.max(...employeesChartData.datasets[0].data) + 1
        }
      }
    }
  })
}

// Definida a função que irá fazer a requisição para coletar o número de funcionários alocados a projetos
function getEmployeesAllocation() {
  let url = 'dashboard/monthemployees'

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)

  // Percorre o dado de alocação de cada mês retornado na requisição e define o total de employees alocados por mês
  let employeesPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  data.forEach(row => {
    switch (row.month) {
      case 1:
        employeesPerMonth[0] = row.employeeQty
        break
      case 2:
        employeesPerMonth[1] = row.employeeQty
        break
      case 3:
        employeesPerMonth[2] = row.employeeQty
        break
      case 4:
        employeesPerMonth[3] = row.employeeQty
        break
      case 5:
        employeesPerMonth[4] = row.employeeQty
        break
      case 6:
        employeesPerMonth[5] = row.employeeQty
        break
      case 7:
        employeesPerMonth[6] = row.employeeQty
        break
      case 8:
        employeesPerMonth[7] = row.employeeQty
        break
      case 9:
        employeesPerMonth[8] = row.employeeQty
        break
      case 10:
        employeesPerMonth[9] = row.employeeQty
        break
      case 11:
        employeesPerMonth[10] = row.employeeQty
        break
      case 12:
        employeesPerMonth[11] = row.employeeQty
        break

      default:
        break
    }
  })
  // Retorna o array de employees separados por mês
  return employeesPerMonth
}

// Mesma função que faz a requisição para gerar os dados para o gráfico de alocação, porém com filtro de tipo (CLT ou Terceiro)
function getEmployeesAllocationByType(type) {
  let url = 'dashboard/monthemployees/' + type

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)

  // Percorre e define a quantidade de funcionários mês a mês
  let employeesPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  data.forEach(row => {
    switch (row.month) {
      case 1:
        employeesPerMonth[0] = row.employeeQty
        break
      case 2:
        employeesPerMonth[1] = row.employeeQty
        break
      case 3:
        employeesPerMonth[2] = row.employeeQty
        break
      case 4:
        employeesPerMonth[3] = row.employeeQty
        break
      case 5:
        employeesPerMonth[4] = row.employeeQty
        break
      case 6:
        employeesPerMonth[5] = row.employeeQty
        break
      case 7:
        employeesPerMonth[6] = row.employeeQty
        break
      case 8:
        employeesPerMonth[7] = row.employeeQty
        break
      case 9:
        employeesPerMonth[8] = row.employeeQty
        break
      case 10:
        employeesPerMonth[9] = row.employeeQty
        break
      case 11:
        employeesPerMonth[10] = row.employeeQty
        break
      case 12:
        employeesPerMonth[11] = row.employeeQty
        break

      default:
        break
    }
  })
  // Retorna o array com a quantidade de funcionários alocados mês a mês
  return employeesPerMonth
}

// Define o arrya de dados do gráfico de alocação de funcionários
let employeesChartData = []
// Define a função que irá gerar os dados do gráfico de alocação de funcionários, chamando as funções que farão a requisição dos dados dos funcionários
function generateEmployeesChartData() {
  employeesChartData = {
    labels: yearMounths,
    datasets: [
      {
        label: 'Total de Funcionários Alocados por Mês (CLT e Terceiros)',
        backgroundColor: 'rgb(23, 63, 200)',
        borderColor: 'rgb(23, 63, 200)',
        fill: {
          target: 'origin',
          above: 'rgb(23, 63, 200, 15%)' // Area will be red above the origin
        },
        data: getEmployeesAllocation()
      },
      {
        label: 'Funcionários CLT Alocados por Mês',
        backgroundColor: 'rgb(10, 200, 45)',
        borderColor: 'rgb(10, 200, 45)',
        fill: {
          target: 'origin',
          above: 'rgb(10, 200, 45, 15%)' // Area will be red above the origin
        },
        data: getEmployeesAllocationByType('CLT')
      },
      {
        label: 'Funcionários Terceiros Alocados por Mês',
        backgroundColor: 'rgb(255, 120, 0)',
        borderColor: 'rgb(255, 120, 0)',
        fill: {
          target: 'origin',
          above: 'rgb(255, 120, 0, 15%)' // Area will be red above the origin
        },
        data: getEmployeesAllocationByType('TERCEIRO')
      }
    ]
  }
  // Retorna o chamamento da função que irá gerar o gráfico de alocação de funcionários
  return generateEmployeesChart()
}
// Chama a função que irá gerar os dados
generateEmployeesChartData()

// Função que faz a requisição para obter a média de horas dos funcionários por função
function getRolesWorkload() {
  let url = 'dashboard/rolesworkload'

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)
  console.log(data)

  // Percorre as linhas retornadas do banco e define as funções e seus valores de horas por mês
  let roles = []
  let monthWorkload = []
  data.forEach(row => {
    roles.push(row.role_name)
    monthWorkload.push(row.hours_assigned)
  })

  console.log(roles, monthWorkload)

  // Retorna a função que cria o gráfico de horas alocação por função
  return generateRolesWorkloadChart(roles, monthWorkload)
}
getRolesWorkload()

// Define a função que irá gerar o gráfico de horas por função
function generateRolesWorkloadChart(roles, monthWorkload) {
  new Chart($('#general-roles-chart'), {
    // seleciona o elemento do html com id "general-roles-chart" para receber o gráfico criado
    type: 'bar', // define o tipo do gráfico como sendo de barras
    data: {
      labels: roles, // define o parâmetro "roles" - os nomes das funções - como as labels do gráficos
      datasets: [
        {
          data: monthWorkload, // define o parâmetro "monthWorkload" - a carga horária mensal de cada função - como os dados do gráfico
          backgroundColor: ['red', 'blue', 'green', 'grey', 'pink'] // define essas cores como as cores das barras do gráfico
        }
      ]
    },
    options: {
      responsive: true, // gráfico responsivo
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          min: 0,
          max: function () {
            return monthWorkload[0] + 20 // a altura máxima do eixo y do gráfico é o reultado da soma do valor da maior barra mais 20
          }
        }
      }
    }
  })
}

// ######## GRÁFICO STATUS DOS FUNCIONÁRIOS

let employeeAssignmentQty // criação da variável que armazena o número de alocações de funcionários

// função que recebe acessa a requisição do número de alocações de funcionários
function getEmployeesAssignmentQty() {
  let url = 'dashboard/employeesassignmentqty' // acessa a url da rota

  // faz um http request do conteúdo do endereço da rota
  let xhttp = new XMLHttpRequest()

  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText) // faz um json dos dados recebidos

  employeeAssignmentQty = data // atribui à variável "employeeAssignmentQty" o json recebido
}

getEmployeesAssignmentQty()
console.log(employeeAssignmentQty)

// função que retorna o número de horas destinadas à projetos de um certo funcionário
function getEmployeesProjectsWorkload(id) {
  let url = 'dashboard/projectsworkload/' + id // acessa a url da rota, filtrando por id do funcionário

  // faz um http request do conteúdo do endereço da rota
  let xhttp = new XMLHttpRequest()

  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText) // faz um json dos dados recebidos

  return data[0].projects_workload // retorna o número de horas destinadas à projetos de um certo funcionário
}

// função que retorna a quantidade de horas alocadas de um funcionário
function getTodayEmployeesWorkload(id) {
  let url = 'dashboard/employeeworkload/' + id // acessa a url da rota

  // faz um http request do conteúdo do endereço da rota
  let xhttp = new XMLHttpRequest()

  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText) // faz um json dos dados recebidos

  return data[0].hours_assigned // retorna a quantidade de horas alocadas de um funcionário
}

// variáveis auxiliares para a função abaixo
let employeesGeneralOverloadedQty = 0
let employeesProjectOverloadedQty = 0
let employeesNotOverloadedQty = 0

// função que calcula o status (dentro do limite estipulado, sobrecarregados para projetos, sobrecarregados em geral) dos funcionários alocados no mês atual
function calculateWorkloadStatus() {
  for (employee = 0; employee < employeeAssignmentQty.length; employee++) {
    // percorre a lista de funcionários alocados no mês atual do sistema
    if (
      getTodayEmployeesWorkload(employeeAssignmentQty[employee].employee_id) >
      176
    ) {
      employeesGeneralOverloadedQty += 1 // aumenta o número de funcionários sobrecarregados em geral, caso o número de horas alocadas for maior que 176 (acima do limite legal)
    } else if (
      getTodayEmployeesWorkload(employeeAssignmentQty[employee].employee_id) >
      getEmployeesProjectsWorkload(employeeAssignmentQty[employee].employee_id)
    ) {
      employeesProjectOverloadedQty += 1 // aumenta o número de funcionários sobrecarregados para projetos, caso o número de horas alocadas for maior que o número de horas destinadas a projetos previamente estipulado
    } else {
      employeesNotOverloadedQty += 1 // aumenta o número de funcionários não sobrecarregados, caso o número de horas alocadas for menor ou igual ao número de horas destinadas a projetos previamente estipulado
    }
  }
}

calculateWorkloadStatus() // executa a função acima, mudando o valor das variáveis

const employeeStatusChart = { // define os dados para o gráfico
  labels: [
    'Nº de Funcionarios Dentro da Carga Horária',
    'Nº de Funcionarios Sobrecarregados Geral',
    'Nº de Funcionarios Sobrecarregados para Projetos'
  ], // define as labels do gráfico como os possíveis status dos funcionários
  datasets: [
    {
      data: [
        employeesNotOverloadedQty, // número de funcionários dentro da carga horária estipulada
        employeesGeneralOverloadedQty, // número de funcionários sobrecarregados em geral
        employeesProjectOverloadedQty // número de funcionários sobrecarregados para projetos
      ], 
      backgroundColor: [
        'rgb(155, 215, 235)',
        'rgb(154, 12, 135)',
        'rgb(255, 199, 12)'
      ] // cores das seções do gráfico
    }
  ]
}

const employeeStatusChartConfig = { // define a configuração do gráfico
  type: 'pie', // define o tipo de gráfico como sendo de pizza / stores
  data: employeeStatusChart, // define a variável "employeeStausChart" como o objeto que servirá como os dados para construção do gráfico
  options: {
    responsive: true, // gráfico responsivo
    maintainAspectRatio: false,
    plugins: {
      offset: 30
    }
  }
}

const generalCtx5 = document.getElementById('general-employee-chart2') // escolhe o elemento de id "general-employee-chart2" para receber o gráfico criado acima
const generalDashChart5 = new Chart(generalCtx5, employeeStatusChartConfig) // constrói o gráfico acima

// Função que faz a requisição para gerar os dados do gráfico de projetos (Aba de projetos do Dashboard)
function getProjectEmployees(id, type) {
  let url = `dashboard/projectemployees/${id}/${type}` // acessa a url da rota, filtrando por tipo (CLT ou TERCEIRO) e id do funcionário

  // faz um http request do conteúdo do endereço da rota
  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)[0] // faz um json dos dados recebidos
  // Retorna os dados de quantidade de funcionários
  if (data) {
    return data.employee_qty
  } else {
    return 0
  }
}

// Define a estrutura do gráfico
const project1Chart1 = {
  labels: [
    'Nº de Funcionários Terceirizado no Projeto',
    'Nº de Funcionários CLT no Projeto'
  ],
  datasets: [
    {
      data: [
        getProjectEmployees(14, 'CLT'), // Chama a função que irá retornar a quantidade de funcionários CLTs alocados ao projeto
        getProjectEmployees(14, 'TERCEIRO') // Chama a função que irá retornar a quantidade de funcionários Terceiros alocados ao projeto
      ],
      backgroundColor: [
        'rgb(255, 205, 86)',
        'rgb(54, 162, 235)'
        // 'rgb(255, 99, 132)',
      ]
    }
  ]
}

// Define a configuração do gráfico
const project1Chart1Config = {
  type: 'pie',
  data: project1Chart1,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      offset: 30
    }
  }
}

const project1Chart2 = {
  labels: ['data inicial', 'data final'],
  datasets: [
    {
      data: [
        {
          x: 0
        },
        {
          x: 100
        }
      ]
    }
  ]
}

const project1Chart2Config = {
  type: 'line',
  data: project1Chart2,
  options: {}
}

const project1Chart3 = {
  labels: [
    'Analista',
    'DBA',
    'Gestor de Projetos',
    'Tester',
    'Suporte',
    'Desenvolvedor'
  ],
  datasets: [
    {
      backgroundColor: 'rgb(200, 0, 0)',
      borderColor: 'rgb(200, 0, 0)',

      fill: {
        target: 'origin',
        above: 'rgb(200, 0, 0, 15%)' // Area will be red above the origin
      },
      data: [180, 100, 160, 130, 220, 150],
      backgroundColor: ['red', 'blue', 'green', 'grey', 'pink']
    }
  ]
}

const project1Chart3Config = {
  type: 'bar',
  data: project1Chart3,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    }
  }
}

const project1Ctx = document.getElementById('project-employee-chart')
let projectChartAllocation
function generateProjectAllocationChart() {
  projectChartAllocation = new Chart(project1Ctx, project1Chart1Config)
}

let rolesWorkload
// Define a função que irá gerar o gráfico de horas por função filtrado por projeto
function generateRolesWorkloadFilteredChart(roles, monthWorkload) {
  rolesWorkload = new Chart($('#project-roles-chart'), {
    type: 'bar',
    data: {
      labels: roles,
      datasets: [
        {
          data: monthWorkload,
          backgroundColor: ['red', 'blue', 'green', 'grey', 'pink']
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          min: 0,
          max: function () {
            return monthWorkload[0] + 20
          }
        }
      }
    }
  })
}

// Chama a função para gerar os primeiros gráficos de horas da tela
generateHoursChartData('all')
// Define a função que irá ser responsável por excluir o gráfico de horas antigo e gerar o novo de acordo com o filtro de função escolhido
function chartChange(value) {
  if (generalChart) {
    generalChart.destroy()
  }
  generateHoursChartData(value)
}

// Função que faz a requisição para obter a média de horas dos funcionários por função
function getRolesWorkloadFiltered(projectId) {
  let url = `dashboard/rolesworkloadfiltered/${projectId}` // acessa a url da rota, filtrando por id do projeto

  // faz um http request do conteúdo do endereço da rota
  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText) // faz um json dos dados recebidos

  // Percorre as linhas retornadas do banco e define as funções e seus valores de horas por mês
  let roles = []
  let monthWorkload = []
  data.forEach(row => {
    roles.push(row.role_name)
    monthWorkload.push(row.hours_assigned)
  })

  // Retorna a função que cria o gráfico de horas alocação por função
  return generateRolesWorkloadFilteredChart(roles, monthWorkload)
}

getRolesWorkloadFiltered(14)

// Define a função que irá esconder e mostrar os gráficos de acordo com a aba do dashboard escolhido (Geral ou Projeto)
function changeDashSection(dashSection) {
  if (dashSection == 'general') {
    document.getElementById('project').hidden = true
    document.getElementById('general').hidden = false
  } else {
    document.getElementById('general').hidden = true
    document.getElementById('project').hidden = false

    if (rolesWorkload) {
      rolesWorkload.destroy()
      getRolesWorkloadFiltered(14)
    }
    // Destrói o gráfico antigo caso exista algum
    if (projectChartAllocation) {
      projectChartAllocation.destroy()
    }
    // Gera um novo gráfico
    generateProjectAllocationChart()
  }
}
