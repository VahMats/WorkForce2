import { useState } from "react";
import ValidationChecker from "../../../ValidationChecker";

import "./AddUser.css";

const AddUser = () => {
  const [addPocket, setAddPocket] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    teamName: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errorFields, setErrorFields] = useState([]);

  const errorsSetting = (type) => {
    switch (type) {
      case "text":
        setErrorFields("Invalid name");
        break;
      case "username":
        setErrorFields("Username does not match to our requirmenets");
        break;
      case "email":
        setErrorFields("Invalid Email");
        break;
      case "password":
        setErrorFields("Invalid password");
        break;
      case "confirmpassword":
        setErrorFields("Passwords are not the same");
        break;
      case " ":
        setErrorFields("Please fill in all the fields");
        break
      default:
        setErrorFields("Please fill in all the fields")
    }
  }


  const Add = async () => {
    const validReg = ValidationChecker(addPocket);
    console.log(validReg.error)
    validReg.error.forEach(el => {
      errorsSetting(el);
    })
    if (validReg.isValid) {
      await fetch("/api/admin/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addPocket),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <div className="user_forms-add">
      <h2 className="forms_title">Add a new user to the team!</h2>
      <form className="forms_form" onSubmit={errorsSetting}>
        <p className="error"> {errorFields} </p>
        <fieldset className="forms_fieldset">
          <div className="forms_field">
            <input
              type="firstName"
              placeholder="First Name"
              className="forms_field-input"
              pattern={"[A-Za-z]+"}
              minLength={2}
              onChange={(e) =>
                setAddPocket((prev) => ({
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
              pattern={"[A-Za-z]+"}
              minLength={2}
              onChange={(e) =>
                setAddPocket((prev) => ({
                  ...prev,
                  lastName: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="forms_field">
            <input
              type="username"
              placeholder="Username should contain more than 3 characters"
              pattern={"[A-Za-z]+"}
              minLength={2}
              className="forms_field-input"
              onChange={(e) =>
                setAddPocket((prev) => ({
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
              placeholder="Email should be a valid email"
              className="forms_field-input"
              pattern={/\S+@\S+\.\S+/}
              onChange={(e) =>
                setAddPocket((prev) => ({
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
              placeholder="Password should consist of at least 6 alphanumerical"
              className="forms_field-input"
              minLength={6}
              maxLength={20}
              onChange={(e) =>
                setAddPocket((prev) => ({
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
              minLength={6}
              maxLength={20}
              onChange={(e) =>
                setAddPocket((prev) => ({
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
                setAddPocket((prev) => ({
                  ...prev,
                  dateOfBirth: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="radio-buttons">
            <p>Gender</p>
            <input type="radio" value="male" name="gender" id="radio" onChange={(e) =>
              setAddPocket((prev) => ({
                ...prev,
                gender: e.target.value,
              }))
            }
              required /> <p>Male</p>
            <input type="radio" value="female" name="gender" id="radio" onChange={(e) =>
              setAddPocket((prev) => ({
                ...prev,
                gender: e.target.value,
              }))
            }
              required /> <p>Female</p>
          </div>
        </fieldset>
        <div className="forms_buttons">
          <input
            type="button"
            defaultValue="Sign up"
            className="forms_buttons-action"
            onClick={Add}
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;

