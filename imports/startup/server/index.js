import {Meteor} from "meteor/meteor";

import "./sockets";
import startup from "./startup";

// Import Collections
import "../../api/systems/systems";
import "../../api/systems/methods";
import "../../api/systems/publications";

Meteor.startup(startup);
