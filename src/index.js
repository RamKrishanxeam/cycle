import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./styles/global.css";
// import "./index.css";
import { AuthProvider } from "./config/authProvider";
import { Provider } from "react-redux";
import { persistor, store } from "./lib/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
