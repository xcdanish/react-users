/* eslint-disable no-unused-vars */
// src/App.jsx
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import UsersTable from "./components/UsersTable";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider store={store}>
      <UsersTable />
    </Provider>
  );
}

export default App;
