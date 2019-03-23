import {Meteor} from "meteor/meteor";

import "./sockets";
import startup from "./startup";
// Import Collections
import "../../api/Systems/Systems";
import "../../api/Systems/methods";
import "../../api/Systems/publications";

Meteor.startup(startup);
