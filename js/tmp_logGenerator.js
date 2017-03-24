
var $logContainer = $('.log-container');

setInterval(function(){

  var randomNum = Math.floor((Math.random() * 6) + 1);

  var row = "";
  row += "<div class='log-container'>";

  for(i=1;i<=5;i++){

    row += "<div class='trunk log" + i + "'></div>";

    if(randomNum == i){

      $('.trunk .log' + i).addClass('bad');

    }

  }


  $logContainer.prepend('');

}, 500);


row += "<div class='trunk log1'></div>";
row += "<div class='trunk log2'></div>";
row += "<div class='trunk log3'></div>";
row += "<div class='trunk log4'></div>";
row += "<div class='trunk log5'></div>";
row += "</div>";
