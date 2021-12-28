import { useState } from "react";
import ValidationChecker from "../../../ValidationChecker";

import "./AddUser.css";

const AddUser = ({teamData}) => {
  const [addPocket, setAddPocket] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    teamId: "",
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
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.token,
        },
        body: JSON.stringify(addPocket),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <div className="new-user">
      <h2 className="new-user-title">Add a new user to the team!</h2>
      <form className="new-user-form" onSubmit={errorsSetting}>
        <p className="error"> {errorFields} </p>
        <fieldset className="new-user-fields">
          <div className="fields">
            <input
              type="firstName"
              placeholder="First Name"
              className="fields-input"
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
          <div className="fields">
            <input
              type="text"
              placeholder="Last Name"
              className="fields-input"
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
          <div className="fields">
            <input
              type="username"
              placeholder="Username"
              pattern={"[A-Za-z]+"}
              minLength={2}
              className="fields-input"
              onChange={(e) =>
                setAddPocket((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              required
            />
          </div>
          <div className="fields">
            <input
              type="email"
              placeholder="Email"
              className="fields-input"
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
          <div className="fields">
            <input
              type="password"
              placeholder="Password"
              className="fields-input"
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
          <div className="fields">
            <input
              type="password"
              placeholder="Confirm Password"
              className="fields-input"
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
          <div className="radio_buttons">
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
            <select onChange={e => setAddPocket((prev) => ({
                ...prev,
                teamId: e.target.value,
            }))}>
                <option disabled selected value>Choose Team</option>
                {teamData.map(el=>{
                    return(
                        <option value={el._id}>{el.name}</option>
                    )
                })}
            </select>
        </fieldset>
        <div className="forms_button">
          <input
            type="button"
            defaultValue="Submit"
            className="forms_button-action"
            onClick={Add}
          />
        </div>
      </form>
    </div>
  );
};

export default AddUser;

