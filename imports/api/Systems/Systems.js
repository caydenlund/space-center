import {Mongo} from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Systems = new Mongo.Collection("systems");

// noinspection JSUndefinedPropertyAssignment
Systems.schema = new SimpleSchema({
    name: String,
    key: String,
    broken: {
        type: Boolean,
        defaultValue: false
    },
    enabled: {
        type: Boolean,
        defaultValue: false
    },
    hidden: {
        type: Boolean,
        defaultValue: true
    },
    powerUse: Number
});

export default Systems;