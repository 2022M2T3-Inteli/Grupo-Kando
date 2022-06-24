let rolesAssignment

if(localStorage.getItem("rolesAssignment")){
  rolesAssignment = localStorage.getItem("rolesAssignment")
  let projectId = getProjectId()
  
  deleteAssignments(projectId)
  projectCreated(rolesAssignment, projectId)
  localStorage.removeItem("rolesAssignment")
}
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

function getProjectId() {
  let url = 'projects/projectid'

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = xhttp.responseText
  return data
}

function deleteAssignments(id) {
  let url = `projects/deleteassignments/${id}`

  let xhttp = new XMLHttpRequest()
  xhttp.open('delete', url, false)
  xhttp.send()
}

function submitProject() {
  let formValid = document.forms["add-project-form"].checkValidity()
  
  if (formValid) {
    localStorage.setItem('message', 'created project')
    localStorage.setItem('rolesAssignment', rolesAssignment);
    
    $("#add-project-form")[0].submit()
  }
}

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

function projectCreated(data, projectId) {
  let url = `/projects/assignments`

  let xhttp = new XMLHttpRequest()
  xhttp.open('POST', url, false)
  // Definindo o tipo de dado que será passado na requisição
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify([data, projectId]))
  console.log(xhttp.responseText)
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
					onclick="viewProjectInfo(${row.id})"
				>
					visibility
				</div>

				<div
					class="material-symbols-outlined project-edit-button"
					data-bs-toggle="modal"
					data-bs-target="#edit-project-modal"
					onclick="setEditProjectId(${row.id})"
				>
					<span class="material-symbols-outlined">
						edit
					</span>
				</div>

				<div
					class="material-symbols-outlined project-view-button"
					data-bs-toggle="modal"
					data-bs-target="#remove-project-modal"
					onclick="openModalDelete(${row.id})"
				>
					delete
				</div>
			</div>
		`
  })

  $(projectsTable).bootstrapTable('destroy')
  setTimeout(function () {
    $(projectsTable).bootstrapTable({
      data: projectsData
    })
    $('#projects-table tr:not(:first)').addClass('table-body-row')
  }, 0)
}
getProjectsList()

function openModalDelete(id) {
  $('#delete-modal')[0].innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
    <button type="button" class="btn btn-primary" class="btn btn-primary" data-bs-dismiss="modal" onclick="deleteProject(${id})">Remover</button>
  `
}

function getRoles() {
  let url = 'roles/all'

  let xhtpp = new XMLHttpRequest()
  xhtpp.open('get', url, false)
  xhtpp.send()

  let data = JSON.parse(xhtpp.responseText)

  let selectRoles = $('#employee-roles')[0]
  // let rolesList = $('#roles-list')[0]
  console.log(data)
  data.forEach(role => {
    selectRoles.innerHTML += `<option value="${role.name}">${role.name}</option>`

    // rolesList.innerHTML += `
    // 	<div id="${role.name}" class="accordion-item" hidden>
    // 		<h2 class="accordion-header" id="role-${role.id}-title">
    // 		<button class="accordion-button" type="button" data-bs-toggle="collapse"
    // 			data-bs-target="#collapse${role.id}" aria-expanded="true" aria-controls="collapse${role.id}">
    // 			${role.name}
    // 		</button>
    // 		</h2>
    // 		<div id="collapse${role.id}" class="accordion-collapse collapse show" aria-labelledby="heading${role.id}"
    // 		data-bs-parent="#roles-list">
    //       <div class="accordion-body">
    //         <div class="role-allocation row"></div>
    //       </>
    // 		</div>
    // 	</div>
    // `
  })
}

// função que faz um get dos funcionários de uma determinada função
function getEmployees(index) {
  let roleSelected = rolesAdded[index]
  $('#allocation-modal-label')[0].innerText = `Alocar ${roleSelected}`
  let url = `/employees/filterbyrole/${roleSelected}` // link da rota para acesso dos dados carregados do banco

  let xhtpp = new XMLHttpRequest() // realização de uma requisição xmlhttp
  xhtpp.open('get', url, false) // seleciona as informações dos funcionários da função
  xhtpp.send() // retorna os dados na rota

  let data = JSON.parse(xhtpp.responseText) // transforma os dados em json

  let allocationRoles = $('#employees-employee')[0]
  allocationRoles.innerHTML = ''
  console.log(data)
  data.forEach(employee => {
    allocationRoles.innerHTML += `
      <option value="${employee.name}">${employee.name}</option>
    `
  })
}

function clearInputs() {
  let projectInputs = $('#add-project-modal input')
  let projectTextAreas = $('#add-project-modal textarea')
  let locationSelect = $('#location')[0]
  // let rolesList = $('#roles-list')[0]
  // rolesAdded = []

  projectInputs.each((index, input) => {
    input.value = ''
  })
  projectTextAreas.each((index, textArea) => {
    textArea.value = ''
  })
  locationSelect.value = 'AM'
  rolesList.innerHTML = ''
}

// function abrir() {
//   //animação para abrir o modal
//   var modal = document.querySelector('.modal')
//   modal.style.display = 'block'
// }
// function fechar() {
//   //animação para fechar o modal
//   var modal = document.querySelector('.modal')
//   modal.style.display = 'none'
// }

let rolesAdded = []
function addRole() {
  rolesAssignment = []
  let rolesList = $('#roles-list')[0]
  let newRole = document.getElementById('employee-roles').value
  let roleIndex

  if (rolesAdded.indexOf(newRole) == -1) {
    rolesAdded.push(newRole)
    roleIndex = rolesAdded.indexOf(newRole)
    rolesList.innerHTML += `
        <div id="${roleIndex}-accordion" class="accordion-item">
          <h2 class="accordion-header" id="role-${roleIndex}-title">
          <button class="accordion-button" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapse${roleIndex}" aria-expanded="true" aria-controls="collapse${roleIndex}">
            ${newRole}
          </button>
          </h2>
          <div id="collapse${roleIndex}" class="accordion-collapse collapse show" aria-labelledby="heading${roleIndex}"
          data-bs-parent="#roles-list">
            <div class="accordion-body">
              <div class="role-allocation row"></div>
            </>
          </div>
        </div>
      `
  }
  updateDates(roleIndex)

  // if (rolesAdded.indexOf(newRole) == -1) {
  //   console.log("teste")
  //   rolesAdded.push(newRole)
  //   let roleIndex = rolesAdded.indexOf(newRole)
  //   rolesList.innerHTML += `
  //     <div id="${roleIndex}-accordion" class="accordion-item">
  //       <h2 class="accordion-header" id="role-${roleIndex}-title">
  //       <button class="accordion-button" type="button" data-bs-toggle="collapse"
  //         data-bs-target="#collapse${roleIndex}" aria-expanded="true" aria-controls="collapse${roleIndex}">
  //         ${newRole}
  //       </button>
  //       </h2>
  //       <div id="collapse${roleIndex}" class="accordion-collapse collapse show" aria-labelledby="heading${roleIndex}"
  //       data-bs-parent="#roles-list">
  //         <div class="accordion-body">
  //           <div class="role-allocation row"></div>
  //         </>
  //       </div>
  //     </div>
  //   `
  // }
  // updateDates()
}

let employeesAdded = []
function addEmployee() {
  employeesAssignment = []
  let employeesList = $('#employees-list')[0]
  let newEmployee = document.getElementById('employees-employee').value
  let employeeIndex

  if (employeesAdded.indexOf(newEmployee) == -1) {
    employeesAdded.push(newEmployee)
    employeeIndex = employeesAdded.indexOf(newEmployee)
    employeesList.innerHTML += `
        <div id="${employeeIndex}-accordion" class="accordion-item">
          <h2 class="accordion-header" id="role-${employeeIndex}-title">
          <button class="accordion-button" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapse${employeeIndex}" aria-expanded="true" aria-controls="collapse${employeeIndex}">
            ${newEmployee}
          </button>
          </h2>
          <div id="collapse${employeeIndex}" class="accordion-collapse collapse show" aria-labelledby="heading${employeeIndex}"
          data-bs-parent="#roles-list">
            <div class="accordion-body">
              <div class="role-allocation row"></div>
            </>
          </div>
        </div>
      `
  }
  registerDateEmployee(employeeIndex)
}

function updateDates(index) {
  let rolesList = $('#roles-list')

  if (rolesList.length > 0) {
    registerDate(index)
  }
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

let roleAllocationArea
let employeeAllocationArea
let monthName // variável auxiliar para definir o nome dos meses (inglês)
let monthNameBr // variável auxiliar para definir o nome dos meses (português)
var startMonth // variável que guarda o valor do mês de início do projeto
var startYear // variável que guarda valor do ano de início do projeto
var endYear // variável que guarda valor do ano de fim do projeto
var endMonth // variável que guarda o valor do mês de fim do projeto

function registerDate(roleIndex) {
  // caso exista uma área para alocar horas para as funções, o html dela será zerado
  roleAllocationArea = $('.role-allocation')
  if (roleAllocationArea) {
    roleAllocationArea.each((index, role) => {
      role.innerHTML = ''
    })
  }

  employeeAllocationArea = $('.employee-allocation')
  if (employeeAllocationArea) {
    employeeAllocationArea.each((index, employee) => {
      employee.innerHTML = ''
    })
  }

  var startDate = document.getElementById('start_date').value.split('-') // coleta o valor do input de data de início do projeto, separando dia, mês e ano em uma lista
  var endDate = document.getElementById('end_date').value.split('-') // coleta o valor do input de data de fim do projeto, separando dia, mês e ano em uma lista
  startYear = Number(startDate[0]) // armazena o valor do ano de início do projeto
  endYear = Number(endDate[0]) // armazena o valor do ano de fim do projeto
  startMonth = Number(startDate[1]) // armazena o valor do mês de início do projeto
  endMonth = Number(endDate[1]) // armazena o valor do mês de fim do projeto

  // caso o projeto esteja contido dentro o mesmo ano
  console.log(startYear)
  if (startYear == endYear) {
    if (startYear > 0 && endYear > 0) {
      roleAllocationArea = $('.role-allocation')
      // estrutura de repetição que cria os inputs para cada mês do projeto
      roleAllocationArea.each((index, role) => {
        // o ano correspondente aos meses de atribuição é mostrado acima deles
        role.innerHTML += `
          <div class="row">
            <div class="year-section">${startYear}</div>
          </div>
        `
      })
    }
    for (i = startMonth; i <= endMonth; i++) {
      let month = i
      defineMonthName(month) // cria uma label com o nome do mês
      roleAllocation(roleIndex, startYear, month) // cria um input com id personalizado para as horas atribuíd
    }
  }
  // caso o projeto tenha uma duração que não esteja contida no mesmo ano
  else {
    // estrutura de repetição que cria os inputs para cada mês do projeto
    for (y = startYear; y <= endYear; y++) {
      let year = y
      roleAllocationArea = $('.role-allocation')

      roleAllocationArea.each((index, role) => {
        // o ano correspondente aos meses de atribuição é mostrado acima deles
        role.innerHTML += `
          <div class="row">
            <div class="year-section">${y}</div>
          </div>
        `
      })

      employeeAllocationArea = $('.employee-allocation')

      employeeAllocationArea.each((index, employee) => {
        // o ano correspondente aos meses de atribuição é mostrado acima deles
        employee.innerHTML += `<div class=row>${y}</div>`
      })

      if (y == startYear) {
        for (i = startMonth; i <= 12; i++) {
          let month = i
          // caso esteja no primeiro ano do projeto, os espaços de atribuição de horas por mês serão criados a partir do primeiro mês do projeto
          defineMonthName(month) // cria uma label com o nome do mês
          roleAllocation(roleIndex, year, month) // cria um input com id personalizado para as horas atribuídas
        }
      } else if (y == endYear) {
        for (i = 1; i <= endMonth; i++) {
          let month = i
          // caso esteja no último ano do projeto, os espaços de atribuição de horas por mês serão criados até o último mês do projeto
          defineMonthName(month) // cria uma label com o nome do mês
          roleAllocation(roleIndex, year, month) // cria um input com id personalizado para as horas atribuídas
        }
      } else {
        for (i = 1; i <= 12; i++) {
          let month = i
          // caso esteja em um ano intermediário de projeto, os espaços de atribuição de horas por mês serão criados de janeiro a dezembro
          defineMonthName(month) // cria uma label com o nome do mês
          roleAllocation(roleIndex, year, month) // cria um input com id personalizado para as horas atribuídas
        }
      }
    }
  }

  if (roleAllocationArea && startYear > 0 && endYear > 0) {
    roleAllocationArea.each((index, role) => {
      role.innerHTML += `
        <div class="row">
          <div class="allocation-button-section">
            <button type="button" class="btn-primary" data-bs-toggle="modal" data-bs-target="#allocation-modal" onclick="getEmployees(${index})">Alocar funcionários</button>
          </div>
        </div>
      `
    })
  } else {
    roleAllocationArea.each((index, role) => {
      role.innerHTML += `
        <div class="row">
          <div class="allocation-button-section">
            Defina uma data inicial e final para fazer a alocação
          </div>
        </div>
      `
    })
  }
}

function registerDateEmployee(roleIndex) {
  // caso exista uma área para alocar horas para as funções, o html dela será zerado
  roleAllocationArea = $('.role-allocation')
  if (roleAllocationArea) {
    roleAllocationArea.each((index, role) => {
      role.innerHTML = ''
    })
  }

  employeeAllocationArea = $('.employee-allocation')
  if (employeeAllocationArea) {
    employeeAllocationArea.each((index, employee) => {
      employee.innerHTML = ''
    })
  }

  var startDate = document.getElementById('start_date').value.split('-') // coleta o valor do input de data de início do projeto, separando dia, mês e ano em uma lista
  var endDate = document.getElementById('end_date').value.split('-') // coleta o valor do input de data de fim do projeto, separando dia, mês e ano em uma lista
  startYear = Number(startDate[0]) // armazena o valor do ano de início do projeto
  endYear = Number(endDate[0]) // armazena o valor do ano de fim do projeto
  startMonth = Number(startDate[1]) // armazena o valor do mês de início do projeto
  endMonth = Number(endDate[1]) // armazena o valor do mês de fim do projeto

  // caso o projeto esteja contido dentro o mesmo ano
  console.log(startYear)
  if (startYear == endYear) {
    if (startYear > 0 && endYear > 0) {
      roleAllocationArea = $('.role-allocation')
      // estrutura de repetição que cria os inputs para cada mês do projeto
      roleAllocationArea.each((index, role) => {
        // o ano correspondente aos meses de atribuição é mostrado acima deles
        role.innerHTML += `
          <div class="row">
            <div class="year-section">${startYear}</div>
          </div>
        `
      })
    }
    for (i = startMonth; i <= endMonth; i++) {
      let month = i
      defineMonthName(month) // cria uma label com o nome do mês
      roleAllocation(roleIndex, startYear, month) // cria um input com id personalizado para as horas atribuíd
    }
  }
  // caso o projeto tenha uma duração que não esteja contida no mesmo ano
  else {
    // estrutura de repetição que cria os inputs para cada mês do projeto
    for (y = startYear; y <= endYear; y++) {
      let year = y
      roleAllocationArea = $('.role-allocation')

      roleAllocationArea.each((index, role) => {
        // o ano correspondente aos meses de atribuição é mostrado acima deles
        role.innerHTML += `
          <div class="row">
            <div class="year-section">${y}</div>
          </div>
        `
      })

      employeeAllocationArea = $('.employee-allocation')

      employeeAllocationArea.each((index, employee) => {
        // o ano correspondente aos meses de atribuição é mostrado acima deles
        employee.innerHTML += `<div class=row>${y}</div>`
      })

      if (y == startYear) {
        for (i = startMonth; i <= 12; i++) {
          let month = i
          // caso esteja no primeiro ano do projeto, os espaços de atribuição de horas por mês serão criados a partir do primeiro mês do projeto
          defineMonthName(month) // cria uma label com o nome do mês
          roleAllocation(roleIndex, year, month) // cria um input com id personalizado para as horas atribuídas
        }
      } else if (y == endYear) {
        for (i = 1; i <= endMonth; i++) {
          let month = i
          // caso esteja no último ano do projeto, os espaços de atribuição de horas por mês serão criados até o último mês do projeto
          defineMonthName(month) // cria uma label com o nome do mês
          roleAllocation(roleIndex, year, month) // cria um input com id personalizado para as horas atribuídas
        }
      } else {
        for (i = 1; i <= 12; i++) {
          let month = i
          // caso esteja em um ano intermediário de projeto, os espaços de atribuição de horas por mês serão criados de janeiro a dezembro
          defineMonthName(month) // cria uma label com o nome do mês
          roleAllocation(roleIndex, year, month) // cria um input com id personalizado para as horas atribuídas
        }
      }
    }
  }

  // if (roleAllocationArea && startYear > 0 && endYear > 0) {
  //   roleAllocationArea.each((index, role) => {
  //     role.innerHTML += `
  //       <div class="row">
  //         <div class="allocation-button-section">
  //           <button type="button" class="btn-primary" data-bs-toggle="modal" data-bs-target="#allocation-modal" onclick="getEmployees(${index})">Alocar funcionários</button>
  //         </div>
  //       </div>
  //     `
  //   })
  // } else {
  //   roleAllocationArea.each((index, role) => {
  //     role.innerHTML += `
  //       <div class="row">
  //         <div class="allocation-button-section">
  //           Defina uma data inicial e final para fazer a alocação
  //         </div>
  //       </div>
  //     `
  //   })
}

// função que define o nome dos meses
function defineMonthName(month) {
  // no switch case abaixo, nome do mês - em inglês e português, respectivamente - é definido de acordo com o valor recebido no input
  // 1 corresponde a janeiro, 2 a fevereiro, 3 a março e assim por diante
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
}

// função que cria inputs personalizados para cada mês de atribuição de funções
function roleAllocation(roleIndex, year, month) {
  roleAllocationArea = $('.role-allocation') // seleciona os elementos de classe role-allocation

  roleAllocationArea.each((index, role) => {
    // define o html interno de cada elemento da classe role-allocation com uma label para o nome do mês e um input com name e id personalizado para cada mês do projeto
    role.innerHTML += `
      <div class="col-3 month-allocation"> 
        <label for="role-hours-month${month}">${monthNameBr}: 
        </label>
        <input type="number" name="role-hours-month${month}-${index}" id="role-hours-month${month}-${index}" onchange="defineHoursRole(${index}, ${year}, ${month}, this.value)" required>
      </div>
    `
  })
}

function defineHoursRole(index, allocationYear, allocationMonth, hours) {
  hours = Number(hours)
  // let role = rolesAdded[index]

  // rolesAssignment.push(
  //   {
  //     roleName: newRole,
  //     years: [
  //       {
  //         months: [
  //           {}
  //         ]
  //       }
  //     ]
  //   }
  // )

  // console.log(rolesAssignment)
  if (!rolesAssignment || rolesAssignment.length - 1 < index) {
    rolesAdded.forEach((role, index) => {
      rolesAssignment.push({
        roleName: role,
        years: [
          {
            number: allocationYear,
            months: [
              {
                number: allocationMonth,
                hours: hours
              }
            ]
          }
        ]
      })
    })
  }
  // console.log(rolesAssignment)
  let haveYear = false
  rolesAssignment[index].years.forEach((year, yearIndex) => {
    if (year.number == allocationYear) {
      haveYear = true
      let haveMonth = false
      year.months.forEach((month, monthIndex) => {
        if (month.number == allocationMonth) {
          console.log(month.number, allocationMonth)
          haveMonth = true
        }
      })
      if (!haveMonth) {
        year.months.push({
          number: allocationMonth,
          hours: hours
        })
      }
    }
  })
  if (!haveYear) {
    console.log('entrou')
    role.years.push({
      number: allocationYear,
      months: [
        {
          number: allocationMonth,
          hours: hours
        }
      ]
    })
  }
  // else {
  //   console.log("entrou")
  //   role.years[0] =
  //     [
  //       {
  //         number: allocationYear,
  //         months: [
  //           {
  //             number: allocationMonth,
  //             hours: hours
  //           }
  //         ]
  //       }
  //     ]
  // }
  console.log(rolesAssignment)
}
// função que cria inputs personalizados para cada mês de atribuição de funcionários
function employeeAllocation() {
  employeeAllocationArea = $('.employee-allocation') // seleciona os elementos de classe employee-allocation

  employeeAllocationArea.each((index, employee) => {
    // define o html interno de cada elemento da classe employee-allocation com uma label para o nome do mês e um input com name e id personalizado para cada mês do projeto
    employee.innerHTML += `
      <div class="col-3 month-allocation"> 
        <label for="employee-hours-${monthName}-${startYear}">${monthNameBr}: 
        </label>
        <input type="number" name="employee-hours-${monthName}-${startYear}" id="employee-hours-${monthName}-${startYear}">
      </div>
    `
  })
}

function generateEmployeeAllocationArea() {
  employeeAllocationArea = $('.employee-allocation') // seleciona os elementos de classe employee-allocation
  if (employeeAllocationArea) {
    employeeAllocationArea.each((index, employee) => {
      employee.innerHTML = ''
    })
  }

  if (startYear == endYear) {
    for (i = startMonth; i <= endMonth; i++) {
      defineMonthName(i)
      employeeAllocation()
    }
  } else {
    for (y = startYear; y <= endYear; y++) {
      employeeAllocationArea = $('.employee-allocation')

      employeeAllocationArea.each((index, employee) => {
        employee.innerHTML += `
          <div class="row">
            <div class="year-section">${y}</div>
          </div>
        `
      })

      if (y == startYear) {
        for (i = startMonth; i <= 12; i++) {
          defineMonthName(i)
          employeeAllocation()
        }
      } else if (y == endYear) {
        for (i = 1; i <= endMonth; i++) {
          defineMonthName(i)
          employeeAllocation()
        }
      } else {
        for (i = 1; i <= 12; i++) {
          defineMonthName(i)
          employeeAllocation()
        }
      }
    }
  }
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
  $('#project-department')[0].value = projectData.department_name
}

function getProject(id) {
  let url = '/projects/project/' + id

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)
  console.log(data)
  return data
}

function getEmployeesAssigned(id) {
  let url = '/projects/employeesassigned/' + id

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

function deleteProject(id) {
  // localStorage.setItem('message', 'deleted project')
  setTimeout(function showToast() {
    const toast = new bootstrap.Toast(document.getElementById('deleteToast'))
    toast.show()
  }, 300)

  let url = 'projects/' + id

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

let employeesAssignedTable = $('#employees-assigned-table')
let employeesAssignedData = []

function viewEmployeesAssigned(id) {
  let url = 'projects/employeesassigned/' + id

  let xhttp = new XMLHttpRequest()

  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)

  console.log(data)

  employeesAssignedData = []
  data.forEach(row => {
    employeesAssignedData.push(row)
  })

  $(employeesAssignedTable).bootstrapTable('destroy')
  setTimeout(function () {
    $(employeesAssignedTable).bootstrapTable({
      data: employeesAssignedData
    })
    // $('#employees-assigned-table tr:not(:first)').addClass('table-body-row')
  }, 0)
}

function viewProjectInfo(id) {
  viewProject(id)
  viewEmployeesAssigned(id)
}
