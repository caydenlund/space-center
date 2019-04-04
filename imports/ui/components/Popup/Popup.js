import React, {Component} from "react";

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

    componentDidMount(){
        document.addEventListener("keydown", this.escPress.bind(this), false);
    }

    componentWillUnmount(){
        document.removeEventListener("keydown", this.escPress.bind(this), false);
    }

    render() {
        return (
            <div className={"Popup "} name={this.props.name}>
                <div className={"background"} onClick={this.hide.bind(this)}>
                </div>
                <div className={"inner"}>
                    <div className={"js-exitButton"} onClick={this.hide.bind(this)}>
                        &times;
                    </div>
                    <div className={"popupTitle"}>
                        {this.props.title}
                    </div>
                    <div className={"content"}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
