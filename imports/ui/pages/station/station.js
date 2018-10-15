import React, {Component} from "react";
import {withTracker} from 'meteor/react-meteor-data';
import {Session} from "meteor/session";

// Import API
import Stations from "../../../api/stations/stations";

// Import screens
import LoginScreen from "../../screens/login/login";

// Import components
import Line from "../../components/line/line";

import "./station.scss";

class Station extends Component {
    getScreen(screen) {
        let renderedScreen = "";
        switch (screen) {
            case "Login":
                renderedScreen = (<LoginScreen/>);
                break;
            default:
                renderedScreen = (<h1>Screen not found</h1>);
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
                    Ship
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
                <div className={"screen"} key={screen} onClick={() => {
                    this.selectScreen(screen);
                }}>{screen}</div>
            );
        }
        return screens;
    }

    screenList(station) {
        if (!Stations[station]) {
            console.log("Invalid station: " + station);
            return [];
        }
        return Stations[station].screens;
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