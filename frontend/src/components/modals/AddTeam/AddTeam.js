import React, { useContext, useState } from "react";
import "./AddTeam.css";


const AddTeam = ({ add, setAdd, setDidChangeData }) => {
    const [teamsData, setTeamsData] = useState("");
    const [teamError, setTeamError] = useState(false);
    const [teamHasError, setTeamHasError] = useState(true);

    const [members, setMembers] = useState("");
    const [membersError, setMembersError] = useState(false);
    const [membersHasError, setMembersHasError] = useState(true);

    const teamChange = (e) => {
        setTeamsData(e.target.value);
        if (e.target.value.length === 0) {
            setTeamError(true);
            setTeamHasError(true);
        } else {
            setTeamError(false);
            setTeamHasError(false);
        }
    };

    const membersChange = (e) => {
        setMembers(e.target.value);
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

    let isDisabled =
        !teamHasError && !membersHasError && !membersError ? false : true;

    const Add = async () => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": localStorage.token,
            },
            body: JSON.stringify({
                name: teamsData,
                maxCount: parseInt(members),
            }),
        };
        try {
            const res = await fetch("/api/admin/addTeam", options);
            const data = await res.json();

            if (data.isOk) {
                setAdd(!add);
                setDidChangeData(true);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (

        <div className="new-team">
            <h2 className="new-team-title">Add a new team!</h2>
            <form className="new-team-form" onSubmit={teamChange}>
                <fieldset className="new-team-fields">
                    <div className="fields">
                        <input className="fields-input" type="text" placeholder="Team Name" />
                        {teamError ? "Please add a team name" : " "}
                        <input
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
                        disabled={isDisabled}
                        type="button"
                        defaultValue="Submit"
                        className="forms_button-action"
                        onClick={Add}
                    />
                </div>
            </form>
        </div >
    );
};

export default AddTeam;