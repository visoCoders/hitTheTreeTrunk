
var $logContainer = $('.log-container');

setInterval(function(){

  Math.floor((Math.random() * 6) + 1);

  $logContainer.prepend('');

}, 500);


var row ="<div class=.\"log-container\">
          <div class=\"trunk log1\"></div>
          <div class=\"trunk log2\"></div>
          <div class=\"trunk log3\"></div>
          <div class=\"trunk log4\"></div>
          <div class=\"trunk log5\"></div>
          </div>";
