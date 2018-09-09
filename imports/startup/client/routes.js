import React from 'react';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {mount} from 'react-mounter';

import Index from "../../ui/pages/index/index";

FlowRouter.route("/", {
    name: "Index",
    action() {
        mount(Index);
    }
});
