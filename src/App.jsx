/* eslint-disable no-unused-vars */
// src/App.jsx
import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "bootstrap/dist/css/bootstrap.min.css";

const Loader = lazy(() => import("./Atom/Loader"));
const UsersTable = lazy(() => import("./components/UsersTable"));

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={<Loader />}>
        <UsersTable />
      </Suspense>
    </Provider>
  );
}

export default App;
