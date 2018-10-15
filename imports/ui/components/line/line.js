import React, {Component} from "react";
import classnames from "classnames";

import "./line.scss";

export default class Line extends Component {

    render() {
        let classes = ["line"];
        classes.push(this.props.className);
        const lineClassName = classnames(classes);
        return (
            <div className={lineClassName}>

            </div>
        )
    }
}