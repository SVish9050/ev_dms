$(()=>{
    getAllEnquiries(dealer.city);
})

async function getAllEnquiries(cityName){
    let apiUrl = apiLink+'/api/getEnquiry?city='+cityName;
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
        '<td colspan="13" class="text-center">No Enquiries</td>'+
    '</tr>';
    if(response.status == 200){
        temp = '';
        for(let item of response.data){
            temp += '<tr>'+
            '<td>'+item.firstName+'</td>'+
            '<td>'+item.lastName+'</td>'+
            '<td>'+item.phone+'</td>'+
            '<td>'+item.address+'</td>'+
            '<td>'+item.state+'</td>'+
            '<td>'+item.city+'</td>'+
            '<td>'+item.pincode+'</td>'+
            '<td>'+item.model+'</td>'+
            '<td>'+item.mfgyear+'</td>'+
            '<td>'+item.budget+'</td>'+
            '<td>'+item.purchasemonth+'</td>'+
            '<td>'+item.finance+'</td>'+
            '<td>'+item.createdAt+'</td>'+
        '</tr>';
        }
        $('#enq-data').html(temp);
    }else{
        $('#enq-data').html(temp);
    }
}