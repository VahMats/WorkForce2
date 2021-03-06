import React, { useContext, useState } from "react";
import "./AddTeam.css";
import { AllData } from "../../Home/Home";

const AddTeam = ({ setShow }) => {

    const { setData } = useContext(AllData);

    const [teamAddData, setTeamAddData] = useState({
        name: "",
        maxCount: "",
    })

    const [teamError, setTeamError] = useState(false);
    const [membersError, setMembersError] = useState(false);

    const teamChange = (e) => {
        setTeamAddData(prev => ({ ...prev, name: e.target.value }));
        if (e.target.value.length === 0) {
            setTeamError(true);
        } else {
            setTeamError(false);
        }
    };

    const membersChange = (e) => {
        setTeamAddData(prev => ({ ...prev, maxCount: e.target.value }));
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

    const addTeam = async () => {
        try {
            await fetch("/api/admin/addTeam", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": localStorage.token,
                },
                body: JSON.stringify(teamAddData),
            }).then(res => res.json()).then(data => {
                setData(prev => ({ ...prev, teamsInfo: data.teamsData }))
            })
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
                        <input
                            className="fields-input"
                            type="text"
                            placeholder="Team Name"
                            onChange={teamChange}
                        />
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
                        type="button"
                        defaultValue="Submit"
                        className="forms_button-action"
                        onClick={e => {
                            addTeam(); setShow(false)
                        }}
                    />
                </div>
            </form>
        </div >
    );
};

export default AddTeam;