
var $logContainer = $('.log-container');

//Spawn Logs
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

//Clear logs out of screen
setInterval(function(){

  var lastRow = $logContainer.find('.row:last-child');
  console.log(lastRow);

  if(lastRow.offset().top > window.outerHeight){

    lastRow.remove();

  }

}, 1000);

//Die if skip log
setInterval(function(){

  var lastRow = $logContainer.find('.row:last-child');
  var children = lastRow.children();

  if(lastRow.offset().top > window.outerHeight){

    for(i=0;i<children.length;i++){

      if($(children[i]).hasClass('target')){

        alert('u dood');

      }

    }

  }

}, 1000);
