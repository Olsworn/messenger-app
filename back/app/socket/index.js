const socketIo = require('socket.io');

function initSocket(httpInstance) {

    const io = socketIo.listen(httpInstance, {
        path: '/socket',
    });

    let currentRoomId = 1;

    io.on('connection', (socket) => {
        console.log('Hello new user');

        const userName = socket.handshake.query.username;
        let ownRoomId;

        if (socket.handshake.query.roomId) {
            socket.join(socket.handshake.query.roomId);
            ownRoomId = socket.handshake.query.roomId
        } else {
            socket.join(currentRoomId);
            currentRoomId += 1;
            ownRoomId = currentRoomId;
        }

        socket.on('send_message', (payload) => {
            socket.to(ownRoomId).emit('receive_message', payload);
        });

        socket.on('disconnecting', () => {
            socket.to(ownRoomId).emit('user_left', userName);
        });

        socket.emit('current_room', currentRoomId);
    });
};

module.exports = { initSocket };