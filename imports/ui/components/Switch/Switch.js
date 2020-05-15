import React, { Component } from "react";
import classnames from "classnames";

import "./Switch.scss";

export default class Switch extends Component {
    render() {
        let classes = [ "switch-container" ];
        classes.push(this.props.className);
        if (this.props.enabled === true) {
classes.push("switch-enabled");
}
        let switchClassName = classnames(classes);
        return (
            <div className={switchClassName} id={this.props.id} onClick={this.props.onClick}>
                <div className={"switch-inner"}>
                </div>
            </div>
        );
    }
}
