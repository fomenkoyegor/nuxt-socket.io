const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var users = require('./users')();
const m = (name, text, id) => ({name, text, id});


io.on('connection', socket => {
    console.log('IO Connected');

    socket.on('createMessage', (data, cb) => {
        if (!data.text) {
            return cb('not text empty')
        }
        const user = users.get(data.id);
        if (user) {
            io.to(user.room)
                .emit('newMessage', m(user.name, data.text, data.id))
        }
        cb()

    });

    socket.on("userJoined", (data, cb) => {
        if (!data.name || !data.room) {
            return cb("invalid data");
        }
        users.remove(socket.id);
        socket.join(data.room);
        users.add({
            id: socket.id,
            name: data.name,
            room: data.room
        });
        cb({userId: socket.id});
        io.to(data.room).emit('updateUsers', users.getByRoom(data.room));
        socket.emit("newMessage", m('admin', `welcome ${data.name}`));
        // socket.emit("newMessage", m('test', `test`));
        socket.broadcast.to(data.room)
            .emit("newMessage", m('admin', `user ${data.name} join`));
    });


    socket.on("userLeft", (id, cb) => {
        const user = users.remove(id);
        if (user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
            io.to(user.room)
                .emit("newMessage", m('admin', `user ${user.name} out`))
        }
        cb()
    });

    socket.on("disconnect", () => {
        const user = users.remove(socket.id);

        if (user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room));
            io.to(user.room)
                .emit("newMessage", m('admin', `user ${user.name} out`))
        }

    })


});

module.exports = {
    app,
    server
};
