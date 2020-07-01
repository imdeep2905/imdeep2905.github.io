let model, file;
let CLASSES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
           'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
           'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
           'U', 'V', 'W', 'X', 'Y', 'Z']
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

function process_csv() 
{
    take = ['ACCELEROMETER X (m/s²)',
    'ACCELEROMETER Y (m/s²)',
    'ACCELEROMETER Z (m/s²)',
    'LINEAR ACCELERATION X (m/s²)',
    'LINEAR ACCELERATION Y (m/s²)',
    'LINEAR ACCELERATION Z (m/s²)',
    'GYROSCOPE X (rad/s)',
    'GYROSCOPE Y (rad/s)',
    'GYROSCOPE Z (rad/s)',
    'MAGNETIC FIELD X (μT)',
    'MAGNETIC FIELD Y (μT)',
    'MAGNETIC FIELD Z (μT)'];
    var data = file.split("\n");
    for(var i = 0; i < data[0].split(",").length; i++)
    {
        let ok = 0;
        for(var j = 0; j < take.length; j ++)
        {
            if(data[0].split(",")[i] == take[j])
            {
                ok = 1;
                break;
            }
        }
        if(ok == 0)
        {
            for(var j = 0; j < data.length; j ++)
            {
                data[j] = data[j].split(",");
                data[j].splice(i, 1);
                data[j] = data[j].join(",");
            }
            i = -1;
        }
    }
    data.shift();
    var temp = data;
    data = [];
    for(var i = 0; i < temp.length; i ++)
    {
        var subdata = [[1]];
        subdata.shift();
        for(var j = 0; j < temp[i].split(",").length; j ++)
        {
            subdata.push(parseFloat(temp[i].split(",")[j]));
        }
        data.push(subdata);
    }
    return data;
}

$(document).on('click', '#predict-btn',async function() 
{

    var processed = process_csv();
    processed = [processed];
    var X = tf.tensor3d(processed);
    //Minmax scaling
    X.sub(X.min()).div(X.max().sub(X.min()));
    X.mul(X, 2);
    X.add(-1);
    //Std scaler
    X.sub(X, X.mean()).div(tf.moments(X).variance.sqrt());
    let predictions = await model.predict(X).data();
    let top5 = Array.from(predictions)
    .map(function (p, i) {
        return {
            probability: p,
            className: CLASSES[i]
        };
    }).sort(function (a, b) {
        return b.probability - a.probability;
    }).slice(0, 5);

    $("#prediction-list").empty();
    top5.forEach(function (p) {
        $("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(6)}</li>`);
    });
    console.log(predictions);
    console.log(X);
});

(async function()
{
    model = await tf.loadLayersModel('Models/3D/model.json');
    $('.progress-bar').hide();
    console.log(model.summary());
})();
