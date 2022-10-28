import React from "react";
import { Converter } from "./components/Converter";
import { RatesTable } from "./components/RatesTable";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Converter />
        <RatesTable />
      </div>
    </Provider>
  );
}

export default App;
