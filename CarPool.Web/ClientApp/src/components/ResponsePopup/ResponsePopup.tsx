import React from "react";
import { Icon } from "office-ui-fabric-react";
import { CLOSE_RESPONSE } from "../../ActionTypes/UserActions";
import "./ResponsePopup.sass";

interface IResponsePopup {
  message: string;
  dispatch: any;
}

const ResponsePopup = (props: IResponsePopup) => {
  return (
    <div className="response-Popup">
      <div className="popup-Title">Response</div>
      <div className="popup-Message">{props.message}</div>
      <button
        className="close-Button"
        onClick={() => props.dispatch({ type: CLOSE_RESPONSE })}
      >
        <Icon iconName="ChromeClose" />
      </button>
    </div>
  );
};

export default ResponsePopup;
