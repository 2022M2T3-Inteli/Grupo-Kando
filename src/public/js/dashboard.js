// let totalMonthWorkload = {
//   hoursNeeded: {
//     jan: 0,
//     feb: 0,
//     mar: 0,
//     apr: 0,
//     may: 0,
//     jun: 0,
//     jul: 0,
//     aug: 0,
//     sep: 0,
//     oct: 0,
//     nov: 0,
//     dec: 0
//   },
//   hoursAvailableAll: 0,
//   hoursAvailableCLT: 0,
//   hoursAvailableETW: 0
// }

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


// ######## Início dos gráficos estáticos
const generalChart3 = {
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

const generalDash3Config = {
  type: 'bar',
  data: generalChart3,
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

const generalChart4 = {
  labels: [
    'Nº de Projetos Atrasados',
    'Nº de Projetos com Data Alterada',
    'Nº de Projetos no Tempo'
  ],
  datasets: [
    {
      data: [50, 100, 25],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 205, 86)',
        'rgb(54, 162, 235)'
      ]
    }
  ]
}

const generalChart4Config = {
  type: 'pie',
  data: generalChart4,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      offset: 30
    }
  }
}

const generalChart5 = {
  labels: [
    'Nº de Funcionarios Dentro da Carga Horária',
    'Nº de Funcionarios Sobrecarregados Geral',
    'Nº de Funcionarios Sobrecarregados para Projetos'
  ],
  datasets: [
    {
      data: [70, 100, 20],
      backgroundColor: [
        'rgb(155, 215, 235)',
        'rgb(154, 12, 135)',
        'rgb(255, 199, 12)'
      ]
    }
  ]
}

const generalChart5Config = {
  type: 'pie',
  data: generalChart5,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      offset: 30
    }
  }
}

//  Gráficos da tela Geral do Dashboard
const generalCtx3 = document.getElementById('general-role-chart')
const generalDashChart3 = new Chart(generalCtx3, generalDash3Config)

const generalCtx4 = document.getElementById('general-projects-status-chart')
const generalDashChart4 = new Chart(generalCtx4, generalChart4Config)

const generalCtx5 = document.getElementById('general-employee-chart2')
const generalDashChart5 = new Chart(generalCtx5, generalChart5Config)

// ############### Fim dos gráficos estáticos

// Função que faz a requisição para gerar os dados do gráfico de projetos (Aba de projetos do Dashboard)
function getProjectEmployees(id, type) {
  let url = `dashboard/projectemployees/${id}/${type}`

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)[0]
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

// ############# Início do gráfico estático de projetos
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

// const project1Ctx2 = document.getElementById("project1-estimate-chart")
// const project1DashChart2 = new Chart(project1Ctx2, project1Chart2Config)

const project1Ctx3 = document.getElementById('project-role-chart')
const project1DashChart3 = new Chart(project1Ctx3, project1Chart3Config)

// ############ Fim do gráfico estático de projetos

// Chama a função para gerar os primeiros gráficos de horas da tela
generateHoursChartData('all')
// Define a função que irá ser responsável por excluir o gráfico de horas antigo e gerar o novo de acordo com o filtro de função escolhido
function chartChange(value) {
  if (generalChart) {
    generalChart.destroy()
  }
  generateHoursChartData(value)
}

// Define a função que irá esconder e mostrar os gráficos de acordo com a aba do dashboard escolhido (Geral ou Projeto)
function changeDashSection(dashSection) {
  if (dashSection == 'general') {
    document.getElementById('project').hidden = true
    document.getElementById('general').hidden = false
  } else {
    document.getElementById('general').hidden = true
    document.getElementById('project').hidden = false

    // Destrói o gráfico antigo caso exista algum
    if (projectChartAllocation) {
      projectChartAllocation.destroy()
    }
    // Gera um novo gráfico
    generateProjectAllocationChart()
  }
}
