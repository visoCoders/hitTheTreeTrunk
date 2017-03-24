

var $logContainer = $('.log-container');

setInterval(function(){

  var randomNum = Math.floor((Math.random() * 6));
  var badNum = Math.floor((Math.random() * 6));
  var row = '<div class="row clearfix">';

<<<<<<< HEAD
  for(i=1;i<=5;i++){

    row += '<div class="log '+((randomNum == i)?'target ':'')+((randomNum == badNum)?'bad':'')+'"></div>';

=======
  var outputtedABadOne = false;
  for(i=1;i<=5;i++){
    row += '<div class="log clearfix '+((randomNum == i)?'target ':'')+((randomNum == badNum && !outputtedABadOne)?'bad':'')+'"></div>';
    outputtedABadOne = (randomNum == badNum);
>>>>>>> a922b621b72315e272a1fd8abb29300ab92704bf
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
