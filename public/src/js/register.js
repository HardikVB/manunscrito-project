$(document).ready(function() {
    let token = localStorage.getItem('accessToken');
    
    if(token != null) localStorage.removeItem('accessToken');


    $('#registerForm').submit(function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        var username = $('#username').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var repeatPassword = $('#repeatPassword').val();

        if (password !== repeatPassword) {
            alert('Passwords do not match!');
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/register',
            data: {
                username: username,
                password: password,
                email: email
            },
            success: function(response) {
                window.location.href = "/login";
            },
            error: function(xhr, status, error) {
                alert(xhr.responseText); // Exibe a mensagem de erro
            }
        });
    });
});
