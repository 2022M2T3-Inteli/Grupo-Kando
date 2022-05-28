let users = [
    {
        email: "admin@yamaha.com",
        password: "admin"
    },
    // {
    //     email: "admin2@yamaha.com",
    //     password: "Admin@yamaha22"
    // }
]

$(".input-style").on("keyup", function(e){
    if(e.key === "Enter") {
        let email = $("#email-input")[0].value
        let password = $("#password-input")[0].value

        if(email && password) {
            validate()
        }
    }
})

function validate() {
    let email = $("#email-input")[0].value
    let password = $("#password-input")[0].value

    if(email && password) {
        users.some(function(user, index) {
            if(email === user.email && password === user.password) {
                return window.location = "dashboard.html"
            }
            else if(index >= users.length -1) {
                return alert("Credenciais Incorretas!")
            }
        })
    }
}