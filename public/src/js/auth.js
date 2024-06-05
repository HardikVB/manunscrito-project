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

    let navItems = `<a class="nav-link" href="/login"><i class="fas fa-user"></i></a>
                    <a class="nav-link" href="/shopping-cart"><i class="fas fa-shopping-cart"></i></a>`;

    setTimeout(() => {
        if (accessToken != null) {
            $.ajax({
                type: 'POST',
                url: '/',
                headers: {
                    "Authorization": "Bearer " + accessToken
                },
                success: function(response) {
                    navItems += response;
                },
                error: function() {
                    console.error('Failed to fetch additional nav items.');
                },
                complete: function() {
                    $('.login-shopping-container').html(navItems).removeClass('loading');
                }
            });
        } else {
            $('.login-shopping-container').html(navItems).removeClass('loading');
        }
    }, 1000)

    
})