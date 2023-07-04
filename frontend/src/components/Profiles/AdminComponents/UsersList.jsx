import { useEffect, useState } from "react";
import axios from "axios";
import AddUser from "./AddUser";
import oeil from "../../../assets/view.png";
import ModifyUser from "../GlobalComponents/ModifyUser";

function UsersList() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, [showAddUser, setShowAddUser, showUpdateUser]);

  return (
    <div className="display">
      {showAddUser && <AddUser setShowAddUser={setShowAddUser} />}
      {showUpdateUser && (
        <ModifyUser
          setShowUpdateUser={setShowUpdateUser}
          currentUser={currentUser}
        />
      )}
      <button
        type="button"
        className="addBtn"
        onClick={() => setShowAddUser(true)}
      >
        Ajouter un utilisateur
      </button>
      <table>
        <thead>
          <tr>
            <th>photo</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Expert(e)</th>
            <th>Crée le</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => {
              const crerationDate = new Date(user.creation_date);
              return (
                <tr key={user.id}>
                  <div className="picture-container">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                        user.photo
                      }`}
                      alt="profil"
                    />
                  </div>
                  <td>{user.lastname}</td>
                  <td>{user.firstname}</td>
                  <td>{user.email}</td>
                  <td>{user.roles.split(", ")[0]}</td>
                  <td>{user.roles.split(", ").length > 1 ? "oui" : "non"}</td>
                  <td>{crerationDate.toLocaleDateString("fr")}</td>
                  <td>
                    <button
                      type="button"
                      className="viewBtn"
                      onClick={() => {
                        // eslint-disable-next-line no-sequences
                        return setShowUpdateUser(true), setCurrentUser(user);
                      }}
                    >
                      <img src={oeil} alt="" />
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
