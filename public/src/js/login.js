$(document).ready(function() {
    let token = localStorage.getItem('accessToken');
    
    if(token != null) localStorage.removeItem('accessToken');
    
    $('#loginForm').submit(function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            type: 'POST',
            url: '/login',
            data: {
                username: username,
                password: password
            },
            success: function(response) {
                localStorage.setItem('accessToken', response);
                
                window.location.href = "/";
            },
            error: function(xhr, status, error) {
                alert(xhr.responseText); // Exibe a mensagem de erro
            }
        });
    });
});
