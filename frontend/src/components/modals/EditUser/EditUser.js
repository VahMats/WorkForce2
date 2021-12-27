import { useState } from "react";
import ValidationChecker from "../../../ValidationChecker";

import "./EditUser.css";

const EditUser = ({ data }) => {
    const [editPocket, setEditPocket] = useState({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        gender: "",
        teamId: "",
        username: "",
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
            case " ":
                setErrorFields("Please fill in all the fields");
                break
            default:
                setErrorFields("Please fill in all the fields")
        }
    }


    const Edit = async () => {
        const validReg = ValidationChecker(editPocket);
        console.log(validReg.error)
        validReg.error.forEach(el => {
            errorsSetting(el);
        })
        if (validReg.isValid) {
            await fetch("/api/admin/edit", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.token,
                },
                body: JSON.stringify(editPocket),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                });
        }
    };

    return (
        <div className="edit-user">
            <h2 className="edit-user-title">Change users's personal information</h2>
            <form className="edit-user-form" onSubmit={errorsSetting}>
                <p className="error"> {errorFields} </p>
                <fieldset className="edit-user-fields">
                    <div className="fields">
                        <input
                            type="firstName"
                            defaultValue={data.firstName}
                            className="fields-input"
                            pattern={"[A-Za-z]+"}
                            minLength={2}
                            onChange={(e) =>
                                setEditPocket((prev) => ({
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
                            defaultValue={data.lastName}
                            className="fields-input"
                            pattern={"[A-Za-z]+"}
                            minLength={2}
                            onChange={(e) =>
                                setEditPocket((prev) => ({
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
                            defaultValue={data.username}
                            pattern={"[A-Za-z]+"}
                            minLength={2}
                            className="fields-input"
                            onChange={(e) =>
                                setEditPocket((prev) => ({
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
                            defaultValue={data.email}
                            className="fields-input"
                            pattern={/\S+@\S+\.\S+/}
                            onChange={(e) =>
                                setEditPocket((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                    <div className="form-date">
                        <p>Date of birth</p>
                        <input
                            type="date"
                            defaultValue={data.dateOfBirth}
                            onChange={(e) =>
                                setEditPocket((prev) => ({
                                    ...prev,
                                    dateOfBirth: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                    <div className="radio_buttons">
                        <p>Gender</p>
                        <input type="radio"
                               value="male"
                               name="gender"
                               id="radio"
                               checked={data.gender === "male"}
                               onChange={(e) =>
                            setEditPocket((prev) => ({
                                ...prev,
                                gender: e.target.value,
                            }))
                        }
                            required /> <p>Male</p>
                        <input type="radio"
                               value="female"
                               name="gender"
                               id="radio"
                               checked={data.gender === "female"}
                               onChange={(e) =>
                            setEditPocket((prev) => ({
                                ...prev,
                                gender: e.target.value,
                            }))
                        }
                            required /> <p>Female</p>
                    </div>
                    <div className="fields">
                        <input
                            type="text"
                            defaultValue={data.teamId}
                            className="fields-input"
                            pattern={"[A-Za-z]+"}
                            minLength={2}
                            onChange={(e) =>
                                setEditPocket((prev) => ({
                                    ...prev,
                                    teamId: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                </fieldset>
                <div className="forms_button">
                    <input
                        type="button"
                        defaultValue="Save"
                        className="forms_button-action"
                        onClick={Edit}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditUser;
