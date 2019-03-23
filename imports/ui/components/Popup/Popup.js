import React, {Component} from "react";

import "./Popup.scss";

export default class Popup extends Component {
    render() {
        return (
            <div className={"Popup"} name={this.props.name}>
                <div className={"background"} onClick={() => {
                    $(".Popup").css("display", "none");
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