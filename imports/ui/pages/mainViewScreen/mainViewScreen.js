import React, {Component} from "react";
import {withTracker} from 'meteor/react-meteor-data';
import {Session} from "meteor/session";
// Import API
import Constants from "../../../api/constants/constants";
// Import screens
import SplashMVS from "./screens/splashMVS";
// Import components
import Line from "../../components/line/line";

import "./mainViewScreen.scss";

class MainViewScreen extends Component {
    getScreen() {
        let renderedScreen = <SplashMVS/>;
        switch (this.props.screen) {
            default:
                Session.set("screen", null);
                break;
        }
        return renderedScreen;
    }

    getTransparent(screen) {
        return (screen === "Radar");
    }

    render() {
        return (
            <div id={"MainViewScreen"}>
                <MainViewScreenHeader screen={this.props.screen} transparent={this.getTransparent(this.props.screen)}/>
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
            <div id={"MainViewScreenHeader"} className={(this.props.transparent) ? "transparent" : ""}>
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
        )
    }
}

export default withTracker(() => {
    return {
        screen: Session.get("screen")
    }
})(MainViewScreen);