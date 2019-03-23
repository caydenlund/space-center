import React, {Component} from "react";

import classnames from "classnames";
import Constants from "../../../../api/constants/constants";

import CardFD from "./cardFD";

export default class SystemsFD extends Component {
    system(system) {
        let power = system.power;
        let classes = ["system"];
        if (system.power < system.levels[system.levels.length - 1]) {
            classes.push("underpowered");
            power = system.power + " / " + system.levels[system.levels.length - 1];
        }
        if (system.broken || !system.enabled) {
            classes.push("disabled");
        }
        return (
            <div key={system.name} className={classnames(classes)}
                 onDoubleClick={() => {
                     this.removeSystem(system);
                 }}>
                <div className={"left"}>{system.name}</div>
                <div className={"right"}>{power}</div>
            </div>
        );
    }

    removeSystem(system) {
        Meteor.call("systems.removeSystem", system);
    }

    pressKey(event) {
        if (event.keyCode === 13 && !!event.target.value) {
            Meteor.call("systems.addSystem", {
                name: event.target.value,
                power: 100,
                levels: [100]
            });
            event.target.value = "";
        }
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
            if (system.enabled && !system.broken) {
                total += system.power;
            }
        });
        return total;
    }

    render() {
        return (
            <CardFD name={"Systems"} className={"systems"}>
                <div className={"totalPower"}>
                    Total power: {this.totalPower()} / {Constants.totalPower}
                </div>
                <div className={"systemsList"}>
                    {this.systemsList()}
                </div>
                <input className={"add-system"} type={"text"}
                       onKeyUp={(event) => {
                           this.pressKey(event);
                       }}/>
            </CardFD>
        );
    }
}