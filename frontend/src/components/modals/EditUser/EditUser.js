import { useContext, useState } from "react";
import ValidationChecker from "../../../ValidationChecker";
import { AllData } from "../../Home/Home"

import "./EditUser.css";

const EditUser = ({ currentUsersData, setShow }) => {

    const { data, setData } = useContext(AllData)

    const [editPocket, setEditPocket] = useState({
        id: currentUsersData._id,
        firstName: currentUsersData.firstName,
        lastName: currentUsersData.lastName,
        email: currentUsersData.email,
        dateOfBirth: currentUsersData.dateOfBirth,
        gender: currentUsersData.gender,
        teamId: currentUsersData.teamId,
        username: currentUsersData.username,
    });

    const [errorFields, setErrorFields] = useState([]);

    let teamData = data.teamsInfo;

    if (currentUsersData.teamId) {
        teamData = teamData.filter(el => el._id !== data.teamId);

    }

    const errorsSetting = (type) => {
        switch (type) {
            case "firstName":
                setErrorFields("Invalid first name");
                break;
            case "lastName":
                setErrorFields("Invalid last name");
                break;
            case "username":
                setErrorFields("Invalid username");
                break;
            case "email":
                setErrorFields("Invalid email");
                break;
            case "dateOfBirth":
                setErrorFields("Invalid date of birth");
                break;
            case "gender":
                setErrorFields("Invalid gender");
                break;
            default:
                setErrorFields("Please fill in all the fields");
                break
        }
    }


    const Edit = async () => {
        const validReg = ValidationChecker(editPocket, "edit");
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
                    if (!data.newUsernameIsUnique && data.newEmailIsUnique) {
                        setErrorFields("New username is already used")
                    } else if (!data.newEmailIsUnique) {
                        setErrorFields("New Email is already used")
                    } else {
                        setData(prev => ({ ...prev, usersInfo: data.usersData, teamsInfo: data.teamsData }));
                        setShow(false);
                    }
                });
        }
    };

    return (
        <div className="edit-user">
            <h2 className="edit-user-title">Change user's personal information</h2>
            <form className="edit-user-form" onSubmit={errorsSetting}>
                <p className="error"> {errorFields} </p>
                <fieldset className="edit-user-fields">
                    <div className="fields">
                        <input
                            type="firstName"
                            defaultValue={currentUsersData.firstName}
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
                            defaultValue={currentUsersData.lastName}
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
                            defaultValue={currentUsersData.username}
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
                            defaultValue={currentUsersData.email}
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
                            defaultValue={currentUsersData.dateOfBirth}
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
                            defaultChecked={currentUsersData.gender === "male"}
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
                            defaultChecked={currentUsersData.gender === "female"}
                            onChange={(e) =>
                                setEditPocket((prev) => ({
                                    ...prev,
                                    gender: e.target.value,
                                }))
                            }
                            required /> <p>Female</p>
                    </div>
                    <select onChange={e => setEditPocket((prev) => ({
                        ...prev,
                        teamId: e.target.value,
                    }))}>
                        <option>{currentUsersData.team}</option>
                        {teamData.map(el => {
                            return (
                                <option
                                    value={el._id}
                                >{el.name}</option>
                            )
                        })}
                    </select>
                </fieldset>
                <div className="forms_button">
                    <input
                        type="button"
                        defaultValue="Save"
                        className="forms_button-action"
                        onClick={e => { Edit() }}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditUser;
