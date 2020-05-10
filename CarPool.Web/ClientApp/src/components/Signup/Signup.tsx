import React, { useState, useContext, Fragment } from "react";
import { Icon } from "office-ui-fabric-react";
import homebg from "../../Images/homebg.png";
import { useHistory, Redirect } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import { SignupAPI } from "../../Services/UserCalls";
import Loader from "../Loader/Loader";
import ErrorPopup from "../ErrorPopup/ErrorPopup";
import ResponsePopup from "../ResponsePopup/ResponsePopup";
import FormBg from "../../Images/formbg.png";
import "./Signup.sass";

enum Fields {
  Email,
  Password,
  ConfirmPassword,
}

const Signup = () => {
  const history = useHistory();

  const { userState, userDispatch }: any = useContext(UserContext);

  const [visibilty, setVisibilty] = useState({
    password: false,
    confirmPassword: false,
  });

  const [fieldActive, setFieldActive] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });

  const initialState: any = {
    name: "",
    email: "",
    password: "",
  };

  const [localState, setLocalState] = useState(initialState);

  const [errorState, seterrorState] = useState({
    displayError: false,
    errorText: "",
  });

  const [confirmPassword, setconfirmPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (localState.password === confirmPassword) {
      // console.log(localState);
      SignupAPI(localState, userDispatch);
      setLocalState(initialState);
      setconfirmPassword("");
    } else {
      alert("passwords doesn't match");
    }
  };

  function activateField(field: Fields) {
    if (field === Fields.Email) setFieldActive({ ...fieldActive, email: true });
    else if (field === Fields.Password)
      setFieldActive({ ...fieldActive, password: true });
    else setFieldActive({ ...fieldActive, confirmPassword: true });
  }

  function disableField(event: any, field: Fields) {
    if (event.target.value === "") {
      if (field === Fields.Email)
        setFieldActive({ ...fieldActive, email: false });
      else if (field === Fields.Password)
        setFieldActive({ ...fieldActive, password: false });
      else setFieldActive({ ...fieldActive, confirmPassword: false });
    } else {
      if (field === Fields.Email) {
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
      } else if (field === Fields.Password) {
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
      }
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
          <div className="signup">
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

            <div className="signup-Form-Container">
              <div className="signup-Form">
                <div className="signup-Head">Sign Up</div>
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
                      let tempState: any = localState;
                      let email: string = event.target.value;
                      tempState.name = email.slice(0, email.indexOf("@"));
                      tempState.email = email;
                      setLocalState({ ...localState, ...tempState });
                    }}
                  />
                </div>

                <div className="password">
                  <label className={fieldActive.password ? "field-active" : ""}>
                    Enter Password
                  </label>
                  <input
                    className="floating-Label"
                    type={visibilty.password ? "text" : "password"}
                    value={localState.password}
                    onFocus={() => activateField(Fields.Password)}
                    onBlur={(event: any) =>
                      disableField(event, Fields.Password)
                    }
                    onChange={(event: any) =>
                      setLocalState({
                        ...localState,
                        password: event.target.value,
                      })
                    }
                  />
                  <div className="red-Eye">
                    <Icon
                      iconName="RedEye"
                      onMouseUp={() =>
                        setVisibilty({ ...visibilty, password: false })
                      }
                      onMouseDown={() =>
                        setVisibilty({ ...visibilty, password: true })
                      }
                    />
                  </div>
                </div>

                <div className="password">
                  <label
                    className={
                      fieldActive.confirmPassword ? "field-active" : ""
                    }
                  >
                    Confirm Password
                  </label>
                  <input
                    className="floating-Label"
                    type={visibilty.confirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onFocus={() => activateField(Fields.ConfirmPassword)}
                    onBlur={(event: any) =>
                      disableField(event, Fields.ConfirmPassword)
                    }
                    onChange={(event: any) =>
                      setconfirmPassword(event.target.value)
                    }
                  />
                  <div className="red-Eye">
                    <Icon
                      iconName="RedEye"
                      onMouseUp={() =>
                        setVisibilty({ ...visibilty, confirmPassword: false })
                      }
                      onMouseDown={() =>
                        setVisibilty({ ...visibilty, confirmPassword: true })
                      }
                    />
                  </div>
                </div>

                <button
                  className="submit"
                  onClick={(event: any) => handleSubmit(event)}
                >
                  submit
                </button>
                <div className="signup-Footer">
                  <div className="member-Text">Already a member?</div>
                  <div className="login-Nav">
                    <button
                      className="login-Text"
                      onClick={() => history.push("/login")}
                    >
                      LOG IN
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

export default Signup;
