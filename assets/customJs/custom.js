const apiLink = 'http://localhost:3003';

let dealer = null;
function checkDealer(){
    if(window.localStorage.getItem('dealer') || (String(window.location.href).charAt(String(window.location.href).length - 1) == '/')){
        dealer = JSON.parse(window.localStorage.getItem('dealer'));
        console.log(dealer, 'dealer')
        $('#dealer-name').html(dealer.name)
    }else{
        window.location.replace('./');
    }
};

checkDealer();

$('#logout-btn').on('click', (e)=>{
    e.preventDefault();
    window.localStorage.removeItem('dealer');
    checkDealer();
})

$(()=>{
    $('input[name="name"]').val(dealer.name);
    $('input[name="email"]').val(dealer.email);
    $('textarea[name="address"]').val(dealer.city);
})