import React, {Component} from "react";

import "./popup.scss";

export default class Popup extends Component {
    render() {
        return (
            <div className={"popup"} name={this.props.name}>
                <div className={"background"} onClick={() => {
                    $(".popup").css("display", "none");
                }}>
                </div>
                <div className={"inner"}>
                    <div className={"title"}>
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