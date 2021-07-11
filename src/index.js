import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import drizzle from "./core/configuration.store";
import { DrizzleProvider } from "./context/drizzle.context";
import LoadingContainer from "./containers/loading.container";
import "react-datetime/css/react-datetime.css";
import "./assets/css/black-dashboard-react.min.css";
import "./assets/css/nucleo-icons.css";
import "./index.css";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={drizzle.store}>
      <DrizzleProvider drizzle={drizzle}>
        <LoadingContainer>
          <App />
        </LoadingContainer>
      </DrizzleProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
