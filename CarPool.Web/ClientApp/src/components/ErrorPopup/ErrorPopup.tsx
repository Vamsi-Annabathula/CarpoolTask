import React from "react";
import { CLOSE_ERROR } from "../../ActionTypes/UserActions";
import { Icon } from "office-ui-fabric-react";
import "./ErrorPopup.sass";

interface IErrorPopup {
  message: string;
  dispatch: any;
}

const ErrorPopup = (props: IErrorPopup) => {
  return (
    <div
      className="error-Popup"
      onClick={() => props.dispatch({ type: CLOSE_ERROR })}
    >
      <div className="popup-Title">Error</div>
      <div className="popup-Message">{props.message}</div>
      <button className="close-Button">
        <Icon iconName="ChromeClose" />
      </button>
    </div>
  );
};

export default ErrorPopup;
