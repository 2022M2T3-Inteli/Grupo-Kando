if(localStorage.getItem('message')) {
	if (localStorage.getItem('message') == 'created project') {
		toastShow("add")
		localStorage.removeItem('message')
	}
	else if (localStorage.getItem('message') == 'edited project') {
		toastShow("edit")
		localStorage.removeItem('message')
	}
	else if (localStorage.getItem('message') == 'deleted project') {
		toastShow("delete")
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
	let newRole = document.getElementById('new-employee-role').value
	console.log(newRole)
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
	localStorage.setItem('message', 'created project')
}
function toastTriggerEdit () {
	localStorage.setItem('message', 'edited project')
}

let projectsTable = $("#projects-table")
let projectsData = []
function getProjectsList() {
	let url = "projects/all"

	let xhttp = new XMLHttpRequest()
	
	xhttp.open("get", url, false)
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
					class="material-symbols-outlined project-view-button"
					data-bs-toggle="modal"
					data-bs-target="#view-project-modal"
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

	$(projectsTable).bootstrapTable("destroy")
	setInterval(function() {
		$(projectsTable).bootstrapTable({
			data: projectsData
		})
		$("#projects-table tr:not(:first)").addClass("table-body-row")
	}, 0)

}
getProjectsList()

function setEditProjectId(id) {
	projectId = id
	let projectData = showProject(id) 
	console.log(projectData) 
  
	$("#project_id")[0].value = projectId
	$("#project-name")[0].value = projectData.name
	$("#project-location")[0].value = projectData.location
	$("#project-start-date")[0].value = projectData.start_date
	$("#project-end-date")[0].value = projectData.end_date
	$("#project-description")[0].value = projectData.description
	$("#department-id")[0].value = projectData.department_id
	console.log($("#employee_id")[0].value)
}

function showProject(id) {
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

	let url = "projects/"+projectId

	let xhttp = new XMLHttpRequest()
	
	xhttp.addEventListener("load", getProjectsList)

	xhttp.open("delete", url, false)
	xhttp.send()

}

let projectRows = $(".table-body-row")
let projectReversedRows = []
let searchInput = $("#search")


projectRows.each(function (index, row) {
	projectReversedRows.push(row)
})
projectReversedRows = projectReversedRows.reverse()

$(projectsTable).on("sort.bs.table", function () {
	setTimeout(function () {
		$(`${employeeTable} tr:not(:first)`).addClass("table-body-row")
	}, 0)
})

$(searchInput).keyup(function () {
	let delay = 100
	let value = searchInput[0].value
	projectReversedRows.forEach(function (row) {
		let projectName = row.firstChild.innerText.toUpperCase()
		value = value.toUpperCase()

		if (projectName.includes(value)) {
			setTimeout(function () {
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
			setTimeout(function () {
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

function Teste() {
	console.log('aeeeeeeeeeeeee')
}


// export function toastTrigger()