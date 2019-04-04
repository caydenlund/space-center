import React, {Component} from "react";

import classnames from "classnames";

export default class CardFD extends Component {
    render() {
        return (
            <div className={classnames("card", this.props.className)}>
                <div className={"innerCard"}>
                    <div className={"title"}>
                        {this.props.name}
                    </div>
                    <div className={"content"}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}