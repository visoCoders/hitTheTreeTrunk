$(function () {
    "use strict";
 
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
 
    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        console.log($('<p>', { text: 'Sorry, but your browser doesn\'t '
                                    + 'support WebSockets.'} ));
        input.hide();
        $('span').hide();
        return;
    }
 
    // open connection
    var connection = new WebSocket('ws://localhost:1337'); //192.168.0.227
 
    connection.onopen = function () {
        
    };
 
    connection.onerror = function (error) {
        // just in there were some problems with conenction...
        console.log($('<p>', { text: 'Sorry, but there\'s some problem with your '
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
    connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        try {
            var json = JSON.parse(message.data);
            var player = JSON.parse(json.data.utf8Data);
            console.log(player.score);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }
 
        console.log(json);
    };
 
    
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
     * Display player info.
     */
    function addMessage(player) { 
        content.prepend();
    }
});