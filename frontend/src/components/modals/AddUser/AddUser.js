import React, { useState, useCallback, useEffect } from "react";
import ValidationChecker from "../../ValidationChecker";

const AddUser = async ({ add, setAdd, setDidChangeData }) => {
 const [addPocket, setAddPocket] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    username: "",
    password: "",
     confirmPassword: "",
    teamName: "",
 });
    
      const errorsSetting = (type) => {
        switch (type) {
            case "email":
                console.log("false email");
            case "firstName":
                console.log("false firstName");
        }
    }

const Add = async () => {
    const validReg = ValidationChecker(addPocket);
      console.log(validReg.error)
      validReg.error.forEach(el=>{
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
            <h2 className="forms_title">Add a new teammate here!</h2>
            <form className="forms_form">
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="forms_field-input"
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
                    type="text"
                    placeholder="Username"
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
                    placeholder="Email"
                    className="forms_field-input"
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
                    placeholder="Password"
                    className="forms_field-input"
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
                   <input type="radio" value="male" name="gender" id ="radio" onChange={(e) =>
                      setAddPocket((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    required/> <p>Male</p>
                   <input type="radio" value="female" name="gender" id ="radio"  onChange={(e) =>
                      setAddPocket((prev) => ({
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
                  onClick={Add}
                />
              </div>
            </form>
          </div>
  );
};
export default AddUser;

