import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';

import Stations from "../../api/stations/stations";

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
            case "index":
                FlowRouter.go("Index");
                return;
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
        FlowRouter.go("Station", {station: params.station, screen: "Login"});
    }
});

FlowRouter.route("/stations/:station/:screen", {
    name: "Station",
    action(params) {
        if (!Stations[params.station]) {
            console.log("Invalid station: " + params.station);
            FlowRouter.go("Index");
        }
        mount(Station, {station: params.station, screen: params.screen});
    }
});