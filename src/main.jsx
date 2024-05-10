import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ConfirmProvider } from "material-ui-confirm";
import { ContextProvider } from "./contexts/ContextProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfirmProvider>
    <ContextProvider>
      <App />
    </ContextProvider>
  </ConfirmProvider>
);
