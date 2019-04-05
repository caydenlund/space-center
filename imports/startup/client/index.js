import "./socket";
import "./routes";

import "../../ui/styles/main.scss";

// Disable the context menu globally
document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
});
