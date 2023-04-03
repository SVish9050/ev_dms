$(()=>{
    
    getTotalEnquiry(dealer.city);
    getTodayEnquiry(dealer.city);
    getTotalRides(dealer._id);
    getTodayRides(dealer._id);
    getTotalService(dealer.city);
    getTodayService(dealer.city);

})

async function getTotalEnquiry(cityName){
    let apiUrl = apiLink + '/api/getEnquiryCount?city='+cityName;
    let options = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }

    let response = await fetch(apiUrl, options);
    response = await response.json();
    console.log(response, 'response');
    $('#countTotalEnq').html(response.data)
}

async function getTodayEnquiry(cityName){
    let newDate = new Date().toISOString().split('T')[0];
    console.log(newDate, 'newDate')
    let apiUrl = apiLink + '/api/getEnquiryCount?city='+cityName+'&date='+newDate;
    let options = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }

    let response = await fetch(apiUrl, options);
    response = await response.json();
    console.log(response, 'response');
    $('#countTodayEnq').html(response.data)
}

async function getTotalRides(dealerId){
    let apiUrl = apiLink + '/api/getRideCount?dealer='+dealerId;
    let options = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }

    let response = await fetch(apiUrl, options);
    response = await response.json();
    console.log(response, 'response');
    $('#countTotalTest').html(response.data)
}

async function getTodayRides(dealerId){
    let newDate = new Date().toISOString().split('T')[0];
    console.log(newDate, 'newDate')
    let apiUrl = apiLink + '/api/getRideCount?dealer='+dealerId+'&date='+newDate;
    let options = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }

    let response = await fetch(apiUrl, options);
    response = await response.json();
    console.log(response, 'response');
    $('#countTodayTest').html(response.data)
}

async function getTotalService(cityName){
    let apiUrl = apiLink + '/api/getServiceCount?city='+cityName;
    let options = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }

    let response = await fetch(apiUrl, options);
    response = await response.json();
    console.log(response, 'response');
    $('#countTotalService').html(response.data)
}

async function getTodayService(cityName){
    let newDate = new Date().toISOString().split('T')[0];
    console.log(newDate, 'newDate')
    let apiUrl = apiLink + '/api/getServiceCount?city='+cityName+'&date='+newDate;
    let options = {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }

    let response = await fetch(apiUrl, options);
    response = await response.json();
    console.log(response, 'response');
    $('#countTodayService').html(response.data)
}