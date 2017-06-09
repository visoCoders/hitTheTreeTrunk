$(function () {
    "use strict";

    // for better performance - to avoid searching in DOM
    var content = $('#content');
    var input = $('#input');
    var status = $('#status');

    // my color assigned by the server
    var myColor = false;
    // my name sent to the server
    var myName = false;

    //game settings
    var scoreAmount = 0;
    var score = document.querySelector('.score');
    var player = {
        name: '',
        score: 0,
        dead: false
    }

    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;

    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        content.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
                                    + 'support WebSockets.'} ));
        input.hide();
        $('span').hide();
        return;
    }

    // open connection
    var connection = new WebSocket('ws://localhost:1337'); //192.168.0.227

    connection.onopen = function () {
        $('.loginContainer').addClass('show');
        $('#btnEnterGame').click(function(){
            var name = $('#gameUsername').val();
            if(name == null || name == ''){
                console.log('name cant be empty');
                $('.login .error').text("Name can't be empty");
            }else{
                player.name = name;
                status.text(name);
                $('.loginContainer').removeClass('show');
            }
        });
        //var naam = prompt('u moet een username ingeven','');
        // if(naam !=null){
        //     console.log(naam);
        //     player.name = naam;

        // }
        // first we want users to enter their names
        
    };

    connection.onerror = function (error) {
        // just in there were some problems with conenction...
        content.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
                                    + 'connection or the server is down.' } ));
    };

    connection.onclose = function(connection) {
        if (myName !== false && myColor !== false) {
            console.log((new Date()) + " Peer "
                + connection.remoteAddress + " disconnected.");
            // loop to the clients and compare remote address to be removed
           for (var i = 0; i < clients.length; i ++) {
                if (connection.remoteAddress == clients[i].remoteAddress) { //compare remote address to remove from the disconnecting client
                     clients.splice(i, 1);
                }
           }
            // push back user's color to be reused by another user
            colors.push(myColor);
        }
    };

    // most important part - incoming messages
    /*
    connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }

        // NOTE: if you're not sure about the JSON structure
        // check the server source code above
        if (json.type === 'color') { // first response from the server with user's color
            myColor = json.data;
            status.text(myName + ': ').css('color', myColor);
            input.removeAttr('disabled').focus();
            // from now user can start sending messages
        } else if (json.type === 'history') { // entire message history
            // insert every single message to the chat window
            for (var i=0; i < json.data.length; i++) {
                addMessage(json.data[i].author, json.data[i].text,
                           json.data[i].color, new Date(json.data[i].time));
            }
        } else if (json.type === 'message') { // it's a single message
            input.removeAttr('disabled'); // let the user write another message
            addMessage(json.data.author, json.data.text,
                       json.data.color, new Date(json.data.time));
        } else {
            console.log('Hmm..., I\'ve never seen JSON like this: ', json);
        }
    };
    */

    /**
     * Send mesage when user presses Enter key
     */
   /* input.keydown(function(e) {

        if (e.keyCode === 13) {
            var msg = $(this).val();
            player.name = msg;
            console.log(player);
            status.text('Welcome ' + player.name);
            if (!msg) {
                return;
            }
            // send the message as an ordinary text
            connection.send(player);
            $(this).val('');
            // disable the input field to make the user wait until server
            // sends back response
            input.attr('disabled', 'disabled');
            input.hide();

            // we know that the first message sent from a user their name
            if (myName === false) {
                myName = msg;
            }

        }

    });*/

    score.innerHTML = 'Score: ' + scoreAmount;

    $('.log-container').on('click', function(e){

        if($(e.target).hasClass('target') && !$(e.target).hasClass('clicked')){

            $(e.target).addClass('clicked');
            addScore(5);
            document.querySelector('.goodSound').play();
            $(e.target).css("opacity" , 0.2);
            console.log(e.target);
        }else if($(e.target).hasClass('bad')){
            dead();
        }
    });

    function dead(){
        document.querySelector('.deadSound').play();
        score.innerHTML = 'You died! Score: ' + scoreAmount;
        player.score = scoreAmount;
        player.dead = true;
        scoreAmount = 0;
        connection.send(JSON.stringify(player));
        if(confirm('YOU DIED! Score: ' + scoreAmount + ' \n Do you want to play again?') == true){
            location.reload();
        }else{

        }
    }

    function addScore(points){
        scoreAmount = scoreAmount += points;
        score.innerHTML = 'Score: ' + scoreAmount;
        player.score = scoreAmount;

        $('.added-score').fadeIn(100).fadeOut(100);

        connection.send(JSON.stringify(player));
    }

    /**
     * This method is optional. If the server wasn't able to respond to the
     * in 3 seconds then show some error message to notify the user that
     * something is wrong.
     */
    setInterval(function() {
        if (connection.readyState !== 1) {
            status.text('Error');
            input.attr('disabled', 'disabled').val('Unable to comminucate '
                                                 + 'with the WebSocket server.');
        }
    }, 3000);

    /**
     * Add message to the chat window
     */
    function addMessage(author, message, color, dt) {
        content.prepend('<p><span style="color:' + color + '">' + author + '</span> @ ' +
             + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
             + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
             + ': ' + message + '</p>');
    }
});
