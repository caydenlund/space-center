import React, {Component} from "react";

import {withTracker} from "meteor/react-meteor-data";
import socket from "../../../startup/client/socket";

import Systems from "../../../api/systems/systems";

import "./flightDirector.scss";

// Import cards
import CardFD from "./cards/cardFD";
import SystemsFD from "./cards/systemsFD";

class FlightDirector extends Component {
    broadcast(name, data) {
        socket.emit("broadcast", {name, data});
    }

    render() {
        return (
            <div id={"FlightDirector"}>
                <div className={"row"}>
                    <SystemsFD systems={this.props.systems}/>
                    <CardFD/>
                    <CardFD/>
                    <CardFD/>
                    <CardFD/>
                </div>
                <div className={"row"}>
                    <CardFD/>
                    <CardFD/>
                    <CardFD/>
                    <CardFD/>
                    <CardFD/>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("systems");

    return {
        systems: Systems.find().fetch()
    }
})(FlightDirector);