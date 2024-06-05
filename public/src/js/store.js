$(document).ready(function() {
    let accessToken = localStorage.getItem('accessToken');

    setTimeout(() => {
        $.ajax({
            type: 'POST',
            url: '/store/verify',
            headers: {
                "Authorization": "Bearer " + accessToken
            },
            success: function(response) {
                $('.store-products').html(response + $('.store-products').html())
            },
            error: function() {
                console.error('Failed to fetch additional nav items.');
            },
            complete: function() {
                $('.loading.verification-remove').remove()

                $('body').css("overflow-y", "auto");
            }
        });
    }, 2000)
})