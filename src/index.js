import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App/App";
import { Provider } from "react-redux";

import { configureStore } from "./store/store";
import { BrowserRouter } from "react-router-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faPencilAlt, faTrash, faInfoCircle, faSave, faTimesCircle } from "@fortawesome/free-solid-svg-icons";

library.add(fab, faPencilAlt, faTrash, faInfoCircle, faSave, faTimesCircle);

let store = configureStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
