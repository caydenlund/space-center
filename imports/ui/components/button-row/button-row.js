import React, {Component} from 'react';
import classnames from "classnames";

import "./button-row.scss";

export default class ButtonRow extends Component {
    render() {
        let classes = ["btn-row"];
        classes.push(this.props.className);
        const className = classnames(classes);
        return (
            <div className={className} id={this.props.id}>
                {this.props.children}
            </div>
        );
    }
}