/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import AddUser from "./AddUser";
import spec from "../../services/spec";
import modifIcon from "../../assets/modif_user.png";
import ModifyUser from "./ModifyUser";
import pict1 from "../../assets/the-art-of-racing-in-the-rain-1558376409.png";
import pict4 from "../../assets/toto.jpg";
import SpecUser from "./SpecUser";

export default function UsersList() {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showUpdateUser, setShowUpdateUser] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [filterUser, setFilterUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [image, setImage] = useState(false);
  const [image2, setImage2] = useState(false);
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const { t } = useTranslation();

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

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="display">
      {image && (
        <div className="img-spec-container">
          <button
            type="button"
            className="close-modal-button"
            onClick={() => setImage(false)}
          >
            {" "}
            X{" "}
          </button>
          <img src={pict1} alt="pic boss" />
        </div>
      )}
      {image2 && (
        <div className="img-spec-container">
          <button
            type="button"
            className="close-modal-button"
            onClick={() => setImage2(false)}
          >
            {" "}
            X{" "}
          </button>
          <img src={pict4} alt="pic boss" />
        </div>
      )}
      {showAddUser && <AddUser setShowAddUser={setShowAddUser} />}
      {showUpdateUser && (
        <ModifyUser
          setShowUpdateUser={setShowUpdateUser}
          setShowAddUser={setShowAddUser}
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
        />
      )}
      <div className="filter-user">
        <input
          type="text"
          placeholder={t("usersListAdmin.placeHolderSearch")}
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
        />
        <button
          type="button"
          className="addBtn"
          onClick={() => setShowAddUser(true)}
        >
          {t("usersListAdmin.textButton")}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>{t("usersListAdmin.tableTitle.photo")}</th>
            <th>{t("usersListAdmin.tableTitle.lastName")}</th>
            <th>{t("usersListAdmin.tableTitle.firstName")}</th>
            <th>{t("usersListAdmin.tableTitle.email")}</th>
            <th>{t("usersListAdmin.tableTitle.role")}</th>
            <th>{t("usersListAdmin.tableTitle.expert")}</th>
            <th>{t("usersListAdmin.tableTitle.created")}</th>
          </tr>
        </thead>
        <tbody>
          {filterUser === spec[0].pseudo ? (
            <SpecUser setImage={setImage2} spec={spec[0]} />
          ) : filterUser === spec[1].pseudo ? (
            <SpecUser setImage={setImage} spec={spec[1]} />
          ) : (
            records &&
            records
              .filter((e) => {
                return (
                  e.lastname.toLowerCase().includes(filterUser) ||
                  e.firstname.toLowerCase().includes(filterUser)
                );
              })
              .map((user) => {
                const creationDate = new Date(user.creation_date);
                return (
                  user.is_active === 1 && (
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
                      <td>
                        {t(
                          `usersListAdmin.tableContent.${
                            user.roles.split(", ")[0]
                          }`
                        )}
                      </td>
                      <td>
                        {user.roles.split(", ").length > 1
                          ? t("usersListAdmin.tableContent.yes")
                          : t("usersListAdmin.tableContent.no")}
                      </td>
                      <td>
                        {creationDate.toLocaleDateString(
                          t("usersListAdmin.tableContent.dateDisplay")
                        )}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="viewBtn"
                          onClick={() => {
                            setShowUpdateUser(true);
                            setCurrentUser(user);
                          }}
                        >
                          <img src={modifIcon} alt="icon update" />
                        </button>
                      </td>
                    </tr>
                  )
                );
              })
          )}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button type="button" onClick={prePage}>
              {"<"}
            </button>
          </li>
          {numbers.map((n) => (
            <li
              className={`page-item-number ${
                currentPage === n ? "active" : ""
              }`}
              key={n}
            >
              <button type="button" onClick={() => setCurrentPage(n)}>
                {n}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" type="button" onClick={nextPage}>
              {">"}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
