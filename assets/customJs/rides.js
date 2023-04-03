$(()=>{
    getAllRides(dealer._id);
})

async function getAllRides(dealerId){
    let apiUrl = apiLink+'/api/getRides?dealer='+dealerId;
    let options = {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    }

    let response = await fetch(apiUrl, options);
    response = await response.json();
    console.log(response, 'response')
    let temp = '<tr>'+
        '<td colspan="8" class="text-center">No Test Rides</td>'+
    '</tr>';
    if(response.status == 200){
        temp = '';
        for(let item of response.data){
            temp += '<tr>'+
            '<td>'+item.firstName+'</td>'+
            '<td>'+item.lastName+'</td>'+
            '<td>'+item.phone+'</td>'+
            '<td>'+item.email+'</td>'+
            '<td>'+item.state+'</td>'+
            '<td>'+item.city+'</td>'+
            '<td>'+item.model+'</td>'+
            '<td>'+item.createdAt+'</td>'+
        '</tr>';
        }
        $('#rides-data').html(temp);
    }else{
        $('#rides-data').html(temp);
    }
}