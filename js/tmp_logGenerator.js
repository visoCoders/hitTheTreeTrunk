
var $logContainer = $('.log-container');

setInterval(function(){

  var randomNum = Math.floor((Math.random() * 6));
  var row = '<div class="row">';

  var outputtedABadOne = false;

  for(i=1;i<=5;i++){

    var badNum = Math.floor((Math.random() * 6));
    
    row += '<div class="log '+((randomNum == i)?'target ':'')+((randomNum == badNum && !outputtedABadOne)?'bad':'')+'"></div>';
    outputtedABadOne = (randomNum == badNum);

  }
  row += "</div>";

  $logContainer.prepend(row);

}, 950);


setInterval(function(){

  //Clearing logs out of screen
  var lastRow = $logContainer.find('.row:last-child');
  console.log(lastRow);

  if(lastRow.offset().top > window.outerHeight){

    lastRow.remove();

  }

}, 1000);
