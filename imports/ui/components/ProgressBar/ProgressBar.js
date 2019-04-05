import React, { Component } from "react";
import classnames from "classnames";

import "./ProgressBar.scss";

// noinspection JSUnusedGlobalSymbols
export default class ProgressBar extends Component {
    innerBar() {
        let classes = ["inner"];
        classes.push(this.props.color);
        const className = classnames(classes);
        return (
            <div className={className}
                 style={{ width: this.props.width + "%" }}>{this.props.children}</div>
        );
    }

    render() {
        let classes = ["progressBar"];
        classes.push(this.props.className);
        const className = classnames(classes);
        return (
            <div className={className}>
                {this.innerBar()}
            </div>
        );
    }
}
