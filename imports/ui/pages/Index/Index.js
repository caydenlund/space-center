import React, { Component } from "react";
import { FlowRouter } from "meteor/kadira:flow-router";
import Constants from "../../../api/Constants/Constants";

import "./Index.scss";

import Button from "../../components/Button/Button";
import ButtonRow from "../../components/ButtonRow/ButtonRow";

export default class Index extends Component {
    static navigate(page, params) {
        FlowRouter.go(page, params);
    }

    fullScreenButton() {
        let fullScreenButton = [];
        if (!!(document.body.webkitRequestFullScreen) && !((window.fullScreen) ||
            (window.innerWidth === screen.width && window.innerHeight === screen.height))) {
            fullScreenButton = (
                <Button id={"fullscreen-btn"} onClick={this.goFullscreen.bind(this)}
                        className={"warning"}>
                    Go fullscreen
                </Button>
            );
        }

        return fullScreenButton;
    }

    goFullscreen() {

        // noinspection JSUnresolvedVariable
        document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);

        setTimeout(() => {
            this.forceUpdate();
        }, 100);
    }

    stationList() {
        let stations = [];
        Constants.Stations.forEach((station) => {
            stations.push(
                <Button className={"col c2"} key={station.name} onClick={() => {
                    Index.navigate("Station", { station: station.name });
                }}>
                    {station.name}
                </Button>
            );
        });
        return stations;
    }

    render() {
        return (
            <div id="IndexPage">
                <h1 id={"title"} className={"centered"}>Space Server</h1>
                <ButtonRow id={"stations"}>
                    {this.stationList()}
                </ButtonRow>
                <ButtonRow id={"pages"}>
                    <Button className={"col c6"} onClick={() => {
                        Index.navigate("Page", { page: "fd" });
                    }}>
                        Flight Director
                    </Button>
                    <Button className={"col c6"} onClick={() => {
                        Index.navigate("Page", { page: "mvs" });
                    }}>
                        Main View Screen
                    </Button>
                </ButtonRow>
                {this.fullScreenButton()}
            </div>
        );
    }
}
