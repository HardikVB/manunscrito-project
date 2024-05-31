// Função para definir um cabeçalho de autorização globalmente para todas as solicitações HTTP
function setAuthHeader(xhr) {
    // Obter o token de acesso do localStorage
    var accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        // Incluir o token de acesso no cabeçalho de autorização
        xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    }
}

// Configurar o cabeçalho de autorização globalmente para todas as solicitações HTTP
$(document).ajaxSend(function(event, xhr, settings) {
    setAuthHeader(xhr);
});

// Evento de clique para os links de navegação
$('.verify-login').click(function(event) {
    var accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {

        window.location.href = "/login";

        return false;
    }
});

$(document).ready(function() {
    let accessToken = localStorage.getItem('accessToken');

    if(accessToken != null) {
        $.ajax({
            type: 'POST',
            url: '/',
            headers: {
                "Authorization": "Berear " + accessToken
            },
            success: function(response) {
                let previousContent = $('.login-shopping-container').html();
                $('.login-shopping-container').html(previousContent + response);
            }
        });
    }
})