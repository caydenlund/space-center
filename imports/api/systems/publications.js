import {Meteor} from "meteor/meteor";
import Systems from "./systems";

Meteor.publish("systems", () => {
    return Systems.find();
});