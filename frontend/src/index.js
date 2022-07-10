import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { AppRoutes } from "./routing/app.routes";

let root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<AppRoutes />)

reportWebVitals();
