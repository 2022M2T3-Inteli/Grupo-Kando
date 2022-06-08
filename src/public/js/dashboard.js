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

function getHoursNeeded(role) {
  let url
  if (type != 'all') {
    url = '/totalhours/' + role
  } else {
    url = '/totalhours'
  }

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhhtp.send()

  let data = JSON.parse(xhttp.responseText)

  let hoursNeededPeerMounth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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

  return hoursNeededPeerMounth
}

function getHoursAvailable(role) {
  let url
  if (type != 'all') {
    url = '/hoursavailable/' + role
  } else {
    url = '/hoursavailable'
  }

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhhtp.send()

  let data = JSON.parse(xhttp.responseText)
  let totalHours = [
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload
  ]

  return totalHours
}

function getHoursAvailableByType(role, type) {
  let url
  if (role != 'all') {
    url = `/hoursavailable/${role}/${type}`
  } else {
    url = `/hoursavailable/${type}`
  }

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhhtp.send()

  let data = JSON.parse(xhttp.responseText)

  let totalHours = [
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload,
    data.projecs_workload
  ]

  return totalHours
}

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
function generateHoursChartData(role) {
  return [
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
    // {
    //   labels: yearMounths,
    //   datasets: [
    //     {
    //       label: 'Total de Horas Necessárias por Mês',
    //       backgroundColor: 'rgb(200, 0, 0)',
    //       borderColor: 'rgb(200, 0, 0)',
    //       fill: {
    //         target: 'origin',
    //         above: 'rgb(200, 0, 0, 15%)' // Area will be red above the origin
    //       },
    //       data: [250, 750, 1000, 700, 300, 200, 400, 1000, 1200, 1400, 2000, 100]
    //     },
    //     {
    //       label: 'Total de Horas de Funcionários Disponíveis por mês',
    //       backgroundColor: 'rgb(140, 0, 140)',
    //       borderColor: 'rgb(140, 0, 140)',
    //       // fill: {
    //       //     target: 'origin',
    //       //     above: 'rgb(140, 0, 140, 15%)',   // Area will be red above the origin
    //       // },
    //       data: [
    //         1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500
    //       ],
    //       pointRadius: 0
    //     },
    //     {
    //       label: 'Total de Horas de CLTs Disponíveis por Mês',
    //       backgroundColor: 'rgb(220, 220, 0)',
    //       borderColor: 'rgb(220, 220, 0)',
    //       // fill: {
    //       //     target: 'origin',
    //       //     above: 'rgb(220, 220, 0, 15%)',   // Area will be red above the origin
    //       // },
    //       data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
    //       pointRadius: 0
    //     },
    //     {
    //       label: 'Total de Horas de Terceiros Disponíveis por Mês',
    //       backgroundColor: 'rgb(100, 100, 100)',
    //       borderColor: 'rgb(100, 100, 100)',
    //       fill: {
    //         target: 'origin',
    //         above: 'rgb(100, 100, 100, 15%)' // Area will be red above the origin
    //       },
    //       data: [
    //         1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000
    //       ],
    //       pointRadius: 0
    //     }
    //   ]
    // },
    // {
    //   labels: yearMounths,
    //   datasets: [
    //     {
    //       label: 'Total de Horas Necessárias por Mês',
    //       backgroundColor: 'rgb(200, 0, 0)',
    //       borderColor: 'rgb(200, 0, 0)',
    //       fill: {
    //         target: 'origin',
    //         above: 'rgb(200, 0, 0, 15%)' // Area will be red above the origin
    //       },
    //       data: [400, 200, 600, 300, 450, 600, 700, 800, 1000, 200, 300, 400]
    //     },
    //     {
    //       label: 'Total de Horas de Funcionários Disponíveis por mês',
    //       backgroundColor: 'rgb(140, 0, 140)',
    //       borderColor: 'rgb(140, 0, 140)',
    //       // fill: {
    //       //     target: 'origin',
    //       //     above: 'rgb(140, 0, 140, 15%)',   // Area will be red above the origin
    //       // },
    //       data: [
    //         1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200, 1200
    //       ],
    //       pointRadius: 0
    //     },
    //     {
    //       label: 'Total de Horas de CLTs Disponíveis por Mês',
    //       backgroundColor: 'rgb(220, 220, 0)',
    //       borderColor: 'rgb(220, 220, 0)',
    //       // fill: {
    //       //     target: 'origin',
    //       //     above: 'rgb(220, 220, 0, 15%)',   // Area will be red above the origin
    //       // },
    //       data: [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300],
    //       pointRadius: 0
    //     },
    //     {
    //       label: 'Total de Horas de Terceiros Disponíveis por Mês',
    //       backgroundColor: 'rgb(100, 100, 100)',
    //       borderColor: 'rgb(100, 100, 100)',
    //       fill: {
    //         target: 'origin',
    //         above: 'rgb(100, 100, 100, 15%)' // Area will be red above the origin
    //       },
    //       data: [900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900, 900],
    //       pointRadius: 0
    //     }
    //   ]
    // },
    // {
    //   labels: yearMounths,
    //   datasets: [
    //     {
    //       label: 'Total de Horas Necessárias por Mês',
    //       backgroundColor: 'rgb(200, 0, 0)',
    //       borderColor: 'rgb(200, 0, 0)',
    //       fill: {
    //         target: 'origin',
    //         above: 'rgb(200, 0, 0, 15%)' // Area will be red above the origin
    //       },
    //       data: [1000, 1200, 1300, 400, 500, 600, 1200, 700, 900, 1000, 300, 200]
    //     },
    //     {
    //       label: 'Total de Horas de Funcionários Disponíveis por mês',
    //       backgroundColor: 'rgb(140, 0, 140)',
    //       borderColor: 'rgb(140, 0, 140)',
    //       // fill: {
    //       //     target: 'origin',
    //       //     above: 'rgb(140, 0, 140, 15%)',   // Area will be red above the origin
    //       // },
    //       data: [
    //         2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000
    //       ],
    //       pointRadius: 0
    //     },
    //     {
    //       label: 'Total de Horas de CLTs Disponíveis por Mês',
    //       backgroundColor: 'rgb(220, 220, 0)',
    //       borderColor: 'rgb(220, 220, 0)',
    //       // fill: {
    //       //     target: 'origin',
    //       //     above: 'rgb(220, 220, 0, 15%)',   // Area will be red above the origin
    //       // },
    //       data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
    //       pointRadius: 0
    //     },
    //     {
    //       label: 'Total de Horas de Terceiros Disponíveis por Mês',
    //       backgroundColor: 'rgb(100, 100, 100)',
    //       borderColor: 'rgb(100, 100, 100)',
    //       fill: {
    //         target: 'origin',
    //         above: 'rgb(100, 100, 100, 15%)' // Area will be red above the origin
    //       },
    //       data: [750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750, 750],
    //       pointRadius: 0
    //     }
    //   ]
    // }
  ]
}

const generalChart2 = {
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
      data: [
        1000, 600, 5500, 2250, 4050, 4400, 8100, 5500, 2520, 4740, 3870, 3510
      ]
    },
    {
      label: 'Funcionários CLT Alocados por Mês',
      backgroundColor: 'rgb(10, 200, 45)',
      borderColor: 'rgb(10, 200, 45)',
      fill: {
        target: 'origin',
        above: 'rgb(10, 200, 45, 15%)' // Area will be red above the origin
      },
      data: [
        250, 500, 2500, 750, 2300, 3200, 2500, 4500, 1000, 4220, 3500, 2750
      ]
    },
    {
      label: 'Funcionários Terceiros Alocados por Mês',
      backgroundColor: 'rgb(255, 120, 0)',
      borderColor: 'rgb(255, 120, 0)',
      fill: {
        target: 'origin',
        above: 'rgb(255, 120, 0, 15%)' // Area will be red above the origin
      },
      data: [750, 100, 2500, 1500, 1750, 1200, 3100, 1000, 520, 520, 370, 760]
    }
  ]
}

const generalChart2Config = {
  type: 'line',
  data: generalChart2,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    // maintainAspectRatio: false,
    plugins: {}
  }
}

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
//########################################################

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
//###########################################################

//  Gráficos da tela Geral do Dashboard
const generalHoursCtx = $('.hours-chart')
const generalHoursCharts = []

function generateHoursChart(role) {
  new Chart($(`#general-hours-chart${role}`), {
    type: 'line',
    data: generalHoursChartsData[index],
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {},
      scales: {
        y: {
          min: 0,
          max: function () {
            let hoursNeeded = Math.max(
              ...generalHoursChartsData[index].datasets[0].data
            )
            let avaliableHours =
              generalHoursChartsData[index].datasets[1].data[0]

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

generalHoursCtx.each(function (index) {
  generalHoursCharts.push(
    new Chart($(`#general-hours-chart${index}`), {
      type: 'line',
      data: generalHoursChartsData[index],
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {},
        scales: {
          y: {
            min: 0,
            max: function () {
              let hoursNeeded = Math.max(
                ...generalHoursChartsData[index].datasets[0].data
              )
              let avaliableHours =
                generalHoursChartsData[index].datasets[1].data[0]

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
  )
})

const generalCtx2 = document.getElementById('general-employee-chart')
const generalDashChart2 = new Chart(generalCtx2, generalChart2Config)

const generalCtx3 = document.getElementById('general-role-chart')
const generalDashChart3 = new Chart(generalCtx3, generalDash3Config)

const generalCtx4 = document.getElementById('general-projects-status-chart')
const generalDashChart4 = new Chart(generalCtx4, generalChart4Config)

const generalCtx5 = document.getElementById('general-employee-chart2')
const generalDashChart5 = new Chart(generalCtx5, generalChart5Config)

let generalLastChart
let generalLastChartIndex = 0
function chartChange(value) {
  if (generalLastChart) {
    document.getElementById(generalLastChart).hidden = true
    document.getElementById(generalLastChart + '-title').hidden = true
  } else {
    document.getElementById('general-hours-chart0').hidden = true
    document.getElementById('general-hours-chart0-title').hidden = true
  }
  document.getElementById(value).hidden = false
  document.getElementById(value + '-title').hidden = false
  generalLastChart = value
  generalLastChartIndex += 1
  if (generalLastChartIndex > generalHoursCharts.length) {
    generalLastChartIndex = 0
  }
}

//  Gráficos da tela de Projeto 1 do Dashboard

function getProjectEmployee(type) {
  let url = '/projectemployees/14/' + type

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  return JSON.parse(xhttp.responseText)
}

const project1Chart1 = {
  labels: [
    'Nº de Funcionários Terceirizado no Projeto',
    'Nº de Funcionários CLT no Projeto'
  ],
  datasets: [
    {
      data: [getProjectEmployee('CLT'), getProjectEmployee('TERCEIRO')],
      backgroundColor: [
        'rgb(255, 205, 86)',
        'rgb(54, 162, 235)'
        // 'rgb(255, 99, 132)',
      ]
    }
  ]
}

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

const project1Ctx = document.getElementById('project1-employee-chart')
const project1DashChart1 = new Chart(project1Ctx, project1Chart1Config)

// const project1Ctx2 = document.getElementById("project1-estimate-chart")
// const project1DashChart2 = new Chart(project1Ctx2, project1Chart2Config)

const project1Ctx3 = document.getElementById('project1-role-chart')
const project1DashChart3 = new Chart(project1Ctx3, project1Chart3Config)

//  Gráficos da tela de Projeto 2 do Dashboard
const project2Chart1 = {
  labels: [
    'Nº de Funcionários Terceirizado no Projeto',
    'Nº de Funcionários CLT no Projeto'
  ],
  datasets: [
    {
      data: [5, 10],
      backgroundColor: [
        'rgb(255, 205, 86)',
        'rgb(54, 162, 235)'
        // 'rgb(255, 99, 132)',
      ]
    }
  ]
}

const project2Chart1Config = {
  type: 'pie',
  data: project2Chart1,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      offset: 30
    }
  }
}

const project2Chart2 = {
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

const project2Chart3 = {
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

const project2Chart3Config = {
  type: 'bar',
  data: project2Chart3,
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

const project2Ctx = document.getElementById('project2-employee-chart')
const project2DashChart1 = new Chart(project2Ctx, project2Chart1Config)

// const project2Ctx2 = document.getElementById("project2-estimate-chart")
// const project2DashChart2 = new Chart(project2Ctx2, project2Chart2Config)

const project2Ctx3 = document.getElementById('project2-role-chart')
const project2DashChart3 = new Chart(project2Ctx3, project2Chart3Config)

//  Gráficos da tela de Projeto 1 do Dashboard
const project3Chart1 = {
  labels: [
    'Nº de Funcionários Terceirizado no Projeto',
    'Nº de Funcionários CLT no Projeto'
  ],
  datasets: [
    {
      data: [15, 5],
      backgroundColor: [
        'rgb(255, 205, 86)',
        'rgb(54, 162, 235)'
        // 'rgb(255, 99, 132)',
      ]
    }
  ]
}

const project3Chart1Config = {
  type: 'pie',
  data: project3Chart1,
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      offset: 30
    }
  }
}

const project3Chart2 = {
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

const project3Chart2Config = {
  type: 'line',
  data: project3Chart2,
  options: {}
}

const project3Chart3 = {
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

const project3Chart3Config = {
  type: 'bar',
  data: project3Chart3,
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

const project3Ctx = document.getElementById('project3-employee-chart')
const project3DashChart1 = new Chart(project3Ctx, project3Chart1Config)

// const project2Ctx2 = document.getElementById("project2-estimate-chart")
// const project2DashChart2 = new Chart(project2Ctx2, project2Chart2Config)

const project3Ctx3 = document.getElementById('project3-role-chart')
const project3DashChart3 = new Chart(project3Ctx3, project3Chart3Config)

let lastSection
let changeDashSection = function (dashSection) {
  if (lastSection) {
    document.getElementById(lastSection).hidden = true
  } else {
    document.getElementById('general').hidden = true
  }
  document.getElementById(dashSection).hidden = false
  lastSection = dashSection
}
