import * as React from "react";

import "./custom.css";
import Layout from "./components/Layout/Layout";
import { initializeIcons } from "office-ui-fabric-react";
import UserContextProvider from "./contexts/UserContext";

initializeIcons();
const App = () => {
  return (
    <UserContextProvider>
      <Layout />
    </UserContextProvider>
  );
};

export default App;
