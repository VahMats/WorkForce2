import "./Login.css";
import { useState } from "react";
import ValidationChecker from "../../ValidationChecker";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Login = () => {
  const [authPocket, setAuthPocket] = useState({
      username: "",
      password: ""
  });
  const [regPocket, setRegPocket] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [mainClass, setMainClass] = useState("bounceRight");
    const [errorFields, setErrorFields] = useState([]);

    const errorsSetting = (type) => {
        switch (type) {
            case "email":
                console.log("false email");
            case "firstName":
                console.log("false firstName");
        }
    }

  const Signin = async () => {
    const validAuth = ValidationChecker(authPocket, "login");
    console.log(validAuth.error)
    validAuth.error.forEach(el=>{
        errorsSetting(el);
    })
    if (validAuth.isValid) {
      await fetch("/api/user/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authPocket),
      })

        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.data.length !== 0) {
            localStorage.setItem("token", data.token);
            window.location.reload();
          }
        });
    } else return;
  };

  const Signup = async () => {
    const validReg = ValidationChecker(regPocket);
      console.log(validReg.error)
      validReg.error.forEach(el=>{
          errorsSetting(el);
      })
      if (validReg.isValid) {
      await fetch("/api/user/reg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regPocket),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">Don't have an account?</h2>
            <p className="user_unregistered-text">
              Sign up and become a valuable part of our big team!
            </p>
            <button
              className="user_unregistered-signup"
              id="signup-button"
              onClick={() => setMainClass("bounceLeft")}>
              Join us!
            </button>
          </div>
          <div className="user_options-registered">
            <h2 className="user_registered-title">Have an account?</h2>
            <p className="user_registered-text">
              Don’t miss out on the right home for you!
            </p>
            <button
              className="user_registered-login"
              id="login-button"
              onClick={() => setMainClass("bounceRight")}>
              Login
            </button>
          </div>
        </div>
        <div
          className={`user_options-forms ${mainClass}`}
          id="user_options-forms">
          <div className="user_forms-login">
            <h2 className="forms_title">
              Welcome buddy! Get a bird's-eye view or dive deep into every
              feature of InternalTool
            </h2>
            <h3 className="forms_title">
              Isn't it time all that imformation you've been collecting started
              working for you?
            </h3>
            <form className="forms_form">
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Username"
                    className="forms_field-input"
                    onChange={(e) => {
                      setAuthPocket((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }));
                    }}
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    onChange={(e) => {
                      setAuthPocket((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                    required
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <button type="button" className="forms_buttons-forgot">
                  Forgot password?
                </button>
                <input
                  type="button"
                  defaultValue="Log In"
                  className="forms_buttons-action"
                  onClick={Signin}
                />
              </div>
            </form>
          </div>
          <div className="user_forms-signup">
            <h2 className="forms_title">Sign up, the rest will follow!</h2>
            <form className="forms_form">
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="forms_field-input"
                    onChange={(e) =>
                      setRegPocket((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="forms_field-input"
                    onChange={(e) =>
                      setRegPocket((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Username"
                    className="forms_field-input"
                    onChange={(e) =>
                      setRegPocket((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="email"
                    placeholder="Email"
                    className="forms_field-input"
                    onChange={(e) =>
                      setRegPocket((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    onChange={(e) =>
                      setRegPocket((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="forms_field-input"
                    onChange={(e) =>
                      setRegPocket((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="form-date">
                  <p>Date of birth</p>
                  <input
                    type="date"
                    onChange={(e) =>
                      setRegPocket((prev) => ({
                        ...prev,
                        dateOfBirth: e.target.value,
                      }))
                    }
                    required
                  />
                </div>
                <div className="radio-buttons"> 
                  <p>Gender</p>
                   <input type="radio" value="male" name="gender" id ="radio" onChange={(e) =>
                      setRegPocket((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    required/> <p>Male</p>
                   <input type="radio" value="female" name="gender" id ="radio"  onChange={(e) =>
                      setRegPocket((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    required/> <p>Female</p>
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input
                  type="button"
                  defaultValue="Sign up"
                  className="forms_buttons-action"
                  onClick={Signup}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
