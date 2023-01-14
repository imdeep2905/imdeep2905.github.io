$(document).on('change', '#csv-selector', function() 
{
;
});

function generateHtmlTable() 
{
    ;
}	

async function get_response_from_API()
{
    let csv = document.getElementById("csv-selector").files[0];
    let formData = new FormData();
    formData.append("csv", csv);
    /*return fetch("https://cpms-restapi.herokuapp.com/predict", {method: "POST", body: formData})  
    .then(response => response.json())
    .then(data => console.log(data));
    */
    return fetch("https://cpms-restapi.herokuapp.com/predict", {method: "POST", body: formData})  
    .then(response => response.json())
    .then(data => {return data});
    
}

$(document).on('click', '#predict-btn',async function() 
{
    $('.progress-bar').show();
    $("#prediction-list").empty();
    let res = await get_response_from_API();
    $('.progress-bar').hide();
    if(res['success'] == true)
    {
        for(var i = 0; i < 5; i ++)
        {
            $("#prediction-list").append(`<li>${res['predictions'][i]}: ${res['probs'][i].toFixed(6)}</li>`);
        }
    }
    else
    {
        $("#prediction-list").append('<h3>Error : It looks like something was wrong with your data.</h3>');
    }
});
