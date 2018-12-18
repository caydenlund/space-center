import {WebApp} from "meteor/webapp";
import socketIO from "socket.io";

const io = socketIO(WebApp.httpServer);

io.on("connection", (socket) => {
});