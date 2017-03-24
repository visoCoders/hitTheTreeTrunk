
var $logContainer = $('.log-container');

setInterval(function(){

  Math.floor((Math.random() * 6) + 1);

  $logContainer.prepend('');

}, 500);
