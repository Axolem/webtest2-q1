import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { IonApp } from "@ionic/react";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <IonApp>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </IonApp>
);
defineCustomElements(window);
