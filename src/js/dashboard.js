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
    'Dezembro',
]
const generalChart1 = {
    labels: yearMounths,
    datasets: [
        {
            label: 'Total de Horas Necessárias por Mês',
            backgroundColor: 'rgb(200, 0, 0)',
            borderColor: 'rgb(200, 0, 0)',
            fill: {
                target: 'origin',
                above: 'rgb(200, 0, 0, 15%)',   // Area will be red above the origin
            },
            data: [2500, 2500, 3500, 4000, 3500, 2500, 3500, 4000, 4500, 2500, 4500, 2500],
        },
        {
            label: 'Total de Horas de Funcionários Disponíveis por mês',
            backgroundColor: 'rgb(140, 0, 140)',
            borderColor: 'rgb(140, 0, 140)',
            // fill: {
            //     target: 'origin',
            //     above: 'rgb(140, 0, 140, 15%)',   // Area will be red above the origin
            // },
            data: [3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500],
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
            data: [2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500, 2500],
            pointRadius: 0
        },
        {
            label: 'Total de Horas de Terceiros Disponíveis por Mês',
            backgroundColor: 'rgb(100, 100, 100)',
            borderColor: 'rgb(100, 100, 100)',
            fill: {
                target: 'origin',
                above: 'rgb(100, 100, 100, 15%)',   // Area will be red above the origin
            },
            data: [1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000, 1000],
            pointRadius: 0
        },
    ],
}
const generalChart1Config = {
    type: 'line',
    data: generalChart1,
    options: {
        responsive: true,
        maintainAspectRatio: false,    
        plugins: {
        },
        scales: {
            y: {
                min: 0,
                max: 5000,
            }
        }
    }
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
                above: 'rgb(23, 63, 200, 15%)',   // Area will be red above the origin
            },
            data: [1000, 600, 5500, 2250, 4050, 4400, 8100, 5500, 2520, 4740, 3870, 3510],
        },
        {
            label: 'Funcionários CLT Alocados por Mês',
            backgroundColor: 'rgb(10, 200, 45)',
            borderColor: 'rgb(10, 200, 45)',
            fill: {
                target: 'origin',
                above: 'rgb(10, 200, 45, 15%)',   // Area will be red above the origin
            },
            data: [250, 500, 2500, 750, 2300, 3200, 2500, 4500, 1000, 4220, 3500, 2750],
        },
        {
            label: 'Funcionários Terceiros Alocados por Mês',
            backgroundColor: 'rgb(255, 120, 0)',
            borderColor: 'rgb(255, 120, 0)',
            fill: {
                target: 'origin',
                above: 'rgb(255, 120, 0, 15%)',   // Area will be red above the origin
            },
            data: [750, 100, 2500, 1500, 1750, 1200, 3100, 1000, 520, 520, 370, 760],
        },
    ],
}

const generalChart2Config = {
    type: 'line',
    data: generalChart2,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        // maintainAspectRatio: false,    
        plugins: {
        }
    }
}

const generalChart3 = {
    labels: [
        "Analista", "DBA", "Gestor de Projetos", "Tester", "Suporte", "Desenvolvedor"
    ],
    datasets: [
        {
            backgroundColor: 'rgb(200, 0, 0)',
            borderColor: 'rgb(200, 0, 0)',

            fill: {
                target: 'origin',
                above: 'rgb(200, 0, 0, 15%)',   // Area will be red above the origin
            },
            data: [180, 100, 160, 130, 220, 150],
            backgroundColor: ["red", "blue", "green", "grey", "pink"], 
        },
    ],
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
            },
        }
    }
}

const generalChart4 = {
    labels: [
        'Nº de Projetos Atrasados',
        'Nº de Projetos com Data Alterada',
        'Nº de Projetos no Tempo'
    ],
    datasets: [{
        data: [50, 100, 25],
        backgroundColor: 
        [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            'rgb(54, 162, 235)',
        ],
    }]
  };

const generalChart4Config = {
    type: 'pie',
    data: generalChart4,
    options: {
        responsive: true,
        maintainAspectRatio: false,    
        plugins: {
            offset: 30
        }
    },
  };
  //########################################################

  const generalChart5 = {
    labels: [
        'Nº de Funcionarios Dentro da Carga Horária',
        'Nº de Funcionarios em Sobretempo Geral',
        'Nº de Funcionarios em Sobretempo para Projetos'
    ],
    datasets: [{
        data: [70, 100, 20],
        backgroundColor: 
        [
            'rgb(155, 215, 235)',
            'rgb(154, 12, 135)',
            'rgb(255, 199, 12)',
        ],
    }]
  };

const generalChart5Config = {
    type: 'pie',
    data: generalChart5,
    options: {
        responsive: true,
        maintainAspectRatio: false,    
        plugins: {
            offset: 30
        }
    },
  };
//###########################################################

//  Gráficos da tela Geral do Dashboard
const generalCtx = document.getElementById('general-hours-chart')
const generalDashChart1 = new Chart(generalCtx, generalChart1Config)

const generalCtx2 = document.getElementById("general-employee-chart")
const generalDashChart2 = new Chart(generalCtx2, generalChart2Config)

const generalCtx3 = document.getElementById("general-role-chart")
const generalDashChart3 = new Chart(generalCtx3, generalDash3Config)

const generalCtx4 = document.getElementById("general-projects-status-chart")
const generalDashChart4 = new Chart(generalCtx4, generalChart4Config)

//#########################################################################################

const generalCtx5 = document.getElementById("general-projects-employee-chart2")
const generalDashChart5 = new Chart(generalCtx5, generalChart5Config)

//#########################################################################################

//  Gráficos da tela de Projeto 1 do Dashboard
const project1Chart1 = {
    labels: [
        'Nº de Funcionários Terceirizado no Projeto',
        'Nº de Funcionários CLT no Projeto',
    ],
    datasets: [{
        data: [15, 20],
        backgroundColor: 
        [
            'rgb(255, 205, 86)',
            'rgb(54, 162, 235)',
            // 'rgb(255, 99, 132)',
        ],
    }]
  };

const project1Chart1Config = {
    type: 'pie',
    data: project1Chart1,
    options: {
        responsive: true,
        maintainAspectRatio: false,    
        plugins: {
            offset: 30
        }
    },
  };

const project1Chart2 = {
    labels: [
        "data inicial", "data final"
    ],
    datasets: [{
        data: [{
            x: 0
        }, {
            x: 100
        }]
    }],
}

const project1Chart2Config = {
    type: 'line',
    data: project1Chart2,
    options: {
    }
}

const project1Chart3 = {
    labels: [
        "Analista", "DBA", "Gestor de Projetos", "Tester", "Suporte", "Desenvolvedor"
    ],
    datasets: [
        {
            backgroundColor: 'rgb(200, 0, 0)',
            borderColor: 'rgb(200, 0, 0)',

            fill: {
                target: 'origin',
                above: 'rgb(200, 0, 0, 15%)',   // Area will be red above the origin
            },
            data: [180, 100, 160, 130, 220, 150],
            backgroundColor: ["red", "blue", "green", "grey", "pink"], 
        },
    ],
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
            },
        }
    }
}

const project1Ctx = document.getElementById('project1-employee-chart')
const project1DashChart1 = new Chart(project1Ctx, project1Chart1Config)

// const project1Ctx2 = document.getElementById("project1-estimate-chart")
// const project1DashChart2 = new Chart(project1Ctx2, project1Chart2Config)

const project1Ctx3 = document.getElementById("project1-role-chart")
const project1DashChart3 = new Chart(project1Ctx3, project1Chart3Config)


//  Gráficos da tela de Projeto 2 do Dashboard
const project2Chart1 = {
    labels: [
        'Nº de Funcionários Terceirizado no Projeto',
        'Nº de Funcionários CLT no Projeto',
    ],
    datasets: [{
        data: [5, 10],
        backgroundColor: 
        [
            'rgb(255, 205, 86)',
            'rgb(54, 162, 235)',
            // 'rgb(255, 99, 132)',
        ],
    }]
  };

const project2Chart1Config = {
    type: 'pie',
    data: project2Chart1,
    options: {
        responsive: true,
        maintainAspectRatio: false,    
        plugins: {
            offset: 30
        }
    },
  };

const project2Chart2 = {
    labels: [
        "data inicial", "data final"
    ],
    datasets: [{
        data: [{
            x: 0
        }, {
            x: 100
        }]
    }],
}

const project2Chart3 = {
    labels: [
        "Analista", "DBA", "Gestor de Projetos", "Tester", "Suporte", "Desenvolvedor"
    ],
    datasets: [
        {
            backgroundColor: 'rgb(200, 0, 0)',
            borderColor: 'rgb(200, 0, 0)',

            fill: {
                target: 'origin',
                above: 'rgb(200, 0, 0, 15%)',   // Area will be red above the origin
            },
            data: [180, 100, 160, 130, 220, 150],
            backgroundColor: ["red", "blue", "green", "grey", "pink"], 
        },
    ],
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
            },
        }
    }
}

const project2Ctx = document.getElementById('project2-employee-chart')
const project2DashChart1 = new Chart(project2Ctx, project2Chart1Config)

// const project2Ctx2 = document.getElementById("project2-estimate-chart")
// const project2DashChart2 = new Chart(project2Ctx2, project2Chart2Config)

const project2Ctx3 = document.getElementById("project2-role-chart")
const project2DashChart3 = new Chart(project2Ctx3, project2Chart3Config)

//  Gráficos da tela de Projeto 1 do Dashboard
const project3Chart1 = {
    labels: [
        'Nº de Funcionários Terceirizado no Projeto',
        'Nº de Funcionários CLT no Projeto',
    ],
    datasets: [{
        data: [15, 5],
        backgroundColor: 
        [
            'rgb(255, 205, 86)',
            'rgb(54, 162, 235)',
            // 'rgb(255, 99, 132)',
        ],
    }]
  };

const project3Chart1Config = {
    type: 'pie',
    data: project3Chart1,
    options: {
        responsive: true,
        maintainAspectRatio: false,    
        plugins: {
            offset: 30
        }
    },
  };

const project3Chart2 = {
    labels: [
        "data inicial", "data final"
    ],
    datasets: [{
        data: [{
            x: 0
        }, {
            x: 100
        }]
    }],
}

const project3Chart2Config = {
    type: 'line',
    data: project3Chart2,
    options: {
    }
}

const project3Chart3 = {
    labels: [
        "Analista", "DBA", "Gestor de Projetos", "Tester", "Suporte", "Desenvolvedor"
    ],
    datasets: [
        {
            backgroundColor: 'rgb(200, 0, 0)',
            borderColor: 'rgb(200, 0, 0)',

            fill: {
                target: 'origin',
                above: 'rgb(200, 0, 0, 15%)',   // Area will be red above the origin
            },
            data: [180, 100, 160, 130, 220, 150],
            backgroundColor: ["red", "blue", "green", "grey", "pink"], 
        },
    ],
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
            },
        }
    }
}

const project3Ctx = document.getElementById('project3-employee-chart')
const project3DashChart1 = new Chart(project3Ctx, project3Chart1Config)

// const project2Ctx2 = document.getElementById("project2-estimate-chart")
// const project2DashChart2 = new Chart(project2Ctx2, project2Chart2Config)

const project3Ctx3 = document.getElementById("project3-role-chart")
const project3DashChart3 = new Chart(project3Ctx3, project3Chart3Config)

let lastSection
let changeDashSection = function(dashSection){
    if(lastSection) {
        document.getElementById(lastSection).hidden = true
    }
    else {
        document.getElementById("general").hidden = true
    }
    document.getElementById(dashSection).hidden = false
    lastSection = dashSection 
}