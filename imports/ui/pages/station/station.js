import React, {Component} from "react";
import {withTracker} from 'meteor/react-meteor-data';
import {Session} from "meteor/session";
import {FlowRouter} from 'meteor/kadira:flow-router';
import {_} from "meteor/underscore";
import socket from "../../../startup/client/socket";

// Import API
import Constants from "../../../api/constants/constants";

// Import screens
import LoginScreen from "../../screens/login/login";
import NotFoundScreen from "../../screens/notFound/notFound";

// Import components
import Line from "../../components/line/line";

import "./station.scss";

class Station extends Component {
    componentDidMount() {
        socket.on("station.shake", (data) => {
            let magnitude = data;
            let station = $("#Station");

            const getRandom = (magnitude) => {
                return (magnitude) - 2 * magnitude * Math.random();
            };

            const keyframe = (magnitude) => {
                let blur = "blur(" + magnitude / 10 + "px)";
                let translate = "translate(" + getRandom(magnitude / 4) + "px, " + getRandom(magnitude / 4) + "px)";
                station.css("filter", blur);
                station.css("transform", translate);
                magnitude /= 1.8;
                if (magnitude > 1) {
                    requestAnimationFrame(() => {
                        keyframe(magnitude)
                    });
                } else {
                    station.css("filter", "blur(0)");
                    station.css("transform", "translate(0, 0)");
                }
            };
            keyframe(magnitude);
        });
    }

    getScreen(screen) {
        let renderedScreen = "";
        switch (screen) {
            case "Login":
                renderedScreen = (<LoginScreen/>);
                break;
            default:
                renderedScreen = (<NotFoundScreen/>);
                break;
        }
        return renderedScreen;
    }

    getHidden(item) {
        Session.setDefault("hidden", false);
        return ((item === "screenList") ? !this.props.hidden : this.props.hidden) ? "hidden" : "";
    }

    setHidden() {
        Session.set("hidden", false);
    }

    render() {
        const station = this.props.station;
        const screen = this.props.screen;
        const renderedScreen = this.getScreen(screen);
        return (
            <div id={"Station"}>
                <StationHeader station={station} screen={screen} className={this.getHidden(("header"))}/>
                <ScreenList station={station} className={this.getHidden("screenList")}/>
                <div id={"screen"} className={this.getHidden("screen")}>
                    {renderedScreen}
                    <div id={"hiddenTarget"} onClick={this.setHidden}>
                    </div>
                </div>
            </div>
        );
    }
}

class StationHeader extends Component {
    setHidden(hidden) {
        Session.set("hidden", hidden);
    }

    render() {
        return (
            <div id={"StationHeader"} className={this.props.className}>
                <div className={"left station"}>
                    {this.props.station}
                </div>
                <div className={"ship"}>
                    {Constants.shipName}
                </div>
                <div className={"right screen"} onClick={() => {
                    this.setHidden(true)
                }}>
                    <div>
                        {this.props.screen}
                    </div>
                </div>
                <Line/>
            </div>
        );
    }
}

class ScreenList extends Component {
    selectScreen(screen) {
        const route = FlowRouter.current();
        FlowRouter.go("Station", {station: route.params.station, screen});
        Session.set("hidden", false);
    }

    getScreens(screenList) {
        let screens = [];
        for (let screen of screenList) {
            screens.push(
                <div className={"screen"} key={screen.name} onClick={() => {
                    this.selectScreen(screen.name);
                }}>{screen.name}</div>
            );
        }
        return screens;
    }

    screenList(station) {
        let currStation = _.findWhere(Constants.Stations, {name: station});
        if (typeof currStation == "undefined") {
            console.log("Invalid station: " + station);
            return [];
        }
        return currStation.screens;
    }

    render() {
        return (
            <div id={"ScreenList"} className={this.props.className}>
                {this.getScreens(this.screenList(this.props.station))}
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        hidden: Session.get("hidden")
    }
})(Station);