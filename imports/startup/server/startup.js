import Constants from "../../api/constants/constants";

const startup = () => {
    Constants.defaultSystems.forEach((system) => {
        Meteor.call("systems.addSystem", system);
    });
    console.log("Server started up");
};

export default startup;
