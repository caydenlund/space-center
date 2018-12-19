import {Meteor} from "meteor/meteor";
import Systems from "./systems";

Meteor.methods({
    "systems.clearSystems"() {
        Systems.find().fetch().forEach((system) => {
            Systems.remove(system);
        });
    }
});