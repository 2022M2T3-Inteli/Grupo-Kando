if(localStorage.getItem('message')) {
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
		if(type == "add") {
			toastElement = $('#addToast')[0]
		}
		else if(type == "edit") {
			toastElement = $('#editToast')[0]
		}
		// else {
		// 	toastElement = $('#deleteToast')[0]
		// }
		const toast = new bootstrap.Toast(toastElement)
		toast.show()	
	}, 300)	
}

function toastTriggerAdd () {
	localStorage.setItem('message', 'created employee')
}
function toastTriggerEdit () {
	localStorage.setItem('message', 'edited employee')
}

// Dados da tabela de funcionários
let employeeTools = `
!-- button trigger modal view employee -->
      <div class="employee-tools">
      <!-- button trigger view employee -->
      <div
        class="material-symbols-outlined employee-view-button"
        data-bs-toggle="modal"
        data-bs-target="#view-employee-modal"
      >
        visibility
      </div>
      <! -- button trigger edit modal -->
      <div
      class="material-symbols-outlined employee-view-button"
      data-bs-toggle="modal"
      data-bs-target="#edit-employee-modal"
      >
      edit
        </div>
        <! -- button modal remove -->
      <div
      class="material-symbols-outlined employee-view-button"
      data-bs-toggle="modal"
      data-bs-target="#remove-employee-modal"
    >
      delete
    </div>
      </div>

`

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
// let tableData = []
function getEmployeeList() {
  let url = 'employees/all'

  let xhttp = new XMLHttpRequest()

  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)

  tableData = []
  data.forEach((row, index) => {
    tableData.push(row)
    tableData[index].tools = `
			<div class="employee-tools">
				<!-- button trigger view employee -->
				<div class="material-symbols-outlined employee-view-button" 
					data-bs-toggle="modal"
					data-bs-target="#view-employee-modal"
					id="${row.id}"
					onclick="showEmployee(this.id)">
						visibility
				</div>

        <div
					class="material-symbols-outlined project-view-button"
					data-bs-toggle="modal"
					data-bs-target="#view-employee-modal"
					id="${row.id}"
					onclick="setEditEmployeeId(this.id)"
				>
					<span class="material-symbols-outlined">
						edit
					</span>
				</div>

				<div
					class="material-symbols-outlined employee-view-button"
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

  $(employeeTable).bootstrapTable("destroy")
  setInterval(function() {
    $(employeeTable).bootstrapTable({
      data: tableData
    })
    $("#employees-table tr:not(:first)").addClass("table-body-row")
  }, 0)

}

getEmployeeList()


function setEditEmployeeId(id) {
  employeeId = id
  let employeeData = showEmployee(id)  

  $("#employee_id")[0].value = employeeId
  $("#employee_name")[0].value = employeeData.name
  $("#employee_function")[0].value = employeeData.role_name
  $("#employee-location")[0].value = employeeData.location
  $("#employee_workload")[0].value = employeeData.projects_workload
  $("#employee-type")[0].value = employeeData.type
  // $("#employee-tags")[0].value = employeeData.tags
  console.log($("#employee_id")[0].value)
}

function reload() {
  let cont = alert("oi")
    setTimeout(cont, 2000000)
    // window.location.reload()
}


// function editEmployee() {
//   let api = 'http://127.0.0.1:8080'


// 	// let url = "/employees/edit"

// 	// let xhttp = new XMLHttpRequest()
	
// 	// xhttp.addEventListener("load", getEmployeeList)

// 	// xhttp.open("post", url, false)
// 	// xhttp.send()

//   $.ajax({
//     type: 'POST',
//     url: api + '/employees/edit',
//     data: {
//       name: req.body.nameEdit,
//       tags: req.body.tagsEdit,
//       location: req.body.locationEdit,
//       role_name: req.body.role_nameEdit,
//       projects_workload: req.body.projects_workloadEdit,
//       available_projects_workload: req.body.available_projects_workloadEdit,
//       type: req.body.typeEdit,
//       id: req.body.id
// //     },
// }).done(function () {
//     users.list();
// }).fail(function (msg) {
//     //console.log('FAIL');
// }).always(function (msg) {
//     //console.log('ALWAYS');
// });
// }


function showEmployee(id) {
  let url = '/employees/' + id

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)
  console.log(data)
  return data
}


let employeeId = 0
function modalDelete(id) {
 employeeId = id

}

function deleteEmployee() {
  setTimeout(function showToast() {
		const toast = new bootstrap.Toast(document.getElementById('deleteToast'))
		toast.show()
	}, 300)

	let url = "employees/"+employeeId

	let xhttp = new XMLHttpRequest()
	
	xhttp.addEventListener("load", getEmployeeList)

	xhttp.open("delete", url, false)
	xhttp.send()

}

$(employeeTable).bootstrapTable({
  data: tableData
})

$(`${employeeTable} tr:not(:first)`).addClass('table-body-row')

$(employeeTable).on('sort.bs.table', function () {
  setTimeout(function () {
    $(`${employeeTable} tr:not(:first)`).addClass('table-body-row')
  }, 0)
})

let employeeRows = $('.table-body-row')
let employeeReversedRows = []
let searchInput = $('#search')

employeeRows.each(function (index, row) {
  employeeReversedRows.push(row)
})
employeeReversedRows = employeeReversedRows.reverse()

$(searchInput).keyup(function () {
  let delay = 100
  let value = searchInput[0].value

  employeeReversedRows.forEach(function (row) {
    let employeeName = row.firstChild.innerText.toUpperCase()
    value = value.toUpperCase()

    if (employeeName.includes(value)) {
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
})

employeeRows.each(function (index) {
  if (employeesData[index].allocation > 176) {
    $(`${employeeTable} tr:eq(${index + 1}) td:eq(2)`).css({
      color: '#020202',
      'font-weight': 800
    })
  } else if (
    employeesData[index].allocation > employeesData[index].totalHours
  ) {
    $(`${employeeTable} tr:eq(${index + 1}) td:eq(2)`).css({
      color: '#D30000',
      'font-weight': 600
    })
  } else {
    $(`${employeeTable} tr:eq(${index + 1}) td:eq(2)`).css({
      color: 'green',
      'font-weight': 600
    })
  }
})
