import { WebApp } from "meteor/webapp";
import socketIO from "socket.io";

const io = socketIO(WebApp.httpServer);

io.on("connection", (socket) => {
    socket.on("broadcast", (data) => {
        switch (data.name) {
            case "station.shake":
                io.emit("station.shake", data.data);
                break;
            case "mvs.shake":
                io.emit("mvs.shake", data.data);
                break;
            default:
                return;
        }
    });
});
