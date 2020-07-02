let file;

$(document).on('change', '#csv-selector', function() 
{
    var reader = new FileReader();
    reader.onload = processFile(this.files[0]);
    reader.readAsText(this.files[0]);
    generateHtmlTable();
});

function processFile(theFile)
{
    return function(e) 
    { 
        var theBytes = e.target.result; //.split('base64,')[1]; 
        file = theBytes;
    }
}

function generateHtmlTable() 
{
    ;
}	


$(document).on('click', '#predict-btn',async function() 
{
    $.ajax({
        type: "POST",
        url: "https://cpms-restapi.herokuapp.com/predict",
        data: {
          csv : file
        },
        success: function(data) {
          console.log(data);
        },
        dataType: "json"
      });
});

(async function()
{
    $('.progress-bar').hide();
})();
