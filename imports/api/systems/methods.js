import {Meteor} from "meteor/meteor";
import Systems from "./systems";

Meteor.methods({
    "systems.addSystem"(system) {
        if (Systems.find({name: system.name}).count() === 0) {
            try {
                const document = Systems.schema.clean(system);
                Systems.schema.validate(document);
                Systems.insert(document);
            } catch (error) {
                console.log("Error: " + error.message);
            }
        }
    },
    "systems.removeSystem"(system) {
        Systems.remove(system);
    },
    "systems.clearSystems"() {
        Systems.find().fetch().forEach((system) => {
            Systems.remove(system);
        });
    }
});