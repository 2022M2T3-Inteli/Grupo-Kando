var rolesAdded = document.querySelector('#roles-added')
var newEmployeeRole = document.querySelector('#new-employee-role')
var newEmployeeRoleName = newEmployeeRole.options[select.selectedIndex].text

function newRoleName() {
  document.querySelector('#role-selected01').text = newEmployeeRoleName
}
