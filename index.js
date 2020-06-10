const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 3005;
const router = require("./router");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const app = express();
app.use(router);
const server = http.createServer(app);
const io = socketio(server);
io.on("connection", (socket) => {
  console.log("New connection received");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name}, has joined!` });
    socket.join(users.room);
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    console.log("User left");
  });
});
server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
