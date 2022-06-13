// Define a lista de usuários
let users = [
    {
        email: "admin@yamaha.com",
        password: "admin"
    }
]

// Aplica um eventlistner para quando o usuário apertar alguma tecla em um dos inputs do login
$(".input-style").on("keyup", function(e){
    // Verifica se a teclar apartada foi o Enter
    if(e.key === "Enter") {
        // Guarda os valores dos inputs
        let email = $("#email-input")[0].value
        let password = $("#password-input")[0].value

        // Verifica se há valores inseridos nos inputs
        if(email && password) {
            // Chama o validador de acesso
            validate()
        }
    }
})

// Função que valida os dados dos inputs
function validate() {
    // Guarda os valores do email e da senha
    let email = $("#email-input")[0].value
    let password = $("#password-input")[0].value

    // Verifica se o email e a senha batem com um dos acessos que estão armazenados
    if(email && password) {
        users.some(function(user, index) {
            // Se exitir, acessa a página de dashboard
            if(email === user.email && password === user.password) {
                return window.location = "dashboard"
            }
            // Se não, retorna que as credenciais estão inválidas
            else if(index >= users.length -1) {
                return alert("Credenciais Incorretas!")
            }
        })
    }
}