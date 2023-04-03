$(()=>{
    getAllServices(dealer.city);
})

async function getAllServices(cityName){
    let apiUrl = apiLink+'/api/getService?city='+cityName;
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
        '<td colspan="12" class="text-center">No Services</td>'+
    '</tr>';
    if(response.status == 200){
        temp = '';
        for(let item of response.data){
            temp += '<tr>'+
            '<td>'+(item.customerName == (null || "") ? "N/A" : item.customerName)+'</td>'+
            '<td>'+(item.customerEmail == (null || "") ? "N/A" : item.customerEmail)+'</td>'+
            '<td>'+(item.customerMobile == (null || "") ? "N/A" : item.customerMobile)+'</td>'+
            '<td>'+(item.customerAddress == (null || "") ? "N/A" : item.customerAddress)+'</td>'+
            '<td>'+(item.customerState == (null || "") ? "N/A" : item.customerState)+'</td>'+
            '<td>'+(item.customerCity == (null || "") ? "N/A" : item.customerCity)+'</td>'+
            '<td>'+(item.customerPin == (null || "") ? "N/A" : item.customerPin)+'</td>'+
            '<td>'+(item.serviceType == (null || "") ? "N/A" : String(item.serviceType).toUpperCase())+'</td>'+
            '<td>'+(item.customerPackage == (null || "") ? "N/A" : item.customerPackage)+'</td>'+
            '<td>'+(item.customerRequirement == (null || "") ? "N/A" : item.customerRequirement)+'</td>'+
            '<td>'+(item.customerModel == (null || "") ? "N/A" : item.customerModel)+'</td>'+
            '<td>'+(item.customerPurchased == (null || "") ? "N/A" : String(item.customerPurchased).toUpperCase())+'</td>'+
            '<td>'+(item.customerStore == (null || "") ? "N/A" : item.customerStore)+'</td>'+
            '<td>'+(item.customerInvoice == (null || "") ? "N/A" : item.customerInvoice)+'</td>'+
            '<td>'+(item.customerPurchaseDate == (null || "") ? "N/A" : item.customerPurchaseDate)+'</td>'+
            '<td>'+(item.serviceDate == (null || "") ? "N/A" : item.serviceDate)+'</td>'+
            '<td>'+(item.serviceTime == (null || "") ? "N/A" : item.serviceTime)+'</td>'+
            '<td>'+(item.serviceImage == (null || "") ? "N/A" : item.serviceImage)+'</td>'+
            '<td>'+(item.createdAt == (null || "") ? "N/A" : item.createdAt)+'</td>'+
        '</tr>';
        }
        $('#service-data').html(temp);
    }else{
        $('#service-data').html(temp);
    }
}