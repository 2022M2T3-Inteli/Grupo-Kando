function abrir(){
    //animação para abrir o modal
     var modal = document.querySelector('.modal');
     modal.style.display = 'block';
 }
 function fechar(){
     //animação para fechar o modal
     var modal = document.querySelector('.modal');
     modal.style.display = 'none';
 }

 function newRoleName() {
    let newRole = document.getElementById("new-employee-role").value
    console.log(newRole)
    document.getElementById(newRole).hidden = false
 }