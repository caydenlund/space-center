import { FlowRouter } from 'meteor/kadira:flow-router';

// noinspection ES6CheckImport
import { mount } from 'react-mounter';

import { _ } from "meteor/underscore";

import Constants from "../../api/Constants/Constants";

// Import pages
import FlightDirector from "../../ui/pages/FlightDirector/FlightDirector";
import Index from "../../ui/pages/Index/Index";
import MainViewScreen from "../../ui/pages/MainViewScreen/MainViewScreen";
import Station from "../../ui/pages/Station/Station";

// noinspection JSUnusedGlobalSymbols
FlowRouter.route("/", {
    name: "Index",
    action() {
        mount(Index);
    }
});

FlowRouter.route("/pages", {
    action() {
        FlowRouter.go("Index");
    }
});

FlowRouter.route("/pages/:page", {
    name: "Page",
    action(params) {
        let page;
        switch (params.page) {
            case "fd":
                page = FlightDirector;
                break;
            case "mvs":
                page = MainViewScreen;
                break;
            default:
                FlowRouter.go("Index");
                return;
        }
        mount(page);
    }
});

FlowRouter.route("/stations", {
    action() {
        FlowRouter.go("Index");
    }
});

FlowRouter.route("/stations/:Station", {
    action(params) {
        let station = _.findWhere(Constants.Stations, { name: params.station });
        if (typeof station == "undefined") {
            console.log("Invalid Station: " + params.station);
            FlowRouter.go("Index");
        } else {
            FlowRouter.go("Station", { station: station.name, screen: station.screens[0].name });
        }
    }
});

FlowRouter.route("/stations/:Station/:screen", {
    name: "Station",
    action(params) {
        if (typeof _.findWhere(Constants.Stations, { name: params.station }) == "undefined") {
            console.log("Invalid Station: " + params.station);
            FlowRouter.go("Index");
        } else {
            mount(Station, { station: params.station, screen: params.screen });
        }
    }
});
