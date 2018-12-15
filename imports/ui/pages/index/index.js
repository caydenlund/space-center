import React, {Component} from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';

import "./index.scss";

import Button from "../../components/button/button";
import ButtonRow from "../../components/button-row/button-row";

export default class Index extends Component {
    fullScreenButton() {
        let fullScreenButton = [];
        // noinspection JSUnresolvedVariable
        // noinspection JSUnresolvedVariable
        if (!!(document.body.webkitRequestFullScreen) && !((window.fullScreen) ||
            (window.innerWidth === screen.width && window.innerHeight === screen.height))) {
            fullScreenButton = (
                <Button id={"fullscreen-btn"} onClick={this.goFullscreen.bind(this)} className={"warning"}>
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

    navigate(page, params) {
        FlowRouter.go(page, params);
    }

    render() {
        return (
            <div id="IndexPage">
                <h1 id={"title"} className={"centered"}>Space Server</h1>
                <ButtonRow id={"stations"}>
                    <Button className={"col c4"} onClick={() => {
                        this.navigate("Station", {station: "Weapons"})
                    }}>
                        Station 1
                    </Button>
                    <Button className={"col c4"}>
                        Station 2
                    </Button>
                    <Button className={"col c4"}>
                        Station 3
                    </Button>
                </ButtonRow>
                <ButtonRow id={"pages"}>
                    <Button className={"col c6"} onClick={() => {
                        this.navigate("Page", {page: "fd"})
                    }}>
                        Flight Director
                    </Button>
                    <Button className={"col c6"} onClick={() => {
                        this.navigate("Page", {page: "mvs"})
                    }}>
                        Main View Screen
                    </Button>
                </ButtonRow>
                {this.fullScreenButton()}
            </div>
        );
    }
}