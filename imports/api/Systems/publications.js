import { Meteor } from "meteor/meteor";
import Systems from "./Systems";

Meteor.publish("systems", (showHidden = false) => {
    if (showHidden)
        return Systems.find();
    return Systems.find({ hidden: false });
});
