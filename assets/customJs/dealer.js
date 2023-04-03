$(()=>{
    $('#dealer-login-form').on('submit', (e)=>{
        e.preventDefault();
        dealerLogin();
    })
})

async function dealerLogin(){
    let dataArr = $('#dealer-login-form').serializeArray();
    
    let data = {};
    for(let key of dataArr){
        data[key.name] = key.value;
    }
    console.log(data, 'data')

    let apiUrl = apiLink+'/api/getSingleDealer';
    let options = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(data)
    }

    let response = await fetch(apiUrl, options);
    response = await response.json();
    console.log(response, 'rseponse');
    if(response.status == 200){
        window.localStorage.setItem('dealer', JSON.stringify(response.data));
        window.location.href = './dashboard.html';
    }else{
        alert('Email or Password is Wrong | Try Again !')
        window.location.reload();
    }
}