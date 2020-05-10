import React from "react";
import "./Loader.sass";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";

const Loader = () => {
  return <Spinner className="loader" size={SpinnerSize.large} />;
};

export default Loader;
