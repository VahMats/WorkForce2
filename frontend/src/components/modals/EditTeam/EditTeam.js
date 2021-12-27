import React, { useState, useEffect } from "react";
import "./EditTeam.css";

const EditTeam = ({ data }) => {
    const [teamEditData, setTeamEditData] = useState({
        name: "",
        maxCount: "",
    })

    const [teamError, setTeamError] = useState(false);
    const [teamHasError, setTeamHasError] = useState(true);


    const [membersError, setMembersError] = useState(false);
    const [membersHasError, setMembersHasError] = useState(true);

    const teamChange = (e) => {
        setTeamEditData(prev => ({ ...prev, name: e.target.value }));
        if (e.target.value.length === 0) {
            setTeamError(true);
            setTeamHasError(true);
        } else {
            setTeamError(false);
            setTeamHasError(false);
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
            setMembersError(true);
        } else {
            setMembersError(false);
            setMembersHasError(false);
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
            }).then(res => res.json()).then(data => console.log(data))
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
                            defaultValue={data.name}
                            className="fields-input"
                            type="text"
                            placeholder="Team Name"
                            onChange={teamChange}
                        />
                        {teamError ? "Please add a team name" : " "}
                        <input
                            defaultValue={data.maxCount}
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
                            Edit();
                        }}
                    />
                </div>
            </form>
        </div >
    );
};

export default EditTeam;