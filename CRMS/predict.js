let model, file;
$(document).on('change', '#csv-selector', function() 
{
    let reader = new FileReader();
    reader.onload = function () 
    {
        let dataURL = reader.result;
        $("#prediction-list").empty();
    }
    file = $("#csv-selector").prop("files")[0];
    reader.readAsDataURL(file);
});
$(document).on('click', '#predict-btn', function() 
{
    var new_csv = d3.csvParseRows(document.getElementById('csv-selector').value);
    d3.csv(document.getElementById('csv-selector').value, function(err, data) {
        console.log(data)
        /*
          output:
          [
            { col1:'aaa1', col2:'aaa2', col3:'aaa3', col4:'aaa4' },
            { col1:'bbb1', col2:'bbb2', col3:'bbb3', col4:'bbb4' },
            { col1:'ccc1', col2:'ccc2', col3:'ccc3', col4:'ccc4' }
          ]
        */
      })
});

(async function()
{
    model = await tf.loadLayersModel('Models/1D/model.json');
    $('.progress-bar').hide();
    console.log(model.summary());
})();
