
var $logContainer = $('.log-container');

setInterval(function(){

  var randomNum = Math.floor((Math.random() * 6) + 1);
  var row = '<div class="row">';

  for(i=1;i<=5;i++){
    row += '<div class="trunk log '+((randomNum == i)?'target':'')+'"></div>';
  }
  row += "</div>";

  $logContainer.prepend(row);

}, 1000);
