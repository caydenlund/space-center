import React, { Component } from "react";

import "./Popup.scss";

export default class Popup extends Component {
    escPress(event) {
        if (event.keyCode === 27) {
            this.hide();
        }
    }

    hide() {
        $("[name=\"" + this.props.name + "\"]").remove();
    }

    componentDidMount() {
        document.addEventListener("keydown", this.escPress.bind(this), false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.escPress.bind(this), false);
    }

    render() {
        return (
            <div className={"popup "} name={this.props.name}>
                <div className={"popup-background"} onClick={this.hide.bind(this)}>
                </div>
                <div className={"popup-inner"}>
                    <div className={"js-exitButton"} onClick={this.hide.bind(this)}>
                        &times;
                    </div>
                    <div className={"popup-title"}>
                        {this.props.title}
                    </div>
                    <div className={"popup-content"}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
