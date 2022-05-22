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

// Dados da tabela de projetos
let projectTools = `
	<td>
		<!-- button trigger modal view project -->
			<div class="project-view">
			<!-- button trigger view employee -->
			<div
				class="material-symbols-outlined project-view-button"
				data-bs-toggle="modal"
				data-bs-target="#view-employee-modal"
			>
				visibility
			</div>
		</div>
	</td>
`
let projectsData = [
  {
    name: 'Projeto 1',
    qntEmployees: '3 pessoas',
    startDate: '12/05/2022',
    endDate: '07/07/2022',
    totalHours: '200 Horas',
    projectTools: projectTools
  },
  {
    name: 'Projeto 2',
    qntEmployees: '4 pessoas',
    startDate: '03/06/2022',
    endDate: '20/09/2022',
    totalHours: '340 Horas',
    projectTools: projectTools
  },
  {
    name: 'Projeto 3',
    qntEmployees: '5 pessoas',
    startDate: '19/06/2022',
    endDate: '04/11/2022',
    totalHours: '400 Horas',
    projectTools: projectTools
  },
  {
    name: 'Projeto 4',
    qntEmployees: '12 pessoas',
    startDate: '14/08/2022',
    endDate: '01/02/2023',
    totalHours: '280 Horas',
    projectTools: projectTools
  },
  {
    name: 'Projeto 5',
    qntEmployees: '20 pessoas',
    startDate: '29/09/2022',
    endDate: '20/01/2023',
    totalHours: '320 Horas',
    projectTools: projectTools
  }
]

$('#projects-table').bootstrapTable({
  data: projectsData
})
