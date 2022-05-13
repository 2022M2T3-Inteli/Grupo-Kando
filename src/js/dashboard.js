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
const generalDash1 = {
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
            data: [2500, 3000, 3500, 4000, 3500, 3000, 3500, 4000, 4500, 3000, 4500, 5000],
        },
        {
            label: 'Total de Horas de Funcionários Disponíveis por mês',
            backgroundColor: 'rgb(140, 0, 140)',
            borderColor: 'rgb(140, 0, 140)',
            fill: {
                target: 'origin',
                above: 'rgb(140, 0, 140, 15%)',   // Area will be red above the origin
            },
            data: [2000, 2500, 3000, 3500, 3000, 2000, 2750, 3500, 3000, 3000, 4000, 3000],
        },
        {
            label: 'Total de Horas de CLTs Disponíveis por Mês',
            backgroundColor: 'rgb(220, 220, 0)',
            borderColor: 'rgb(220, 220, 0)',
            fill: {
                target: 'origin',
                above: 'rgb(220, 220, 0, 15%)',   // Area will be red above the origin
            },
            data: [1500, 2000, 2500, 2500, 2000, 1000, 2000, 3000, 1500, 2000, 2500, 2000],
        },
        {
            label: 'Total de Horas de Terceiros Disponíveis por Mês',
            backgroundColor: 'rgb(100, 100, 100)',
            borderColor: 'rgb(100, 100, 100)',
            fill: {
                target: 'origin',
                above: 'rgb(100, 100, 100, 15%)',   // Area will be red above the origin
            },
            data: [500, 500, 1000, 1000, 1250, 1000, 1750, 2000, 1500, 1000, 1500, 2500],
        },
    ],
}
const generalDash1Config = {
    type: 'line',
    data: generalDash1,
    options: {
        responsive: true,
        maintainAspectRatio: false,    
        plugins: {

        }
    }
}

const generalDash2 = {
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
            data: [250, 500, 2500, 750, 2300, 3200, 5000, 4500, 2000, 4220, 3500, 2750],
        },
        {
            label: 'Funcionários Terceiros Alocados por Mês',
            backgroundColor: 'rgb(255, 120, 0)',
            borderColor: 'rgb(255, 120, 0)',
            fill: {
                target: 'origin',
                above: 'rgb(255, 120, 0, 15%)',   // Area will be red above the origin
            },
            data: [750, 100, 3000, 1500, 1750, 1200, 3100, 1000, 520, 520, 370, 760],
        },
    ],
}

const generalDash2Config = {
    type: 'line',
    data: generalDash2,
    options: {
        responsive: true,
        maintainAspectRatio: false,
        // maintainAspectRatio: false,    
        plugins: {
        }
    }
}

const generalDash3 = {
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
    data: generalDash3,
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

const generalDash4 = {
    labels: [
        'Nº de Projetos Atrasados',
        'Nº de Projetos com Data Alterada',
        'Nº de Projetos no Tempo'
    ],
    datasets: [{
        datalabels: {
            color: 'yellow'
          },
        data: [50, 100, 25],
        backgroundColor: 
        [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)',
            'rgb(54, 162, 235)',
        ],
    }]
  };

const generalDash4Config = {
    type: 'pie',
    data: generalDash4,
    options: {
        responsive: true,
        maintainAspectRatio: false,    
        plugins: {
            offset: 30
        }
    },
  };

const ctx = document.getElementsByClassName('area-chart')
const generalDashChart1 = new Chart(ctx, generalDash1Config)

const ctx2 = document.getElementById("employee-dash")
const generalDashChart2 = new Chart(ctx2, generalDash2Config)

const ctx3 = document.getElementById("occupation-dash")
const generalDashChart3 = new Chart(ctx3, generalDash3Config)

const ctx4 = document.getElementById("projects-status-dash")
const myChart4 = new Chart(ctx4, generalDash4Config)

 

let lastSection
let changeDashSection = function(dashSection){
    if(lastSection) {
        document.getElementById(lastSection).hidden = true
        myChart2
    }
    else {
        document.getElementById("general").hidden = true
    }
    document.getElementById(dashSection).hidden = false
    lastSection = dashSection 
}