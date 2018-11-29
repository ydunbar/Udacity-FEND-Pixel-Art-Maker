// Select color input
const colorPicker = $('#colorPicker');
    
// Select size input
const height = $('#inputHeight');
const width = $('#inputWidth');

const table = $('#pixelCanvas');

// set Flag for mouseup/mousedown
let isDown = false;

// When size is submitted by the user, call makeGrid()
$('#submit').on('click', function() {
  event.preventDefault();
  reset();
  makeGrid();
});

function makeGrid() {
	//nested for loop/2D array
for(let h = 0; h < height.val(); h++){
table.append('<tr></tr>');
	for (let w = 0; w < width.val(); w++){
		$('tr').last().append('<td></td>');
	}
}
}

//Reset grid
function reset() {
 table.children().remove()
}

//Assign true/false to isDown
table.on('mousedown', 'tr td', function(){
        isDown = true;
         });

table.on('mouseup', 'tr td', function(){
        isDown = false;
         });

//Set color selection as background-color of grid elements
table.on('mousedown mouseover', 'tr td', function(){
  if(isDown){
	$(this).css("background-color", colorPicker.val());
  }
});

//Double click to erase
table.on('dblclick', 'tr td', function()
{
 $(this).css('background-color', '#f1f1f1');
});

//save function
$("#save").click(function(){
  html2canvas($("#pixelCanvas"), {
    onrendered: function(canvas) {
      var imgData = canvas.toDataURL('image/png');
      var doc = new jsPDF('p', 'mm');
      doc.addImage(imgData, 'PNG', 100, 100);
      doc.save('My_Pixel_Art.pdf');
    }
  });
});