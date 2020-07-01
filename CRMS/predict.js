let model, file;
$(document).on('change', '#csv-selector', function() 
{
    var reader = new FileReader();
    reader.onload = processFile(this.files[0]);
    reader.readAsText(this.files[0]);
    get_csv(this.files[0]);
});

function processFile(theFile)
{
    return function(e) 
    { 
        var theBytes = e.target.result; //.split('base64,')[1]; 
        file = theBytes;
    }
}
function get_csv(url)
{
var data;
	$.ajax({
	  type: "GET",  
	  url: url,
	  dataType: "text",       
	  success: function(response)  
	  {
		data = $.csv.toArrays(response);
		generateHtmlTable(data);
	  }   
	});
}
function generateHtmlTable(data) {
    var html = '<table  class="table table-condensed table-hover table-striped">';
 
      if(typeof(data[0]) === 'undefined') {
        return null;
      } else {
		$.each(data, function( index, row ) {
		  //bind header
		  if(index == 0) {
			html += '<thead>';
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<th>';
				html += colData;
				html += '</th>';
			});
			html += '</tr>';
			html += '</thead>';
			html += '<tbody>';
		  } else {
			html += '<tr>';
			$.each(row, function( index, colData ) {
				html += '<td>';
				html += colData;
				html += '</td>';
			});
			html += '</tr>';
		  }
		});
		html += '</tbody>';
		html += '</table>';
		alert(html);
		document.getElementById('uploaded-data').innerText = html;
	  }
    }	
    
$(document).on('click', '#predict-btn', function() 
{
    var parsed = d3.csvParse(file);
    console.log(parsed);
});

(async function()
{
    model = await tf.loadLayersModel('Models/1D/model.json');
    $('.progress-bar').hide();
    console.log(model.summary());
})();
