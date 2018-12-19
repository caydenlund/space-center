import React, {Component} from 'react';
import socket from "../../../startup/client/socket";

import Button from "../../components/button/button";

export default class FlightDirector extends Component {
    broadcast(name, data) {
        socket.emit("broadcast", {name, data});
    }

    render() {
        return (
            <div id={"flightDirector"}>
                <h1 className={"centered"}>Flight Director</h1>
                <Button onClick={() => {
                    this.broadcast("station.shake", 500);
                    this.broadcast("mvs.shake", 500);
                }}>Test</Button>
            </div>
        );
    }
}