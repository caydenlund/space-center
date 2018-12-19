import {Mongo} from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Systems = new Mongo.Collection("systems");

// noinspection JSUndefinedPropertyAssignment
Systems.schema = new SimpleSchema({
    name: String,
    broken: {
        type: Boolean,
        defaultValue: false
    },
    enabled: {
        type: Boolean,
        defaultValue: false
    },
    levels: [Number],
    power: Number
});

export default Systems;