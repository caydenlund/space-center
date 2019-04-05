import React, { Component } from "react";
import { withTracker } from 'meteor/react-meteor-data';
import { Session } from "meteor/session";
import socket from "../../../startup/client/socket";

// Import API
import Constants from "../../../api/constants/constants";

// Import screens
import SplashMVS from "./screens/SplashMVS";

// Import components
import Line from "../../components/Line/Line";

import "./MainViewScreen.scss";

class MainViewScreen extends Component {
    static getTransparent(screen) {
        return (screen === "Radar");
    }

    componentDidMount() {
        socket.on("mvs.shake", (data) => {
            let magnitude = data;
            let mvs = $("#MainViewScreen");

            const getRandom = (magnitude) => {
                return (magnitude) - 2 * magnitude * Math.random();
            };

            const keyframe = (magnitude) => {
                let blur = "blur(" + magnitude / 10 + "px)";
                let translate = "translate(" + getRandom(magnitude / 4) + "px, " +
                    getRandom(magnitude / 4) + "px)";
                mvs.css("filter", blur);
                mvs.css("transform", translate);
                magnitude /= 1.8;
                if (magnitude > 1) {
                    requestAnimationFrame(() => {
                        keyframe(magnitude);
                    });
                } else {
                    mvs.css("filter", "blur(0)");
                    mvs.css("transform", "translate(0, 0)");
                }
            };
            keyframe(magnitude);
        });
    }

    getScreen() {
        let renderedScreen = <SplashMVS/>;
        switch (this.props.screen) {
            default:
                Session.set("screen", null);
                break;
        }
        return renderedScreen;
    }

    render() {
        return (
            <div id={"MainViewScreen"}>
                <MainViewScreenHeader
                    screen={this.props.screen}
                    transparent={MainViewScreen.getTransparent(this.props.screen)}/>
                <div id={"screen"}>
                    {this.getScreen()}
                </div>
            </div>
        );
    }
}

class MainViewScreenHeader extends Component {
    render() {

        // noinspection JSUnresolvedVariable
        return (
            <div id={"MainViewScreenHeader"}
                 className={(this.props.transparent) ? "transparent" : ""}>
                <div className={"outer left"}>
                    <div className={"parallelogram"}>
                    </div>
                    <Line/>
                </div>
                <div className={"outer right"}>
                    <div className={"parallelogram"}>
                    </div>
                    <Line/>
                </div>
                <div className={"inner"}>
                    <div className={"ship"}>
                        {Constants.shipName}
                    </div>
                    <div className={"right screen"}>
                        {this.props.screen}
                    </div>
                    <Line/>
                </div>
            </div>
        );
    }
}

export default withTracker(() => {
    return {
        screen: Session.get("screen")
    };
})(MainViewScreen);
