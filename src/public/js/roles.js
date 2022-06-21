if(localStorage.getItem('message')) {
	if (localStorage.getItem('message') == 'created role') {
		toastShow("add")
		localStorage.removeItem('message')
	}
	else if (localStorage.getItem('message') == 'edited role') {
		toastShow("edit")
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

//toast de feedback "função criada com sucesso"
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
	localStorage.setItem('message', 'created role')
}
function toastTriggerEdit () {
	localStorage.setItem('message', 'edited role')
}

let rolesTable = $("#roles-table")
let rolesData = []
function getRolesList() {
	let url = "roles/all"

	let xhttp = new XMLHttpRequest()
	
	xhttp.open("get", url, false)
	xhttp.send()


	let data = JSON.parse(xhttp.responseText)

	rolesData = []
	data.forEach((row, index) => {
		rolesData.push(row)
		rolesData[index].tools = `
			<!-- button trigger modal view role -->
			<div class="role-tools">

				<div
					class="material-symbols-outlined role-edit-button"
					data-bs-toggle="modal"
					data-bs-target="#edit-role-modal"
					id="${row.id}"
					onclick="setEditRoleId(this.id)"
				>
					<span class="material-symbols-outlined">
						edit
					</span>
				</div>

				<div
					class="material-symbols-outlined role-view-button"
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

	$(rolesTable).bootstrapTable("destroy")
	setInterval(function() {
		$(rolesTable).bootstrapTable({
			data: rolesData
		})
		$("#roles-table tr:not(:first)").addClass("table-body-row")
	}, 0)

}
getRolesList()

function setEditRoleId(id) {

	let roleData = getRole(id) 
  
	$("#role_id")[0].value = roleData.id
	$("#role-name")[0].value = roleData.name
}

function getRole(id) {
	let url = '/roles/' + id
  
	let xhttp = new XMLHttpRequest()
	xhttp.open('get', url, false)
	xhttp.send()
  
	let data = JSON.parse(xhttp.responseText)
	console.log(data)
	return data
}

let roleId = 0
function modalDelete(id) {
 roleId = id

}

function deleteRole() {
	// localStorage.setItem('message', 'deleted role')
	setTimeout(function showToast() {
		const toast = new bootstrap.Toast(document.getElementById('deleteToast'))
		toast.show()
	}, 300)

	let url = "roles/"+roleId

	let xhttp = new XMLHttpRequest()
	
	
	xhttp.addEventListener("load", getRolesList)

	xhttp.open("delete", url, false)
	xhttp.send()

}

let searchInput = $("#search")

$(rolesTable).on("sort.bs.table", function () {
	setTimeout(function () {
		$(`${employeeTable} tr:not(:first)`).addClass("table-body-row")
	}, 0)
})

$(searchInput).keyup(function () {
	let delay = 100
	let value = searchInput[0].value

	let roleRows = $(".table-body-row")
	let roleReversedRows = []

	roleRows.each(function (index, row) {
		roleReversedRows.push(row)
	})
	roleReversedRows = roleReversedRows.reverse()

	roleReversedRows.forEach(function (row) {
		let roleName = row.firstChild.innerText.toUpperCase()
		value = value.toUpperCase()

		if (roleName.includes(value)) {
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

// export function toastTrigger()

function viewRole(id){
	let roleData = getRole(id);
	

	$("#role-info-section")[0].innerHTML =
 	`
		<table class="table">
			<tbody>
				<tr>
					<th scope="row">Nome:</th>
					<td>${roleData.name}</td>
				</tr>
			</tbody>
		</table>
	`
}