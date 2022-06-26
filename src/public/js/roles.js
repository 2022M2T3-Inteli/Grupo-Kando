// Verifica se há uma mensagem no localstorage ao carregar a página
if (localStorage.getItem("message")) {

    // Se a mensagem for de função criada, irá chamar o Toast que mostrará para o usuário a mensagem de criação de função
  if (localStorage.getItem("message") == "created role") {
    toastShow("add");
    localStorage.removeItem("message");// Remove a mensagem para a função não ser chamada novamente ao recarregar a página

    // Se a mensagem for de edição, irá chamar o Toast de função editado
  } else if (localStorage.getItem("message") == "edited role") {
    toastShow("edit");
    localStorage.removeItem("message");  // Remove a mensagem para a função não ser chamada novamente ao recarregar a página
  }
}

function abrir() {
  //animação para abrir o modal
  var modal = document.querySelector(".modal");
  modal.style.display = "block";
}
function fechar() {
  //animação para fechar o modal
  var modal = document.querySelector(".modal");
  modal.style.display = "none";
}

//toast de feedback "função criada com sucesso"
function toastShow(type) {
  setTimeout(function showToast() {
    let toastElement;
    if (type == "add") {
      toastElement = $("#addToast")[0];
    } else if (type == "edit") {
      toastElement = $("#editToast")[0];
    }
    // else {
    // 	toastElement = $('#deleteToast')[0]
    // }
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
  }, 300);
}

// Função que define a mensagem de função criada
function toastTriggerAdd() {
  localStorage.setItem("message", "created role");
}

// Função que define a mensagem de função editada
function toastTriggerEdit() {
  localStorage.setItem("message", "edited role");
}

// Guarda a referência a tabela de funções em uma varíavel
let rolesTable = $("#roles-table");
let rolesData = []; // Define o array de funções

// Define a função que irá gerar toda a tabela de funções no front
function getRolesList() {
  let url = "roles/all";

  let xhttp = new XMLHttpRequest();

  xhttp.open("get", url, false);
  xhttp.send();

  let data = JSON.parse(xhttp.responseText);

  // Zera a tabela de funções após a requisição
  rolesData = [];

  // Para cada função retornado na requisição, guarda os dados deles
  data.forEach((row, index) => {
    rolesData.push(row);// Guarda no array a função atual percorrido no loop

    // Define o atributo tools à função atual, para que seja possível exibir as ferramentas de editar e remover função
    rolesData[index].tools = `
			<!-- button trigger modal view role -->
			<div class="role-tools">

				<div
					class="material-symbols-outlined role-edit-button"
					data-bs-toggle="modal"
					data-bs-target="#edit-role-modal"
					onclick="setEditRoleId(${row.id})"
				>
					<span class="material-symbols-outlined">
						edit
					</span>
				</div>

				<div
					class="material-symbols-outlined role-delete-button"
					data-bs-toggle="modal"
					data-bs-target="#remove-role-modal"
					onclick="openModalDelete(${row.id})"
					
				>
					delete
				</div>
			</div>
		`;
  });

  // Destrói a tabela que há no front
  $(rolesTable).bootstrapTable("destroy");

  // Define um tempo para executar uma função que irá gerar novamente a tabela com os novos dados
  setInterval(function () {
    $(rolesTable).bootstrapTable({
      data: rolesData,
    });
    // Define o estilo das linhas da tabela
    $("#roles-table tr:not(:first)").addClass("table-body-row");
  }, 0);
}
getRolesList(); // Ao carregar o documento, chama a função que irá gerar a primeira tabela de funções


// Define a função que irá construir os botões de remoção de funçãos do modal de remoção, de acordo com o botão de deletar função que foi clicado
function setEditRoleId(id) {
  let roleData = getRole(id);

  $("#role_id")[0].value = roleData.id;
  $("#role-name")[0].value = roleData.name;
}

function getRole(id) {
  let url = "/roles/" + id;

  let xhttp = new XMLHttpRequest();
  xhttp.open("get", url, false);
  xhttp.send();

  let data = JSON.parse(xhttp.responseText);
  console.log(data);
  return data;
}

let roleId = 0;
function modalDelete(id) {
  roleId = id;
}

function deleteRole(id) {
  // localStorage.setItem('message', 'deleted role')
  setTimeout(function showToast() {
    const toast = new bootstrap.Toast(document.getElementById("deleteToast"));
    toast.show();
  }, 300);

  let url = `roles/${id}`;

  let xhttp = new XMLHttpRequest();

  xhttp.addEventListener("load", getRolesList);

  xhttp.open("delete", url, false);
  xhttp.send();
}

// Guarda a referência do input de pesquisa
let searchInput = $("#search");

// Cria a função que ordena os dados da tabela quando for acionado essa ordenação pelo usuário
$(rolesTable).on("sort.bs.table", function () {
  // Define um tempo para executar essa função, para que não ocorra de tentar ordenar antes de construir a tabela
  setTimeout(function () {
    $(`${employeeTable} tr:not(:first)`).addClass("table-body-row");
  }, 0);
});

// Define a função que irá ser acionada sempre uma tecla for acionada no campo de input
$(searchInput).keyup(function () {
  let delay = 100 // Define um delay de 100ms para fazer as ações
  let value = searchInput[0].value // Guarda o valor do input de pesquisa

  let roleRows = $(".table-body-row"); // Guarda as linhas da tabela
  let roleReversedRows = [];

  // Para cada linha na lista de função
  roleRows.each(function (index, row) {
    roleReversedRows.push(row); // Guarda as linhas na variável que irá armazenar os funçãos em ordem invertida
  });
  roleReversedRows = roleReversedRows.reverse(); // Reverte a ordem dos funçãos na lista

  // Para cada função da lista invertida
  roleReversedRows.forEach(function (row) {
    let roleName = row.firstChild.innerText.toUpperCase(); // Guarda o nome da função da linha atual capitalizado
    value = value.toUpperCase(); // Guarda o valor do input de pesquisa capitalizado

    // Verifica se o nome da função inclui o valor do input de pesquisa
    if (roleName.includes(value)) {
      // Define um tempo de espera
      setTimeout(function () {
        // Define o css da linha atual
        $(row).css({
          display: "table",
          border: "solid",
        });
      }, delay);
      // Define o css da linha atual
      $(row).css({
        visibility: "visible",
        opacity: 1,
        border: "none",
      });
    // Se não possuir, irá esconder as linhas da função de baixo para cima, usando a linha atual da lista invertida
    } else {
      setTimeout(function () {
        $(row).css("display", "none");
      }, delay);

      $(row).css({
        visibility: "hidden",
        opacity: 0,
        transition: "visibility 0.5s linear	, opacity 0.5s linear",
      });
    }
  });
});

// Define a função que irá construir os botões de remoção de funçãos do modal de remoção, de acordo com o botão de deletar função que foi clicado
function openModalDelete(id) {
  $("#delete-modal")[0].innerHTML = `
	  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
	  <button type="button" class="btn btn-primary" class="btn btn-primary" data-bs-dismiss="modal" onclick="deleteRole(${id})">Remover</button>
	`;
}

// export function toastTrigger()

// Define a função de visualização de função
function viewRole(id) {
  let roleData = getRole(id); // Define os dados da função como a função selecionado pelo id

    // Cria a tabela do funcionário com os dados da função
  $("#role-info-section")[0].innerHTML = `
		<table class="table">
			<tbody>
				<tr>
					<th scope="row">Nome:</th>
					<td>${roleData.name}</td>
				</tr>
			</tbody>
		</table>
	`;
}
