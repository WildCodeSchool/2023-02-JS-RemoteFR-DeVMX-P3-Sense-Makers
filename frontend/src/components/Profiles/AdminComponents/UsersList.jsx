import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import AddUser from "./AddUser";
import oeil from "../../../assets/view.png";
import ModifyUser from "./ModifyUser";

function UsersList({
  userAddNotif,
  userNotAddNotif,
  userModifNotif,
  userDeleteNotif,
  emailSend,
  emailNotSend,
}) {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        withCredentials: true,
      })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.error(err));
  }, [showAddUser, setShowAddUser, showUpdateUser]);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCpage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="display">
      {showAddUser && (
        <AddUser
          setShowAddUser={setShowAddUser}
          userAddNotif={userAddNotif}
          userNotAddNotif={userNotAddNotif}
        />
      )}
      {showUpdateUser && (
        <ModifyUser
          setShowUpdateUser={setShowUpdateUser}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          userModifNotif={userModifNotif}
          userDeleteNotif={userDeleteNotif}
          emailSend={emailSend}
          emailNotSend={emailNotSend}
        />
      )}
      <div className="filter-user">
        <input
          type="text"
          placeholder="recherche utilisateur"
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
        />
        <button
          type="button"
          className="addBtn"
          onClick={() => setShowAddUser(true)}
        >
          Ajouter un utilisateur
        </button>
      </div>
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
          {records &&
            records
              .filter((e) => {
                return (
                  e.lastname.toLowerCase().includes(filterUser) ||
                  e.firstname.toLowerCase().includes(filterUser)
                );
              })
              .map((user) => {
                const crerationDate = new Date(user.creation_date);
                return (
                  <tr key={user.id}>
                    <td className="picture-container mobile-hide">
                      <img
                        className="mobile-hide"
                        src={
                          user.photo === "default_avatar.png"
                            ? `${
                                import.meta.env.VITE_BACKEND_URL
                              }/assets/images/${user.photo}`
                            : `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                                user.photo
                              }`
                        }
                        alt="profil"
                      />
                    </td>
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
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button type="button" onClick={prePage}>
              Prev
            </button>
          </li>
          {numbers.map((n) => (
            <li
              className={`page-item-number ${
                currentPage === n ? "active" : ""
              }`}
              key={n}
            >
              <button type="button" onClick={() => changeCpage(n)}>
                {n}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" type="button" onClick={nextPage}>
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
UsersList.propTypes = {
  userAddNotif: PropTypes.func.isRequired,
  userNotAddNotif: PropTypes.func.isRequired,
  userModifNotif: PropTypes.func.isRequired,
  userDeleteNotif: PropTypes.func.isRequired,
  emailSend: PropTypes.func.isRequired,
  emailNotSend: PropTypes.func.isRequired,
};

export default UsersList;
