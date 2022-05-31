function abrir() {
  //animação para abrir o modal
  var modal = document.querySelector('.modal')
  modal.style.display = 'block'
}
function fechar() {
  //animação para fechar o modal
  var modal = document.querySelector('.modal')
  modal.style.display = 'none'
}

function newRoleName() {
  let newRole = document.getElementById('new-employee-role').value
  console.log(newRole)
  document.getElementById(newRole).hidden = false
}

//toast de feedback "projeto criado com sucesso"
const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    setTimeout(function showToast() {
      const toast = new bootstrap.Toast(toastLiveExample)
      toast.show()
    }, 300)
  })
}

// Dados da tabela de projetos
let projectTools = `
		<!-- button trigger modal view project -->
			<div class="project-tools">
			<!-- button trigger view employee -->
			<div
				class="material-symbols-outlined project-view-button"
				data-bs-toggle="modal"
				data-bs-target="#view-employee-modal"
			>
				visibility
			</div>

     
      <div
				class="material-symbols-outlined project-view-button"
				data-bs-toggle="modal"
				data-bs-target="#view-employee-modal"
			>
      <span class="material-symbols-outlined">
      edit
      </span>
			</div>

      <div
      class="material-symbols-outlined project-view-button"
      data-bs-toggle="modal"
      data-bs-target="#view-employee-modal"
    >
      delete
    </div>

      
		</div>
`
let projectsData = [
  {
    name: 'Projeto 1',
    employeesQty: '3 pessoas',
    startDate: '12/05/2022',
    endDate: '07/07/2022',
    totalHours: '200 Horas',
    projectTools: projectTools
  },
  {
    name: 'Projeto 2',
    employeesQty: '4 pessoas',
    startDate: '03/06/2022',
    endDate: '20/09/2022',
    totalHours: '340 Horas',
    projectTools: projectTools
  },
  {
    name: 'Projeto 3',
    employeesQty: '5 pessoas',
    startDate: '19/06/2022',
    endDate: '04/11/2022',
    totalHours: '400 Horas',
    projectTools: projectTools
  },
  {
    name: 'Projeto 4',
    employeesQty: '12 pessoas',
    startDate: '14/08/2022',
    endDate: '01/02/2023',
    totalHours: '280 Horas',
    projectTools: projectTools
  },
  {
    name: 'Projeto 5',
    employeesQty: '20 pessoas',
    startDate: '29/09/2022',
    endDate: '20/01/2023',
    totalHours: '320 Horas',
    projectTools: projectTools
  }
]

let projectsTable = $("#projects-table")
$(projectsTable).bootstrapTable({
	data: getProjectsList()
})
$("#projects-table tr:not(:first)").addClass("table-body-row")

function getProjectsList() {
	let url = "/allprojects"

	let xhttp = new XMLHttpRequest()
	xhttp.open("get", url, false)
	xhttp.send()

	let data = JSON.parse(xhttp.responseText)
	console.log(data)
	return data
}


let projectRows = $(".table-body-row")
let projectReversedRows = []
let searchInput = $("#search")


projectRows.each(function(index, row) {
	projectReversedRows.push(row)
})
projectReversedRows = projectReversedRows.reverse()

$(projectsTable).on("sort.bs.table", function() {
	setTimeout(function() {
		$(`${employeeTable} tr:not(:first)`).addClass("table-body-row")
	}, 0)
})

$(searchInput).keyup(function(){
	let delay = 100
	let value = searchInput[0].value
	projectReversedRows.forEach(function(row) {
		let projectName = row.firstChild.innerText.toUpperCase()
		value = value.toUpperCase()

		if(projectName.includes(value)) {
			setTimeout(function(){
				$(row).css({
					display: "table",
					border: "solid"
				})
			}, delay)

			$(row).css({
				visibility: "visible",
				opacity: 1,
				border: "none"
			})	
		}
		else {
			setTimeout(function() {
				$(row).css("display", "none")
			}, delay)
			
			$(row).css({
				visibility: "hidden",
				opacity: 0,
				transition: "visibility 0.5s linear	, opacity 0.5s linear",
			})
		}
	})
})