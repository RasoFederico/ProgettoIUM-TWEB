/**
 * L'istanza di Socket.IO server.
 *
 *  Gestisce gli eventi principali:
 *  - create or join: permette a un client di creare o unirsi a una stanza specifica.
 *  - chat: inoltra i messaggi di chat a tutti i client nella stanza.
 *  - disconnect: logga la disconnessione di un client.
 *
 * @param io
 */
exports.init = function(io) {
    io.sockets.on('connection', function (socket) {
        try {
            socket.on('create or join', function (room, userId) {
                socket.join(room);
                io.sockets.to(room).emit('joined', room, userId);
            });

            socket.on('chat', function (room, userId, chatText) {
                io.sockets.to(room).emit('chat', room, userId, chatText);
            });

            socket.on('disconnect', function(){
                console.log('someone disconnected');
            });
        } catch (e) {
        }
    });
}