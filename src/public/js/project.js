if (localStorage.getItem('message')) {
  if (localStorage.getItem('message') == 'created project') {
    toastShow('add')
    localStorage.removeItem('message')
  } else if (localStorage.getItem('message') == 'edited project') {
    toastShow('edit')
    localStorage.removeItem('message')
  } else if (localStorage.getItem('message') == 'deleted project') {
    toastShow('delete')
    localStorage.removeItem('message')
  }
}

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
  let newRole = document.getElementById('employee-roles').value
  registerDate()
  document.getElementById(newRole).hidden = false
}

//toast de feedback "projeto criado com sucesso"
// const toastTrigger = document.getElementById('liveToastBtn')
// const toastLiveExample = document.getElementById('liveToast')
// if (toastTrigger) {
// 	toastTrigger.addEventListener('click', () => {
// 		setTimeout(function showToast() {
// 			const toast = new bootstrap.Toast(toastLiveExample)
// 			toast.show()
// 		}, 300)
// 	})
// }

//toast de feedback "projeto criado com sucesso"
function toastShow(type) {
  setTimeout(function showToast() {
    let toastElement
    if (type == 'add') {
      toastElement = $('#addToast')[0]
    } else if (type == 'edit') {
      toastElement = $('#editToast')[0]
    }
    // else {
    // 	toastElement = $('#deleteToast')[0]
    // }
    const toast = new bootstrap.Toast(toastElement)
    toast.show()
  }, 300)
}

function toastTriggerAdd() {
  localStorage.setItem('message', 'created project')
}
function toastTriggerEdit() {
  localStorage.setItem('message', 'edited project')
}

let projectsTable = $('#projects-table')
let projectsData = []
function getProjectsList() {
  let url = 'projects/all'

  let xhttp = new XMLHttpRequest()

  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)

  projectsData = []
  data.forEach((row, index) => {
    projectsData.push(row)
    projectsData[index].tools = `
			<!-- button trigger modal view project -->
			<div class="project-tools">
				<!-- button trigger view employee -->
				<div
					class="material-symbols-outlined project-view-button"
					data-bs-toggle="modal"
					data-bs-target="#view-project-modal"
					id="${row.id}"
					onclick="viewProject(this.id)"
				>
					visibility
				</div>

				<div
					class="material-symbols-outlined project-edit-button"
					data-bs-toggle="modal"
					data-bs-target="#edit-project-modal"
					id="${row.id}"
					onclick="setEditProjectId(this.id)"
				>
					<span class="material-symbols-outlined">
						edit
					</span>
				</div>

				<div
					class="material-symbols-outlined project-view-button"
					data-bs-toggle="modal"
					data-bs-target="#remove-employee-modal"
					id="${row.id}"
					onclick="modalDelete(this.id)"
					
				>
					delete
				</div>
			</div>
		`
  })

  $(projectsTable).bootstrapTable('destroy')
  setInterval(function () {
    $(projectsTable).bootstrapTable({
      data: projectsData
    })
    $('#projects-table tr:not(:first)').addClass('table-body-row')
  }, 0)
}
getProjectsList()

function getRoles() {
  let url = 'roles/all'

  let xhtpp = new XMLHttpRequest()
  xhtpp.open('get', url, false)
  xhtpp.send()

  let data = JSON.parse(xhtpp.responseText)

  let selectRoles = $('#employee-roles')[0]
  let rolesList = $('#roles-list')[0]
  console.log(data)
  data.forEach(role => {
    selectRoles.innerHTML += `<option value="${role.name}">${role.name}</option>`

    rolesList.innerHTML += `
			<div id="${role.name}" class="accordion-item" hidden>
				<h2 class="accordion-header" id="role-${role.id}-title">
				<button class="accordion-button" type="button" data-bs-toggle="collapse"
					data-bs-target="#collapse${role.id}" aria-expanded="true" aria-controls="collapse${role.id}">
					${role.name}
				</button>
				</h2>
				<div id="collapse${role.id}" class="accordion-collapse collapse show" aria-labelledby="heading${role.id}"
				data-bs-parent="#roles-list">
          <div class="accordion-body">
            <div class="role-allocation row"></div>
          </>
				</div>
			</div>
		`
  })
}

let roleAllocationArea
let monthName
let monthNameBr
var startMonth
var startYear
var endYear
var endMonth

function registerDate() {
  if (roleAllocationArea) {
    roleAllocationArea.each((index, role) => {
      role.innerHTML = ''
    })
  }

  var startDate = document.getElementById('start_date').value.split('-')
  var endDate = document.getElementById('end_date').value.split('-')
  startYear = Number(startDate[0])
  endYear = Number(endDate[0])
  startMonth = Number(startDate[1])
  endMonth = Number(endDate[1])

  if (startYear == endYear) {
    for (i = startMonth; i <= endMonth; i++) {
      defineMonthName(i)
    }
  } else {
    for (y = startYear; y <= endYear; y++) {
      roleAllocationArea = $('.role-allocation')

      roleAllocationArea.each((index, role) => {
        role.innerHTML += `<div class=row>${y}</div>`
      })

      if (y == startYear) {
        for (i = startMonth; i <= 12; i++) {
          defineMonthName(i)
        }
      } else if (y == endYear) {
        for (i = 1; i <= endMonth; i++) {
          defineMonthName(i)
        }
      } else {
        for (i = 1; i <= 12; i++) {
          defineMonthName(i)
        }
      }
    }
  }

  if (roleAllocationArea) {
    roleAllocationArea.each((index, role) => {
      role.innerHTML +=
        '<div class="row"><button type="button" class="btn-primary" data-bs-toggle="modal" data-bs-target="#allocation-modal">Alocar funcionários</button></div>'
    })
  }
}

function defineMonthName(month) {
  switch (month) {
    case 1:
      monthName = 'january'
      monthNameBr = 'Janeiro'
      break
    case 2:
      monthName = 'february'
      monthNameBr = 'Fevereiro'
      break
    case 3:
      monthName = 'march'
      monthNameBr = 'Março'
      break
    case 4:
      monthName = 'april'
      monthNameBr = 'Abril'
      break
    case 5:
      monthName = 'may'
      monthNameBr = 'Maio'
      break
    case 6:
      monthName = 'june'
      monthNameBr = 'Junho'
      break
    case 7:
      monthName = 'july'
      monthNameBr = 'Julho'
      break
    case 8:
      monthName = 'august'
      monthNameBr = 'Agosto'
      break
    case 9:
      monthName = 'september'
      monthNameBr = 'Setembro'
      break
    case 10:
      monthName = 'october'
      monthNameBr = 'Outubro'
      break
    case 11:
      monthName = 'november'
      monthNameBr = 'Novembro'
      break
    case 12:
      monthName = 'december'
      monthNameBr = 'Dezembro'
      break
  }

  roleAllocationArea = $('.role-allocation')

  roleAllocationArea.each((index, role) => {
    role.innerHTML += `
      <div class="col-3"> 
        <label for="role-hours-${monthName}-${startYear}">${monthNameBr}: 
        </label>
        <input type="number" name="role-hours-${monthName}-${startYear}" id="role-hours-${monthName}-${startYear}">
      </div>
    `
  })
}

var employeeAllocationArea

function employeeAllocation() {
  if (startYear == endYear) {
    for (i = startMonth; i <= endMonth; i++) {
      defineMonthName(i)
    }
  } else {
    for (y = startYear; y <= endYear; y++) {
      employeeAllocationArea.each((index, employee) => {
        employee.innerHTML += `<div class=row>${y}</div>`
      })

      if (y == startYear) {
        for (i = startMonth; i <= 12; i++) {
          defineMonthName(i)
        }
      } else if (y == endYear) {
        for (i = 1; i <= endMonth; i++) {
          defineMonthName(i)
        }
      } else {
        for (i = 1; i <= 12; i++) {
          defineMonthName(i)
        }
      }
    }
  }
}

function employeeMonthAllocation() {
  employeeAllocationArea = $('.employee-allocation')

  employeeAllocationArea.each((index, employee) => {
    employee.innerHTML += `
      <div class="col-3"> 
        <label for="employee-hours-${monthName}-${startYear}">${monthNameBr}: 
        </label>
        <input type="number" name="employee-hours-${monthName}-${startYear}" id="employee-hours-${monthName}-${startYear}">
      </div>
    `
  })
}

getRoles()

function setEditProjectId(id) {
  let projectData = getProject(id)
  console.log(projectData)

  $('#project_id')[0].value = projectData.id
  $('#project-name')[0].value = projectData.name
  $('#project-location')[0].value = projectData.location
  $('#project-start-date')[0].value = projectData.start_date
  $('#project-end-date')[0].value = projectData.end_date
  $('#project-description')[0].value = projectData.description
  $('#department-id')[0].value = projectData.department_id
  console.log($('#employee_id')[0].value)
}

function getProject(id) {
  let url = '/projects/' + id

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)
  console.log(data)
  return data
}

let projectId = 0
function modalDelete(id) {
  projectId = id
}

function deleteProject() {
  // localStorage.setItem('message', 'deleted project')
  setTimeout(function showToast() {
    const toast = new bootstrap.Toast(document.getElementById('deleteToast'))
    toast.show()
  }, 300)

  let url = 'projects/' + projectId

  let xhttp = new XMLHttpRequest()

  xhttp.addEventListener('load', getProjectsList)

  xhttp.open('delete', url, false)
  xhttp.send()
}

let searchInput = $('#search')

$(projectsTable).on('sort.bs.table', function () {
  setTimeout(function () {
    $(`${employeeTable} tr:not(:first)`).addClass('table-body-row')
  }, 0)
})

$(searchInput).keyup(function () {
  let delay = 100
  let value = searchInput[0].value

  let projectRows = $('.table-body-row')
  let projectReversedRows = []

  projectRows.each(function (index, row) {
    projectReversedRows.push(row)
  })
  projectReversedRows = projectReversedRows.reverse()

  projectReversedRows.forEach(function (row) {
    let projectName = row.firstChild.innerText.toUpperCase()
    value = value.toUpperCase()

    if (projectName.includes(value)) {
      setTimeout(function () {
        $(row).css({
          display: 'table',
          border: 'solid'
        })
      }, delay)

      $(row).css({
        visibility: 'visible',
        opacity: 1,
        border: 'none'
      })
    } else {
      setTimeout(function () {
        $(row).css('display', 'none')
      }, delay)

      $(row).css({
        visibility: 'hidden',
        opacity: 0,
        transition: 'visibility 0.5s linear	, opacity 0.5s linear'
      })
    }
  })
})

function Teste() {
  console.log('aeeeeeeeeeeeee')
}

// export function toastTrigger()

function viewProject(id) {
  let projectData = getProject(id)

  $('#project-info-section')[0].innerHTML = `
		<table class="table">
			<tbody>
				<tr>
					<th scope="row">Nome:</th>
					<td>${projectData.name}</td>
				</tr>
				<tr>
					<th scope="row">Região:</th>
					<td>${projectData.location}</td>
				</tr>
				<tr>
					<th scope="row">Início:</th>
					<td>${projectData.start_date}</td>
				</tr>
				<tr>
					<th scope="row">Fim:</th>
					<td>${projectData.end_date}</td>
				</tr>
			</tbody>
		</table>
	`
}
