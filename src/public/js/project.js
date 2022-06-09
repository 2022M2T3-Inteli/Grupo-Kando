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
					data-bs-target="#view-employee-modal"
					id="${row.id}"
					onclick="viewProject(this.id)"
				>
					visibility
				</div>

				<div
					class="material-symbols-outlined project-view-button"
					data-bs-toggle="modal"
					data-bs-target="#view-employee-modal"
					id="${row.id}"
					onclick="editProject(this.id)"
				>
					<span class="material-symbols-outlined">
						edit
					</span>
				</div>

				<div
					class="material-symbols-outlined project-view-button"
					data-bs-toggle="modal"
					data-bs-target="#remove-project-modal"
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


let projectId = 0
function modalDelete(id) {
 projectId = id


}



function deleteProject() {
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