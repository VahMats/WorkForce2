import React, {useContext, useState} from "react";
// import EditUser from "./EditUser";
// import Loading from "./Loading";
import ViewUser from "../ViewUser/ViewUser";
// import AddUser from "./AddUser";
import View from "../../images/view.png";
import Edit from "../../images/edit.png";
import Delete from "../../images/delete.png";
import {AllData} from "../Home/Home";

import "./UserList.css";


const UserList = ({ visible }) => {
    
    const data = useContext(AllData);

    const [userId, setUserId] = useState(null);

     const [show, setShow] = useState(false);

     const showModal = (id, item) => () => {
         setShow(!show)
         setUserId(id);

     };
    
    const showDelete = (_id) => async () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage["Token"],
      },
      body: JSON.stringify({
        _id: _id,
      }),
    };

    try {
      const res = await fetch("/api/admin/delete", options);
      const data = await res.json();

      if (data.isOk) {
        setUsersInfo(data.data);
      }
    } catch (e) {
      console.error({ message: e.message });
    }
  };

  const [usersInfo, setUsersInfo] = useState({});

        return (
            <main style={{ display: visible }}>
                {console.log(data.userInfo)}
                <div>
                    {data.userInfo.isAdmin ? (
                        <div className="new_user">
                            <section className="new_user_field">
                                <button>Add new user</button>
                            </section>
                        </div>
                    ) : null}
                    {data.usersInfo.length ? (<section className="users_list">
                        <table>
                            <thead>
                                <tr className="users_list_info">
                                    {data.userInfo.isAdmin ? <th>id</th> : null}
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    <th>Date of Birth</th>
                                    <th>Gender</th>
                                    {data.userInfo.isAdmin ? <th>Team</th> : ""}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.usersInfo.map((item, index) => (
                                    <tr key={index}>
                                        {data.userInfo.isAdmin ? <td>{item._id}</td> : null}
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.username}</td>
                                        <td>{item.email}</td>
                                        <td>{item.dateOfBirth}</td>
                                        <td>{item.gender}</td>
                                        {data.userInfo.isAdmin ? <td>{item.team}</td> : ""}
                                        <td className="image-td">
                                            {data.userInfo.isAdmin ? (
                                                <>
                                                    <img
                                                        src={View}
                                                        alt="show"
                                                        onClick={showModal(item.id)}
                                                    />
                                                    <img
                                                        src={Edit}
                                                        alt="edit"
                                                    // onClick={showEdit(item.id, item.teamId)}
                                                    />
                                                    <img
                                                        src={Delete}
                                                        alt="delete"
                                                    onClick={showDelete(item.id)}
                                                    />
                                                </>
                                            ) : (
                                                <img
                                                    src={View}
                                                    alt="show"
                                                    onClick={showModal(item.id)}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>) :
                        <h1 className={"no-users"}>{data.userInfo.isAdmin ? "No users yet ..." : "You are not in team yet"}</h1>}
                </div>
                {show && (
                    <ViewUser show={show} setShow={setShow} />
                )}
            </main>
        );
    }

                export default UserList;