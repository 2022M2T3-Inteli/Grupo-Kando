let rolesAssignment // define a variável que irá armazenar a lista de todas as funções salvas para cadastar um projeto
let employeesAssignment // define a variável que irá armazenar a lista de todos os funcionários salvos para cadastar um projeto

// Verifica se existe funções salvas para chamar as funções que irão fazer a alocação delas ao projeto (após cadastrar um projeto)
if (localStorage.getItem("rolesAssignment")) {

  rolesAssignment = localStorage.getItem("rolesAssignment") // Pega a variável do localstorage
  let projectId = getProjectId() // Define o id do projeto chamando a função que pega o id do último projeto cadastrado no banco

  deleteAssignments(projectId) // Chama a função que deleta todos os assignments passando o id projeto, é necessário fazer isso para que tenham assignments duplicados para o mesmo projeto
  projectCreated(rolesAssignment, projectId) // Chama a função que irá criar as alocações da função ao projeto, após o projeto ter sido criado
  localStorage.removeItem("rolesAssignment") // Remove a variável do localstorage para não ser chamada novamente caso o usuário recarregue a página
}

// Verifica se há uma mensagem no localstorage ao carregar a página
if (localStorage.getItem('message')) {

  // Se a mensagem for de projeto criado, irá chamar o Toast que mostrará para o usuário a mensagem de criação de projeto
  if (localStorage.getItem('message') == 'created project') {
    toastShow('add')

    localStorage.removeItem('message') // Remove a mensagem para a função não ser chamada novamente ao recarregar a página
  }
  // Se a mensagem for de edição, irá chamar o Toast de projeto editado
  else if (localStorage.getItem('message') == 'edited project') {
    toastShow('edit')
    localStorage.removeItem('message') // Remove a mensagem para a função não ser chamada novamente ao recarregar a página
  }
  // Se a mensagem for de deletar, irá chamar o Toast de projeto deletado
  else if (localStorage.getItem('message') == 'deleted project') {
    toastShow('delete')
    localStorage.removeItem('message') // Remove a mensagem para a função não ser chamada novamente ao recarregar a página
  }
}

// Cria a função que irá fazer a requisição para pegar o id do último projeto cadastrado
function getProjectId() {
  let url = 'projects/projectid'

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let id = xhttp.responseText // Define id como a resposta da requisição
  return id // Retorna o id do projeto
}

// Define a função que irá deletar todos as alocações de funções de um projeto, passando como parâmetro o id do projeto
function deleteAssignments(id) {
  let url = `projects/deleteassignments/${id}`

  let xhttp = new XMLHttpRequest()
  xhttp.open('delete', url, false)
  xhttp.send()
}

// Define a função que irá fazer a validação dos inputs e submiterá o formulário
function submitProject() {
  let formValid = document.forms["add-project-form"].checkValidity() // Verifica se os inputs estão preenchidos

  // Caso o formulário esteja validado
  if (formValid) {
    localStorage.setItem('message', 'created project') // Guarda a mensagem no localstorage
    localStorage.setItem('rolesAssignment', rolesAssignment) // Guarda as funções alocadas no localstorage

    $("#add-project-form")[0].submit() // Chama o método que enviára os dados do formulário para o endpoint dele
  }
}

// Define a função será responsável por mostrar o Toast na tela
function toastShow(type) {
  setTimeout(function showToast() {
    let toastElement
    // Verifica se a mensagem passada na função é do Toast de adicionar
    if (type == 'add') {
      toastElement = $('#addToast')[0] // Define o Toast de projeto adicionado
    }
    // Verifica se a mensagem passada na função é do Toast de edição
    else if (type == 'edit') {
      toastElement = $('#editToast')[0] // Define o Toast de projeto editado
    }
    // Verifica se a mensagem passada na função é do Toast de remoção
    // else {
    // 	toastElement = $('#deleteToast')[0] // Define o Toast projeto removido
    // }
    const toast = new bootstrap.Toast(toastElement) // Chama o Toast, passando elemento definido anteriormente
    toast.show() // Chama o método que faz o Toast aparecer
  }, 300) // Define um delay de 300ms
}

// Função que define a mensagem de projeto criado
function toastTriggerAdd() {
  localStorage.setItem('message', 'created project')
}

// Função que define a mensagem de projeto editado
function toastTriggerEdit() {
  localStorage.setItem('message', 'edited project')
}

// Define a função que irá cadastrar as alocações das funções e suas horas mês/ano para um projeto
function projectCreated(data, projectId) {
  let url = `/projects/assignments`

  let xhttp = new XMLHttpRequest()
  xhttp.open('POST', url, false)
  // Definindo o tipo de dado que será passado na requisição
  xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.send(JSON.stringify([data, projectId])) // Envia todos os dados necessários para alocar as funções no banco e o id do projeto que irá receber essas alocações
}

// Guarda a referência a tabela de projetos em uma varíavel
let projectsTable = $('#projects-table')
let projectsData = [] // Define o array de projetos

// Define a função que irá gerar toda a tabela de projetos no front
function getProjectsList() {
  let url = 'projects/all'

  let xhttp = new XMLHttpRequest()

  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)

  // Zera a tabela de projetos após a requisição
  projectsData = []

  // Para cada projeto retornado na requisição, guarda os dados deles
  data.forEach((row, index) => {
    projectsData.push(row) // Guarda no array o projeto atual percorrido no loop

    // Define o atributo tools ao projeto atual, para que seja possível exibir as ferramentas de visualizar, editar e remover projeto
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

  // Destrói a tabela que há no front
  $(projectsTable).bootstrapTable('destroy')

  // Define um tempo para executar uma função que irá gerar novamente a tabela com os novos dados
  setTimeout(function () {
    $(projectsTable).bootstrapTable({
      data: projectsData
    })

    // Define o estilo das linhas da tabela
    $('#projects-table tr:not(:first)').addClass('table-body-row')
  }, 0)
}
getProjectsList() // Ao carregar o documento, chama a função que irá gerar a primeira tabela de projetos

// Define a função que irá construir os botões de remoção de projetos do modal de remoção, de acordo com o botão de deletar projeto que foi clicado
function openModalDelete(id) {
  $('#delete-modal')[0].innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
    <button type="button" class="btn btn-primary" class="btn btn-primary" data-bs-dismiss="modal" onclick="deleteProject(${id})">Remover</button>
  `
}

// Define a função que irá pegar todas as funções cadastradas
function getRoles() {
  let url = 'roles/all'

  let xhtpp = new XMLHttpRequest()
  xhtpp.open('get', url, false)
  xhtpp.send()

  let data = JSON.parse(xhtpp.responseText)

  // Guarda a referência ao select de funções do front
  let selectRoles = $('#employee-roles')[0]
  // let rolesList = $('#roles-list')[0]
  console.log(data)

  // Para cada função retornada da requisição, gera um option no select de funções
  data.forEach(role => {
    selectRoles.innerHTML += `<option value="${role.name}">${role.name}</option>`
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

// Define a função que limpa os inputs
function clearInputs() {
  let projectInputs = $('#add-project-modal input') // Referência aos inputs que estão no modal de adicionar projeto
  let projectTextAreas = $('#add-project-modal textarea') // Referência a text area que está no modal de adicionar projeto
  let locationSelect = $('#location')[0] // Referência ao select de regiões que está no modal de adicionar projetos

  // Percorre cada input e limpa os dados dele
  projectInputs.each((index, input) => {
    input.value = ''
  })

  // Percorre cada area de texto e limpa ela
  projectTextAreas.each((index, textArea) => {
    textArea.value = ''
  })

  locationSelect.value = 'AM' // Define o select de regiões para o valor padrão
  rolesList.innerHTML = '' // Limpa a lista de funções
}

// Define a variável que irá guardar a funções alocadas ao projeto
let rolesAdded = []
// Define a função que adiciona novas funções
function addRole() {
  // Define a variavel que irá guardar todos os dados de uma de função alocada
  rolesAssignment = []
  let rolesList = $('#roles-list')[0] // Guarda a referencia a lista de funções que guardará todas as funções alocadas
  let newRole = document.getElementById('employee-roles').value // Define a nova função como o valor atual do select de funções
  let roleIndex // Cria a variável do índice da função

  // Verifica se a função atual não está no array de funções
  if (rolesAdded.indexOf(newRole) == -1) {
    rolesAdded.push(newRole) // Adiciona a lista de funções a função atual
    roleIndex = rolesAdded.indexOf(newRole) // Define o índice da função como o índice da função atual
    // Adiciona o acordião da função atual na lista de funções adicionadas
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
  updateDates(roleIndex) // Chama a função que irá adicionar os inputs de alocação por mês cadastrado
}

// Define a variável que irá guardar todas os employees adicionados
let employeesAdded = []

// Define a função que irá adicionar novos funcionários a lista de funcionários alocados
function addEmployee() {
  employeesAssignment = [] // Zera os dados de funcionários cadastrados a um projeto
  let employeesList = $('#employees-list')[0] // Guarda a referência da lista de funcionários do front
  let newEmployee = document.getElementById('employees-employee').value // Guarda o funcionário que está selecionado no select de funcionários
  let employeeIndex // Cria a variável que irá guardar o index do funcionário

  // Verifica se o funcionário não está na lista de funcionários
  if (employeesAdded.indexOf(newEmployee) == -1) {
    employeesAdded.push(newEmployee) // Adiciona o funcionário na lista de funcionários
    employeeIndex = employeesAdded.indexOf(newEmployee) // Guarda o índice de funcionário na lista
    // Adiciona o acordião do funcionário na lista de funcionários
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
  registerDateEmployee(employeeIndex) // Chama a função que irá gerar os inputs das horas alocadas do funcionário
}

// Define a função que irá atualizar as datas do funcionário
function updateDates(index) {
  let rolesList = $('#roles-list') // Guarda a referência da lista de funções alocadas

  // Verifica se há mais de uma função alocada
  if (rolesList.length > 0) {
    registerDate(index) // Chama a função que registra os inputs das funções
  }
}

let roleAllocationArea // Variável que guardará a referencia a área de alocação de funções
let employeeAllocationArea // Variável que guardará a referencia a área de alocação de funcionários
let monthName // Variável auxiliar para definir o nome dos meses (inglês)
let monthNameBr // Variável auxiliar para definir o nome dos meses (português)
let startMonth // Variável que guarda o valor do mês de início do projeto
let startYear // Variável que guarda valor do ano de início do projeto
let endYear // Variável que guarda valor do ano de fim do projeto
let endMonth // Variável que guarda o valor do mês de fim do projeto

function registerDate(roleIndex) {
  roleAllocationArea = $('.role-allocation') // Define a área de funções
  // Caso haja dados na área de alocar horas para as funções, o html dela será zerado
  if (roleAllocationArea) {
    roleAllocationArea.each((index, role) => {
      role.innerHTML = ''
    })
  }

  // Define a área de funcionários
  employeeAllocationArea = $('.employee-allocation')
  // Caso haja dados na área de alocar horas para os funcionários, o html dela será zerado
  if (employeeAllocationArea) {
    employeeAllocationArea.each((index, employee) => {
      employee.innerHTML = ''
    })
  }

  let startDate = document.getElementById('start_date').value.split('-') // coleta o valor do input de data de início do projeto, separando dia, mês e ano em uma lista
  let endDate = document.getElementById('end_date').value.split('-') // coleta o valor do input de data de fim do projeto, separando dia, mês e ano em uma lista
  startYear = Number(startDate[0]) // armazena o valor do ano de início do projeto
  endYear = Number(endDate[0]) // armazena o valor do ano de fim do projeto
  startMonth = Number(startDate[1]) // armazena o valor do mês de início do projeto
  endMonth = Number(endDate[1]) // armazena o valor do mês de fim do projeto

  // Caso o projeto esteja contido dentro o mesmo ano
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

      employeeAllocationArea = $('.employee-allocation') // Define a área de alocação de funcionários

      employeeAllocationArea.each((index, employee) => {
        // o ano correspondente aos meses de atribuição é mostrado acima deles
        employee.innerHTML += `<div class=row>${y}</div>`
      })

      // Caso o ano atual seja igual ao ano inicial
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

  // Verifica se a área de alocação e os inputs de anos estão com dados corretos
  if (roleAllocationArea && startYear > 0 && endYear > 0) {
    // Para cada função alocada, cria um botão que permite alocar funcionários dessa função
    roleAllocationArea.each((index, role) => {
      role.innerHTML += `
        <div class="row">
          <div class="allocation-button-section">
            <button type="button" class="btn-primary" data-bs-toggle="modal" data-bs-target="#allocation-modal" onclick="getEmployees(${index})">Alocar funcionários</button>
          </div>
        </div>
      `
    })
  }
  // Caso as datas informadas estejam incorretas, cria para cada função um texto pedindo para que seja definida uma data
  else {
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

// Função que registra as horas alocadas de um funcionário
function registerDateEmployee(roleIndex) {
  roleAllocationArea = $('.role-allocation')
  // Caso haja dados na área de alocar horas para os funcionários, o html dela será zerado
  if (roleAllocationArea) {
    roleAllocationArea.each((index, role) => {
      role.innerHTML = ''
    })
  }

  employeeAllocationArea = $('.employee-allocation') // Guarda a referência a área de funcionários alocados
  // Verifica se há funcionários alocados
  if (employeeAllocationArea) {
    // Percorre cada funcionário da lista de funcionários e zera o html dele
    employeeAllocationArea.each((index, employee) => {
      employee.innerHTML = ''
    })
  }

  let startDate = document.getElementById('start_date').value.split('-') // coleta o valor do input de data de início do projeto, separando dia, mês e ano em uma lista
  let endDate = document.getElementById('end_date').value.split('-') // coleta o valor do input de data de fim do projeto, separando dia, mês e ano em uma lista
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

      employeeAllocationArea = $('.employee-allocation') // Guarda a referência da área de alocação de funcionários

      // Para cada funcionário que há na área de alocação de funcionários, zera o html dele
      employeeAllocationArea.each((index, employee) => {
        // o ano correspondente aos meses de atribuição é mostrado acima deles
        employee.innerHTML += `<div class=row>${y}</div>`
      })

      // Verifica se o ano atual é o mesmo do ano inicial
      if (y == startYear) {
        for (i = startMonth; i <= 12; i++) {
          let month = i
          // caso esteja no primeiro ano do projeto, os espaços de atribuição de horas por mês serão criados a partir do primeiro mês do projeto
          defineMonthName(month) // cria uma label com o nome do mês
          roleAllocation(roleIndex, year, month) // cria um input com id personalizado para as horas atribuídas
        }
      }
      // Verifica se o ano atual é o ano final
      else if (y == endYear) {
        for (i = 1; i <= endMonth; i++) {
          let month = i
          // caso esteja no último ano do projeto, os espaços de atribuição de horas por mês serão criados até o último mês do projeto
          defineMonthName(month) // cria uma label com o nome do mês
          roleAllocation(roleIndex, year, month) // cria um input com id personalizado para as horas atribuídas
        }
      }
      else {
        for (i = 1; i <= 12; i++) {
          let month = i
          // caso esteja em um ano intermediário de projeto, os espaços de atribuição de horas por mês serão criados de janeiro a dezembro
          defineMonthName(month) // cria uma label com o nome do mês
          roleAllocation(roleIndex, year, month) // cria um input com id personalizado para as horas atribuídas
        }
      }
    }
  }
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

// Define a função que irá gerar as horas por mês por função
function defineHoursRole(index, allocationYear, allocationMonth, hours) {
  hours = Number(hours) // converte o valor para o tipo número

  // Verifica se não há alocação ou se a alocação está menor que o número de funções alocadas
  if (!rolesAssignment || rolesAssignment.length - 1 < index) {
    // Percorre cada função adicionada
    rolesAdded.forEach((role, index) => {
      // Adiciona os dados atuais da função no array que irá guardar todas as funções
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
  // Define a variável que irá ser usada para verificar se já possui aquele ano na função atual
  let haveYear = false
  // Percorre cada ano armazenado na função atual
  rolesAssignment[index].years.forEach((year, yearIndex) => {
    // Verifica se o valor atual que está guardado no ano é o mesmo do ano a ser alocado
    if (year.number == allocationYear) {
      // Caso seja, irá definir como verdadeiro
      haveYear = true
      // Define a variável que irá ser usada para verificar se já possui aquele mês na função atual
      let haveMonth = false
      // Percorre cada mês armazenado na função atual
      year.months.forEach((month, monthIndex) => {
        // Verifica se o valor armazenado no mês atual é o mesmo do mês a ser alocado
        if (month.number == allocationMonth) {
          haveMonth = true // Define que o mês existe já está na função
        }
      })
      // Verifica se o mês não está na função
      if (!haveMonth) {
        // Caso não esteja, irá adiconá-lo junto com as horas alocadas nele ao meses da função
        year.months.push({
          number: allocationMonth,
          hours: hours
        })
      }
    }
  })
  // Verifica se o ano não está na função
  if (!haveYear) {
    // Caso não esteja, adiciona ele, o mês e as horas desse mês 
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
}
// Função que cria inputs personalizados para cada mês de atribuição de funcionários
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

// Define a função que irá gerar as áreas de alocação de funcionários
function generateEmployeeAllocationArea() {
  employeeAllocationArea = $('.employee-allocation') // seleciona os elementos de classe employee-allocation
  // Caso já possua funcionários na área de funcionários alocados, zera o html dele
  if (employeeAllocationArea) {
    employeeAllocationArea.each((index, employee) => {
      employee.innerHTML = ''
    })
  }

  // Verifica se ano inicial é o mesmo do ano final
  if (startYear == endYear) {
    // Para cada mês, define o mês e aloca o funcionário
    for (i = startMonth; i <= endMonth; i++) {
      defineMonthName(i)
      employeeAllocation()
    }
  } 
  // Caso o ano inicial e final sejam diferentes
  else {
    // Percorre cada ano
    for (y = startYear; y <= endYear; y++) {
      employeeAllocationArea = $('.employee-allocation') // Guarda a referência da área de alocação de funcionários

      // Para cada funcionário na área de alocação de funcionários
      employeeAllocationArea.each((index, employee) => {
        // Define a seção de anos do funcionário
        employee.innerHTML += `
          <div class="row">
            <div class="year-section">${y}</div>
          </div>
        `
      })

      // Verifica se o ano atual é o mesmo inicial
      if (y == startYear) {
        for (i = startMonth; i <= 12; i++) {
          defineMonthName(i)
          employeeAllocation()
        }
      } 
      // Verifica se o ano atual é igual ao ano final
      else if (y == endYear) {
        // Percorre cada mês, adicionando o mês e alocando o funcinoário
        for (i = 1; i <= endMonth; i++) {
          defineMonthName(i)
          employeeAllocation()
        }
      } 
      // Caso não seja nem o ano inicial e nem o final
      else {
        // Percorre cada mês, definindo o mes atual e alocando ao funcionário
        for (i = 1; i <= 12; i++) {
          defineMonthName(i)
          employeeAllocation()
        }
      }
    }
  }
}
getRoles() // Chama a função que requisita todas as funções cadastradas

// Define a função que irá editar um projeto
function setEditProjectId(id) {
  let projectData = getProject(id) // Define os dados do projeto requisitando o projeto pelo id
  console.log(projectData)

  $('#project_id')[0].value = projectData.id // Define o valor do input de id como o do projeto selecionado
  $('#project-name')[0].value = projectData.name // Define o valor do input de nome como o do projeto selecionado
  $('#project-location')[0].value = projectData.location // Define o valor do select do região como o do projeto selecionado
  $('#project-start-date')[0].value = projectData.start_date // Define o valor do input de data inicial como o do projeto selecionado
  $('#project-end-date')[0].value = projectData.end_date // Define o valor do input de data final como o do projeto selecionado
  $('#project-description')[0].value = projectData.description // Define o valor da text area como o do projeto selecionado
  $('#project-department')[0].value = projectData.department_name // Define o valor do input de departamento como o do projeto selecionado
}

// Define a função responsável por pegar todos os dados do projeto selecionado
function getProject(id) {
  let url = '/projects/project/' + id

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)
  return data // Retorna os dados do projeto
}

// Define a função responsável por pegar todas as alocações de um funcionário
function getEmployeesAssigned(id) {
  let url = '/projects/employeesassigned/' + id

  let xhttp = new XMLHttpRequest()
  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)
  return data // Retorna todas as alocações do funcionário
}

let projectId = 0
function modalDelete(id) {
  projectId = id
}

// Define a função que irá deletar um projeto pelo id
function deleteProject(id) {
  // localStorage.setItem('message', 'deleted project')

  // Chama o Toast após apagar o projeto
  setTimeout(function showToast() {
    const toast = new bootstrap.Toast(document.getElementById('deleteToast'))
    toast.show()
  }, 300)

  let url = 'projects/' + id

  let xhttp = new XMLHttpRequest()

  // Adiciona um event listener para carregar novamente a lista de projetos após deletar o projeto atual
  xhttp.addEventListener('load', getProjectsList)

  xhttp.open('delete', url, false)
  xhttp.send()
}

// Guarda a referência do input de pesquisa
let searchInput = $('#search')

// Cria a função que ordena os dados da tabela quando for acionado essa ordenação pelo usuário
$(projectsTable).on('sort.bs.table', function () {
  // Define um tempo para executar essa função, para que não ocorra de tentar ordenar antes de construir a tabela
  setTimeout(function () {
    $(`${employeeTable} tr:not(:first)`).addClass('table-body-row')
  }, 0)
})

// Define a função que irá ser acionada sempre uma tecla for acionada no campo de input
$(searchInput).keyup(function () {
  let delay = 100 // Define um delay de 100ms para fazer as ações
  let value = searchInput[0].value // Guarda o valor do input de pesquisa

  let projectRows = $('.table-body-row') // Guarda as linhas da tabela
  let projectReversedRows = [] // Define 

  // Para cada linha na lista de projeto
  projectRows.each(function (index, row) {
    projectReversedRows.push(row) // Guarda as linhas na variável que irá armazenar os projetos em ordem invertida
  })
  projectReversedRows = projectReversedRows.reverse() // Reverte a ordem dos projetos na lista

  // Para cada projeto da lista invertida
  projectReversedRows.forEach(function (row) {
    let projectName = row.firstChild.innerText.toUpperCase() // Guarda o nome do projeto da linha atual capitalizado
    value = value.toUpperCase() // Guarda o valor do input de pesquisa capitalizado

    // Verifica se o nome do projeto inclui o valor do input de pesquisa
    if (projectName.includes(value)) {
      // Define um tempo de espera
      setTimeout(function () {
        // Define o css da linha atual
        $(row).css({
          display: 'table',
          border: 'solid'
        })
      }, delay)
      // Define o css da linha atual
      $(row).css({
        visibility: 'visible',
        opacity: 1,
        border: 'none'
      })
    } 
    // Se não possuir, irá esconder as linhas do projeto de baixo para cima, usando a linha atual da lista invertida
    else {
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

// Define a função de visualização de projeto
function viewProject(id) {
  let projectData = getProject(id) // Define os dados do projeto como o projeto selecionado pelo id

  // Cria a tabela do funcionário com os dados do projeto
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

let employeesAssignedTable = $('#employees-assigned-table') // Guarda a referência da tabela de associação do funcionários
let employeesAssignedData = [] // Define o array de dados de funcionários alocados

// Define a função que irá requisitar os dados de funcionários alocados ao projeto
function viewEmployeesAssigned(id) {
  let url = 'projects/employeesassigned/' + id

  let xhttp = new XMLHttpRequest()

  xhttp.open('get', url, false)
  xhttp.send()

  let data = JSON.parse(xhttp.responseText)

  // Define os dados de funcionários alocados como a resposta da requisição
  employeesAssignedData = []
  data.forEach(row => {
    employeesAssignedData.push(row)
  })

  // Destrói a tabela de funcionários alocados ao projeto
  $(employeesAssignedTable).bootstrapTable('destroy')
  // Define um intervalo para chamar a função que irá gerar a tabela de funcionários alocados ao projeto com os dados atualizados
  setTimeout(function () {
    $(employeesAssignedTable).bootstrapTable({
      data: employeesAssignedData
    })
  }, 0)
}

// Define a função que irá chamar as funções de visualização de projetos e alocação de funcionários ao projeto
function viewProjectInfo(id) {
  viewProject(id)
  viewEmployeesAssigned(id)
}
