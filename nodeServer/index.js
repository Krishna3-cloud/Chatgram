// Node server which will handle socket io connection
const io = require('socket.io')(8000)
const users = {};

io.on('connection', socket => {
    socket.on('New-User-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('User-joined', name);
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });

    socket.on('disconnet', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})