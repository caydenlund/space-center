import React, {Component} from "react";

import classnames from "classnames";
import Constants from "../../../../api/constants/constants";

import CardFD from "./CardFD";
import Popup from "../../../components/Popup/Popup";

export default class SystemsFD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            systemPopups: []
        };
    }

    static createPopup(system) {
        return (
            <Popup key={system.name + "-popup-" + Math.floor(Math.random() * 1000)} name={system.name + "-popup"}
                   title={system.name}>
                {/* Contents of the system popup here */}
            </Popup>
        )
    }

    static removeSystem(system) {
        Meteor.call("systems.removeSystem", system);
    }

    static addSystem(event) {
        if (event.keyCode === 13 && !!event.target.value) {
            Meteor.call("systems.addSystem", {
                name: event.target.value,
                key: event.target.value,
                hidden: true,
                powerUse: 100
            });
            event.target.value = "";
        }
    }

    system(system) {
        let power = "0/" + system.powerUse;
        let classes = ["system"];
        if (system.hidden) {
            classes.push("hidden");
        }
        if (system.broken) {
            classes.push("broken");
        } else if (!system.enabled) {
            classes.push("disabled");
        } else {
            power = system.powerUse + "/" + system.powerUse;
        }
        return (
            <div key={system.name} className={classnames(classes)}
                 onDoubleClick={() => {
                     this.setState({
                         systemPopups: this.state.systemPopups.concat(SystemsFD.createPopup(system))
                     });
                 }}>
                <div className={"left"}>{system.name}</div>
                <div className={"right"}>{power}</div>
            </div>
        );
    }

    systemsList() {
        let systemsList = [];
        this.props.systems.forEach((system) => {
            systemsList.push(this.system(system));
        });
        return systemsList;
    }

    totalPower() {
        let total = 0;
        this.props.systems.forEach((system) => {
            if (system.enabled) {
                total += system.powerUse;
            }
        });
        return total;
    }

    render() {
        return (
            <CardFD name={"Systems"} className={"systems"}>
                {this.state.systemPopups}
                <div className={"totalPower"}>
                    Total power: {this.totalPower()} / {Constants.totalPower}
                </div>
                <div className={"systemsList"}>
                    {this.systemsList()}
                </div>
                <input className={"add-system"} type={"text"}
                       onKeyUp={(event) => {
                           SystemsFD.addSystem(event);
                       }}/>
            </CardFD>
        );
    }
}