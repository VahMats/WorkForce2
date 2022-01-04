import React, { useState, useContext } from "react";
import "./EditTeam.css";
import { AllData } from "../../Home/Home";

const EditTeam = ({ currentTeamData, setShow }) => {

    const { setData } = useContext(AllData)

    const [teamEditData, setTeamEditData] = useState({
        id: currentTeamData._id,
        name: currentTeamData.name,
        maxCount: currentTeamData.maxCount,
    })
    console.log(teamEditData)

    const [teamError, setTeamError] = useState(false);
    const [membersError, setMembersError] = useState(false);

    const teamChange = (e) => {
        setTeamEditData(prev => ({ ...prev, name: e.target.value }));
        if (e.target.value.length === 0) {
            setTeamError(true);
        } else {
            setTeamError(false);
        }
    };

    const membersChange = (e) => {
        setTeamEditData(prev => ({ ...prev, maxCount: e.target.value }));
        if (
            e.target.value.length === 0 ||
            e.target.value === 0 ||
            e.target.value < 0 ||
            e.target.value === ""
        ) {
            setMembersError(true);
        } else {
            setMembersError(false);
        }
    };

    const Edit = async () => {
        try {
            await fetch("/api/admin/editTeam", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.token,
                },
                body: JSON.stringify(teamEditData),
            }).then(res => res.json()).then(data => setData(prev => ({ ...prev, teamsInfo: data.teamsData })))
        } catch (e) {
            console.error(e);
        }
    };

    return (

        <div className="edit-team">
            <h2 className="edit-team-title">Edit the team!</h2>
            <form className="edit-team-form" onSubmit={teamChange}>
                <fieldset className="edit-team-fields">
                    <div className="fields">
                        <input
                            defaultValue={currentTeamData.name}
                            className="fields-input"
                            type="text"
                            placeholder="Team Name"
                            onChange={teamChange}
                        />
                        {teamError ? "Please add a team name" : " "}
                        <input
                            defaultValue={currentTeamData.maxCount}
                            className="fields-input"
                            placeholder="Max members' count"
                            type={"number"}
                            onChange={membersChange}
                        />
                        {membersError ? "Members' count doesn't match to our requirmenets" : ""}
                    </div>
                </fieldset>
                <div className="forms_button">
                    <input
                        type="button"
                        defaultValue="Submit"
                        className="forms_button-action"
                        onClick={e => {
                            Edit(); setShow(false)
                        }}
                    />
                </div>
            </form>
        </div >
    );
};

export default EditTeam;