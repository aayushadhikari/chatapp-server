const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const PORT = process.env.PORT || 3005;
const router = require("./router");

const app = express();
app.use(router);
const server = http.createServer(app);
const io = socketio(server);
io.on("connection", (socket) => {
  console.log("New connection received");

  socket.on("join", ({ name, room }, callback) => {
    console.log(name);
  });

  socket.on("disconnect", () => {
    console.log("User left");
  });
});
server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
