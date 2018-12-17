import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
// noinspection ES6CheckImport
import {mount} from 'react-mounter';

import {_} from "meteor/underscore";

import Constants from "../../api/constants/constants";

// Import pages
import FlightDirector from "../../ui/pages/flightDirector/flightDirector";
import Index from "../../ui/pages/index/index";
import MainViewScreen from "../../ui/pages/mainViewScreen/mainViewScreen";
import Station from "../../ui/pages/station/station";

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

FlowRouter.route("/stations/:station", {
    action(params) {
        let station = _.findWhere(Constants.Stations, {name: params.station});
        if (typeof station == "undefined") {
            console.log("Invalid station: " + params.station);
            FlowRouter.go("Index");
        } else {
            FlowRouter.go("Station", {station: station.name, screen: station.screens[0].name});
        }
    }
});

FlowRouter.route("/stations/:station/:screen", {
    name: "Station",
    action(params) {
        if (typeof _.findWhere(Constants.Stations, {name: params.station}) == "undefined") {
            console.log("Invalid station: " + params.station);
            FlowRouter.go("Index");
        } else {
            mount(Station, {station: params.station, screen: params.screen});
        }
    }
});