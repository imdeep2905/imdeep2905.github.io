$("#csv-selector").change(function ()
{
    let reader = new FileReader();
    reader.onload = function ()
    {
        ;
    }
    let file = $("#csv-selector").prop('files')[0];
    reader.readAsDataURL(file);
});

let model;
(async function()
{
    model = await tf.loadLayersModel('Models/3D/model.json');
    $('.progress-bar').hide();
    console.log("bitch-loading!!");
})();