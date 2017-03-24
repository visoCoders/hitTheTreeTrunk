
var $logContainer = $('.log-container');

setInterval(function(){

  var randomNum = Math.floor((Math.random() * 6) + 1);
  var row = '<div class="row clearfix">';

  for(i=1;i<=5;i++){
    row += '<div class="log '+((randomNum == i)?'target':'')+((randomNum == 0)?'bad':'')'"></div>';
  }
  row += "</div>";

  $logContainer.prepend(row);

}, 1000);


setInterval(function(){

  //Clearing logs out of screen
  var lastRow = $logContainer.find('.row:last-child');
  console.log(lastRow);

  if(lastRow.offset().top > window.outerHeight){

    lastRow.remove();

  }

}, 1000);
