import Constants from "../../api/Constants/Constants";

const startup = () => {
    Constants.defaultSystems.forEach((system) => {
        Meteor.call("systems.addSystem", system);
    });
    console.log("Server started up");
};

export default startup;
