$('.add-product').click(() => {
    let accessToken = localStorage.getItem('accessToken');

    if(!accessToken) return;

    
    let spinner = '<div class="loader"></div>';
    let curtain = '<div class="loading-curtain"></div>'

    let mainContent = $('body').html();

    $('body').css("overflow", "hidden");

    $('body').html(spinner + curtain + mainContent);

    $('body').css("overflow-y", "auto");
})