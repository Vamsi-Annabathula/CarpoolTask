import React, { useState, useContext, Fragment } from "react";
import { Icon } from "office-ui-fabric-react";
import { useHistory, Redirect } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { loginAPI } from "../../Services/UserCalls";
import homebg from "../../Images/homebg.png";
import FormBg from "../../Images/formbg.png";
import Loader from "../Loader/Loader";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import ResponsePopup from "../ResponsePopup/ResponsePopup";
import "./Login.sass";

enum Fields {
  Email,
  Password,
}

const Login = () => {
  const history = useHistory();
  const { userState, userDispatch }: any = useContext(UserContext);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (localState.email === "" || localState.password === "")
      seterrorState({
        ...errorState,
        displayError: true,
        errorText: "enter valid credentials",
      });
    else {
      seterrorState({
        ...errorState,
        displayError: false,
        errorText: "",
      });
      console.log(localState);
      loginAPI(localState, userDispatch);
    }
  };

  const [fieldActive, setFieldActive] = useState({
    email: false,
    password: false,
  });

  const [localState, setLocalState] = useState({
    email: "",
    password: "",
  });

  const [passwordVisiblity, setPasswordVisibility] = useState(false);

  const [errorState, seterrorState] = useState({
    displayError: false,
    errorText: "",
  });

  function activateField(field: Fields) {
    if (field === Fields.Email) setFieldActive({ ...fieldActive, email: true });
    else if (field === Fields.Password)
      setFieldActive({ ...fieldActive, password: true });
  }

  function disableField(event: any, field: Fields) {
    if (event.target.value === "") {
      if (field === Fields.Email)
        setFieldActive({ ...fieldActive, email: false });
      else if (field === Fields.Password)
        setFieldActive({ ...fieldActive, password: false });
    }
  }

  return (
    <Fragment>
      {userState.isAuthenticated ? (
        <Redirect to="/userhome" />
      ) : (
        <Fragment>
          {userState.loader && <Loader />}
          {userState.error && (
            <ErrorPopup message={userState.errorInfo} dispatch={userDispatch} />
          )}
          {userState.displayResponse && (
            <ResponsePopup
              message={userState.response}
              dispatch={userDispatch}
            />
          )}
          <div className="login">
            <div className="home-Text ms-hiddenMdDown">
              <div className="turnmiles-Text">
                <p className="turn-Text">TURN</p>
                <p className="miles-Text">MILES</p>
              </div>
              <div className="intomoney-Text">
                <p className="into-Text">INTO</p>
                <p className="money-Text">MONEY</p>
              </div>
              <div className="rides-Text">
                <p className="rides-Text">RIDES ON TAP</p>
              </div>
              <img src={homebg} alt="homebg" className="homebg" />
            </div>

            <div className="login-Form-Container">
              <div className="login-Form">
                <div className="login-Head">Log In</div>
                <div className="underline"></div>
                {errorState.displayError && (
                  <div className="error-Text">{errorState.errorText}</div>
                )}
                <div className="email">
                  <label className={fieldActive.email ? "field-active" : ""}>
                    Enter Email Id
                  </label>
                  <input
                    className="floating-Label"
                    type="text"
                    value={localState.email}
                    onFocus={() => activateField(Fields.Email)}
                    onBlur={(event: any) => disableField(event, Fields.Email)}
                    onChange={(event: any) => {
                      let email: string = event.target.value;
                      if (email.lastIndexOf("@") === -1) {
                        seterrorState({
                          ...errorState,
                          displayError: true,
                          errorText: "enter valid email",
                        });
                      } else {
                        seterrorState({
                          ...errorState,
                          displayError: false,
                          errorText: "",
                        });
                      }
                      setLocalState({
                        ...localState,
                        email: event.target.value,
                      });
                    }}
                  />
                </div>

                <div className="password">
                  <label className={fieldActive.password ? "field-active" : ""}>
                    Enter Password
                  </label>
                  <input
                    className="floating-Label"
                    type={passwordVisiblity ? "text" : "password"}
                    value={localState.password}
                    onFocus={() => activateField(Fields.Password)}
                    onBlur={(event: any) =>
                      disableField(event, Fields.Password)
                    }
                    onChange={(event: any) => {
                      debugger;
                      if (event.target.value === "") {
                        seterrorState({
                          ...errorState,
                          displayError: true,
                          errorText: "enter valid password",
                        });
                      } else {
                        seterrorState({
                          ...errorState,
                          displayError: false,
                          errorText: "",
                        });
                      }
                      setLocalState({
                        ...localState,
                        password: event.target.value,
                      });
                    }}
                  />
                  <div className="red-Eye">
                    <Icon
                      iconName="RedEye"
                      onMouseUp={() => setPasswordVisibility(false)}
                      onMouseDown={() => setPasswordVisibility(true)}
                    />
                  </div>
                </div>

                <button
                  className="submit"
                  onClick={(event: any) => handleSubmit(event)}
                >
                  submit
                </button>
                <div className="login-Footer">
                  <div className="member-Text">Not a member yet?</div>
                  <div className="signup-Nav">
                    <button
                      className="signup-Text"
                      onClick={() => history.push("/")}
                    >
                      SIGN UP
                    </button>
                    <div className="underline" />
                  </div>
                </div>
              </div>
              <img className="form-Bg" src={FormBg} alt="formBg" />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
