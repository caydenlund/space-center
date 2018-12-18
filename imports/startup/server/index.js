import {Meteor} from "meteor/meteor";

import "./sockets";

Meteor.startup(() => {
    // code to run on server at startup
    console.log("Server started up");
});
