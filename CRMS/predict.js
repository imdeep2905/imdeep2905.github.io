$("#csv-selector").change(function ()
{
    console.log("csvselect");
    let reader = new FileReader();
    reader.onload = function () {
        let dataURL = reader.result;
        $("#prediction-list").empty();
    }
    let file = $("#csv-selector").prop("files")[0];
    reader.readAsDataURL(file);
    console.log(file);
});

let model;

(async function()
{
    //model = await tf.loadLayersModel('Models/1D/model.json');
    $('.progress-bar').hide();
    //console.log(model.summary());
})();

$("#predict-btn").click(async function () 
{
    console.log("called");
    var new_csv = d3.csv.parseRows(file).slice(1).map(function (d) {
        return { date: d[0], one: d[1], two: d[2], three: d[3] };
    })
    console.log(new_csv);
});
