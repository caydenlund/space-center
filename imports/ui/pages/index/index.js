import React, {Component} from 'react';

import "./index.scss";

import Button from "../../components/button/button";

export default class Index extends Component {
    goFullscreen() {
        // noinspection JSCheckFunctionSignatures
        document.body.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }

    render() {
        let fullScreenButton = [];
        // noinspection JSUnresolvedVariable
        if (!!(document.body.webkitRequestFullScreen) && !((window.fullScreen) ||
            (window.innerWidth === screen.width && window.innerHeight === screen.height))) {
            fullScreenButton = (
                <Button id={"fullscreen-btn"} onClick={this.goFullscreen.bind(this)} className={"warning"}>
                    Go fullscreen
                </Button>
            );
        }
        return (
            <div id="IndexPage">
                <h1 id={"title"} className={"centered"}>Space Server</h1>
                {fullScreenButton}
            </div>
        );
    }
}