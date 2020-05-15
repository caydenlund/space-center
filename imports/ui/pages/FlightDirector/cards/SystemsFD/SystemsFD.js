import React, { Component } from "react";

import classnames from "classnames";
import Constants from "../../../../../api/Constants/Constants";

import CardFD from "../CardFD/CardFD";
import Popup from "../../../../components/Popup/Popup";
import Switch from "../../../../components/Switch/Switch";
import Button from "../../../../components/Button/Button";

import "./SystemsFD.scss";

class SystemPopup extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            system: this.props.system
        });
    }

    clickSwitch(property) {
        let update = {};
        update[ property ] = !this.state.system[ property ];
        let system = this.state.system;
        system[ property ] = !system[ property ];
        this.setState({ system });
        Meteor.call("systems.updateSystem", this.state.system.name, update);
    }

    render() {
        return (
            <Popup name={this.state.system.name + "-popup"}
                   title={this.state.system.name}>
                <div className="switches-box">
                    <div className={"switches-box-row"} onClick={() => this.clickSwitch("hidden")}>
                        <div className={"switch-title"}>Visible:</div>
                        <Switch enabled={!this.state.system.hidden}/>
                    </div>
                    <div className={"switches-box-row"} onClick={() => this.clickSwitch("enabled")}>
                        <div className={"switch-title"}>Enabled:</div>
                        <Switch enabled={this.state.system.enabled}/>
                    </div>
                    <div className={"switches-box-row"} onClick={() => this.clickSwitch("broken")}>
                        <div className={"switch-title"}>Broken:</div>
                        <Switch enabled={this.state.system.broken}/>
                    </div>
                </div>
                <Button className={"delete-button error"} onClick={() => {
                    Meteor.call("systems.removeSystem", this.state.system);
                    $("[name=\"" + this.state.system.name + "-popup\"]").remove();
                }}>
                    Delete System
                </Button>
                <div className={"input-text-box"}>
                    <div className={"input-text-box-row"}>
                        <div className={"input-text-title"}>Power Usage:</div>
                        <input className={"input-text input-powerUse"} type={"text"}
                               placeholder={this.state.system.powerUse}
                               onKeyPress={(event) => {
                                   if (event.key === "Enter") {
                                       let powerUse = parseInt(event.target.value);
                                       event.target.value = "";
                                       if (isNaN(powerUse)) {
return;
}
                                       let system = this.state.system;
                                       system.powerUse = powerUse;
                                       this.setState({ system });
                                       Meteor.call("systems.updateSystem",
                                           this.state.system.name, { powerUse });
                                   }
                               }}/>
                    </div>
                    <div className={"input-text-box-row"}>
                        <div className={"input-text-title"}>Key:</div>
                        <input className={"input-text input-key"} type={"text"}
                               placeholder={this.state.system.key}
                               onKeyPress={(event) => {
                                   if (event.key === "Enter") {
                                       let key = event.target.value;
                                       event.target.value = "";
                                       let system = this.state.system;
                                       system.key = key;
                                       this.setState({ system });
                                       Meteor.call("systems.updateSystem",
                                           this.state.system.name, { key });
                                   }
                               }}/>
                    </div>
                </div>
            </Popup>
        );
    }
}

export default class SystemsFD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            systemPopups: []
        };
    }

    static createPopup(system) {
        return (
            <SystemPopup system={system}
                         key={system.name + "-popup-" + Math.floor(Math.random() * 1000)}/>
        );
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
        let classes = [ "system" ];
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
                 onMouseDown={(event) => {
                     if (event.button === 1) {
                         Meteor.call("systems.removeSystem", { name: system.name });
                     }
                 }}
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
                <input className={"add-system"} type={"text"} placeholder={"New System"}
                       onKeyUp={(event) => {
                           SystemsFD.addSystem(event);
                       }}/>
            </CardFD>
        );
    }
}
