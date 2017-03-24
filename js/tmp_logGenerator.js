
var $logContainer = $('.log-container');

setInterval(function(){

  var randomNum = Math.floor((Math.random() * 6) + 1);
  var row = '<div class="row">';

  for(i=1;i<=5;i++){
    row += '<div class="trunk log '+((randomNum == i)?'target':'')+'"></div>';
  }
  row += "</div>";

  $logContainer.prepend(row);

  //Clearing logs out of screen
  var allExistingLogs = document.querySelectorAll('.trunk');

  for(i=0;i<allExistingLogs.length;i++){

    console.log(allExistingLogs[i]);


  }

}, 1000);
