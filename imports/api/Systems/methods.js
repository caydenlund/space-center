import { Meteor } from "meteor/meteor";
import Systems from "./Systems";

Meteor.methods({
    "systems.addSystem"(system) {
        if (Systems.find({ name: system.name }).count() === 0) {
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
        return Systems.remove(system);
    },
    "systems.clearSystems"() {
        Systems.find().fetch().forEach((system) => {
            Systems.remove(system);
        });
    },
    "systems.updateSystem"(name, properties) {
        if (!!properties.name || !!properties._id) {
return;
}
        const update = { $set: properties };
        let updateContext = Systems.schema.newContext();
        updateContext.validate(update, { modifier: true });
        if (updateContext.isValid()) {
            return Systems.update({ name }, update);
        } else {
            console.log(updateContext.validationErrors());
        }
    }
});
