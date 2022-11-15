import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
//
import configureAccountsStore from "./hooks-store/accounts-store";
import configureSliderImagessStore from "./hooks-store/slider-images-store";
import configureClinicServicesStore from "./hooks-store/clinic-services-store";
import configureArticlesStore from "./hooks-store/articles-store";
import configureNewsStore from "./hooks-store/news-store";
import configureVaccinsStore from "./hooks-store/vaccins-store";
configureAccountsStore();
configureSliderImagessStore();
configureClinicServicesStore();
configureArticlesStore();
configureNewsStore();
configureVaccinsStore();
//

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
