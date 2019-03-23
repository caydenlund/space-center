import {Meteor} from "meteor/meteor";
import Systems from "./Systems";

Meteor.publish("systems", () => {
    return Systems.find();
});