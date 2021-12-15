
import React, { createContext, useContext, useState, useEffect } from "react";
import EditUser from "./EditUser";
import Loading from "./Loading";
import ViewModal from "./ViewModal";
import AddUser from "./AddUser";
import View from "../../images/view.png";
import Edit from "../../images/edit.png";
import Delete from "../../images/delete.png";
// import { HomeContext } from "../App";

import "./UserList.css";

useEffect(async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage["Token"],
        },
    };
      
    return (
        <main>
            <div>
                {userData.isAdmin ? (
                    <div className="add">
                        <section className="add-team-section">
                            <Button onClick={ }>Add +</Button>
                        </section>
                    </div>
                ) : null}
                <section className="users-list">
                    <table>
                        <thead>
                            <tr className="users-list-info">
                                <th>User Name</th>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Date</th>
                                <th>Gender</th>
               
                                {userData.isAdmin ? <th>Team</th> : ""}
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usersData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>{item.dateOfBirth}</td>
                                    <td>{item.gender}</td>
                                    {userData.isAdmin ? <td>{item.teamName}</td> : ""}
                                    <td className="image-td">
                                        {userData.isAdmin ? (
                                            <>
                                                <img
                                                    src={View}
                                                    alt="show"
                                                    onClick={showModal(item.id)}
                                                />
                                                <img
                                                    src={Edit}
                                                    alt="edit"
                                                    onClick={showEdit(item.id, item.teamId)}
                                                />
                                                <img
                                                    src={Delete}
                                                    alt="delete"
                                                    onClick={showDelete(item.id)}
                                                />
                                            </>
                                        ) : (
                                            <img src={View} alt="view" onClick={showModal(item.id)} />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {usersData.length ? (
                        ""
                    ) : (
                        <h1 className={"no-users"}>No users yet ...</h1>
                    )}
                </section>
            </div>
        </main>
    );
});

export default UserList;