import Systems from "../../api/systems/systems";
import Constants from "../../api/constants/constants";

const startup = () => {
    Constants.defaultSystems.forEach((system) => {
        if (Systems.find({name: system.name}).count() === 0) {
            try {
                const document = Systems.schema.clean(system);
                Systems.schema.validate(document);
                Systems.insert(document);
            } catch (error) {
                console.log("Error: " + error.message);
            }
        }
    });
    console.log("Server started up");
};

export default startup;