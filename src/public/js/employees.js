if (localStorage.getItem('message')) {
  if (localStorage.getItem('message') == 'created employee') {
    toastShow("add")
    localStorage.removeItem('message')
  }
  else if (localStorage.getItem('message') == 'edited employee') {
    toastShow("edit")
    localStorage.removeItem('message')
  }
  // else if (localStorage.getItem('message') == 'deleted project') {
  // 	toastShow("delete")
  // 	localStorage.removeItem('message')
  // }
}

var tagList = document.body.querySelector('.employee-tag-list')
var tagName

// função que faz a caixa de input da tag aparecer, se o usuário clicar no "+"
function newTagName() {
  tagList.innerHTML +=
    '<div id="new-tag-name"><input type="text" name="new-tag-name" id="new-tag-name" class="tag" onchange="changeInputTagValue(this.value)"><button type="button" class="tag-button" onclick="addTagElement()">ok</button></div>'
}

// função que coleta o texto inserido na caixa de input da tag
function changeInputTagValue(value) {
  tagName = value
}

// função que remove a caixa de input da tag e adiciona ela a página do funcionário, quando o usuário clicar em "ok"
function addTagElement() {
  document.getElementById('new-tag-name').remove()
  tagList.innerHTML += `<div id="${tagName}" class="tag" name="tags">${tagName}</div><button type="button" class="tag-button" name="${tagName}" onclick="removeTagElement(this)">x</button>`
}

// função que remove a tag, caso o usuário clique no "x"
function removeTagElement(el) {
  document.getElementById(el.name).remove()
  el.remove()
}
//toast de feedback "funcionario criado/editado com sucesso"
function toastShow(type) {
  setTimeout(function showToast() {
    let toastElement
    if (type == "add") {
      toastElement = $('#addToast')[0]
    }
    else if (type == "edit") {
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
  localStorage.setItem('message', 'created employee')
}
function toastTriggerEdit() {
  localStorage.setItem('message', 'edited employee')
}

let employeeMaxHours = 176
let employeesData = [
  {
    allocation: 95,
    totalHours: 160
  },
  {
    allocation: 177,
    totalHours: 170
  },
  {
    allocation: 160,
    totalHours: 176
  },
  {
    allocation: 135,
    totalHours: 120
  },
  {
    allocation: 245,
    totalHours: 176
  }
]

let employeeTable = $("#employees-table")
let tableData = []
function getEmployeeList() {
  let url = 'employees/all'

  let xhttp = new XMLHttpRequest()

  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)

  tableData = []
  data.forEach((row, index) => {
    tableData.push(row)
    tableData.available_projects_workload = getEmployeeWorkload(row.id)
    // console.log(tableData.available_projects_workload)
    tableData[index].tools = `
			<div class="employee-tools">
				<!-- button trigger view employee -->
				<div class="material-symbols-outlined employee-view-button" 
					data-bs-toggle="modal"
					data-bs-target="#view-employee-modal"
					onclick="viewEmployee(${index})">
						visibility
				</div>

        <div
					class="material-symbols-outlined project-view-button"
					data-bs-toggle="modal"
					data-bs-target="#edit-employee-modal"
					onclick="setEditEmployeeId(${index})"
				>
					<span class="material-symbols-outlined">
						edit
					</span>
				</div>

				<div
					class="material-symbols-outlined employee-view-button"
					data-bs-toggle="modal"
					data-bs-target="#remove-employee-modal"
					onclick="openModalDelete(${row.id})"
					
				>
					delete
				</div>
			</div>
		`

    // if (tableData[index].allocation > 176) {
    //   $(`${employeeTable} tr:eq(${index + 1}) td:eq(2)`).css({
    //     color: '#020202',
    //     'font-weight': 800
    //   })
    // } else if (
    //   tableData[index].allocation > tableData[index].totalHours
    // ) {
    //   $(`${employeeTable} tr:eq(${index + 1}) td:eq(2)`).css({
    //     color: '#D30000',
    //     'font-weight': 600
    //   })
    // } else {
    //   $(`${employeeTable} tr:eq(${index + 1}) td:eq(2)`).css({
    //     color: 'green',
    //     'font-weight': 600
    //   })
    // }
  })

  $(employeeTable).bootstrapTable("destroy")
  setInterval(function () {
    $(employeeTable).bootstrapTable({
      data: tableData
    })
    $("#employees-table tr:not(:first)").addClass("table-body-row")
  }, 0)

}
getEmployeeList()

function getRoles() {
  let url = "roles/all"

  let xhtpp = new XMLHttpRequest()
  xhtpp.open("get", url, false)
  xhtpp.send()

  let data = JSON.parse(xhtpp.responseText)

  let selectRoles = $("#employee-roles")[0]
  let selectRole = $("#employee-role")[0]
  let rolesFilter = $("#roles-filter")[0]

  data.forEach(role => {
    selectRoles.innerHTML += `<option value="${role.name}">${role.name}</option>`
    selectRole.innerHTML += `<option value="${role.name}">${role.name}</option>`
    rolesFilter.innerHTML += `<option value="${role.name}">${role.name}</option>`
  })
}
getRoles()

function getEmployeeWorkload(id) {
  let url = '/employees/employeeworkload/' + id

  let xhtpp = new XMLHttpRequest()
  xhtpp.open("get", url, false)
  xhtpp.send()

  let employeeWorkload = {}
  let data = JSON.parse(xhtpp.responseText)

  data.forEach(assignment => {
    // if(!employeeWorkload[assignment.year]) {
    //   employeeWorkload[assignment.year] = []
    //   employeeWorkload[assignment.year].push(
    //     {
    //       [assignment.month]: assignment.hours_assigned,
    //     } 
    //   )
    // }
    // else {
    //   employeeWorkload[assignment.year].push(
    //     {
    //       [assignment.month]: assignment.hours_assigned,
    //     } 
    //   ) 
    // }

    if (!employeeWorkload[assignment.year]) {
      employeeWorkload[assignment.year] =
      {
        [assignment.month]: assignment.hours_assigned,
      }
    }
    else {
      employeeWorkload[assignment.year] = Object.assign(
        employeeWorkload[assignment.year], {
        [assignment.month]: assignment.hours_assigned
      }
      )
    }
  })
  console.log(employeeWorkload)
  return employeeWorkload
}

function viewEmployee(index) {
  let employeeData = tableData[index];

  $("#employee-info-section")[0].innerHTML =
    `
		<table class="table">
			<tbody>
				<tr>
					<th scope="row">Nome:</th>
					<td>${employeeData.name}</td>
				</tr>
				<tr>
					<th scope="row">Região:</th>
					<td>${employeeData.location}</td>
				</tr>
				<tr>
					<th scope="row">Função:</th>
					<td>${employeeData.role_name}</td>
				</tr>
				<tr>
					<th scope="row">Tempo Alocado/Mês:</th>
					<td>${employeeData.projects_workload - employeeData.available_projects_workload}/${employeeData.projects_workload}/176h</td>
				</tr>
        <tr>
					<th scope="row">Tipo:</th>
					<td>${employeeData.type}</td>
				</tr>
        <tr>
					<th scope="row">Tags:</th>
					<td>${employeeData.tags}</td>
				</tr>
			</tbody>
		</table>
	`
}

function setEditEmployeeId(index) {
  let employeeData = tableData[index]
  console.log(employeeData.name)
  console.log(employeeData.location)

  $("#employee-id")[0].value = employeeData.id
  $("#employee-name")[0].value = employeeData.name
  $("#employee-role")[0].value = employeeData.role_name
  $("#employee-location")[0].value = employeeData.location
  $("#employee-workload")[0].value = employeeData.projects_workload
  $("#employee-type")[0].value = employeeData.type
  // $("#employee-tags")[0].value = employeeData.tags

}

function openModalDelete(id) {
  $("#delete-modal")[0].innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
    <button type="button" class="btn btn-primary" class="btn btn-primary" data-bs-dismiss="modal" onclick="deleteEmployee(${id})">Remover</button>
  `
}

function deleteEmployee(id) {
  setTimeout(function showToast() {
    const toast = new bootstrap.Toast(document.getElementById('deleteToast'))
    toast.show()
  }, 300)

  let url = "employees/" + id

  let xhttp = new XMLHttpRequest()

  xhttp.addEventListener("load", getEmployeeList)

  xhttp.open("delete", url, false)
  xhttp.send()

}

$(employeeTable).bootstrapTable({
  data: tableData
})

// $(`${employeeTable} tr:not(:first)`).addClass('table-body-row')

$(employeeTable).on('sort.bs.table', function () {
  setTimeout(function () {
    $(`${employeeTable} tr:not(:first)`).addClass('table-body-row')
  }, 0)
})

let searchInput = $('#search')
$(searchInput).keyup(function () {
  filterEmployees()
})

function filterEmployees() {
  let delay = 100
  let name = searchInput[0].value.toUpperCase()
  let role = $("#roles-filter")[0].value.toUpperCase()

  let employeeRows = $('.table-body-row')
  let employeeReversedRows = []

  employeeRows.each(function (index, row) {
    employeeReversedRows.push(row)
  })
  employeeReversedRows = employeeReversedRows.reverse()

  employeeReversedRows.forEach(function (row) {
    let employeeName = row.firstChild.innerText.toUpperCase()
    let employeeRole = row.children[1].innerText.toUpperCase()

    if (employeeName.includes(name) && employeeRole.includes(role)) {
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

    delay += 0
  })
}