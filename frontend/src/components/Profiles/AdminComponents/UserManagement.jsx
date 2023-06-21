import { useState } from "react";
import axios from "axios";
import Dropzone from "../../../services/hookDropzone";
import Avatar0 from "../../../assets/avatar0.png";

export default function UserManagement() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dropzoneImage, setDropzoneImage] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isExpert, setIsExpert] = useState("");

  const handleAddNewUserButton = (
    userFirstName,
    userLastName,
    userPhoto,
    userEmail,
    userPassword,
    userRole,
    userIsExpert
  ) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users`, {
        firstname: userFirstName,
        lastname: userLastName,
        photo: userPhoto,
        email: userEmail,
        password: userPassword,
        role_id: parseInt(userRole, 10),
        is_expert: parseInt(userIsExpert, 10),
        creation_date: new Date().toJSON().slice(0, 10),
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="user-management">
      <div className="input-container">
        <h2 className="input-title">Ajout d'utilisateur</h2>
        <div className="input-fields">
          <label htmlFor="lastName">
            Nom <br />
            <input
              type="text"
              id="lastName"
              placeholder="Insérez votre nom"
              name="lastName"
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label htmlFor="firstName">
            Prénom <br />
            <input
              type="text"
              id="firstName"
              placeholder="Insérez votre prénom"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            Email <br />
            <input
              type="email"
              id="email"
              className="input-email"
              placeholder="Insérez votre email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Mot de passe <br />
            <input
              id="password"
              type="password"
              placeholder="Insérez votre mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div className="roles-container">
            <label htmlFor="role">
              Role <br />
              <select id="role" onChange={(e) => setRole(e.target.value)}>
                <option value="">Sélectionne votre role</option>
                <option value="1">Admin</option>
                <option value="2">Utilisateur</option>
              </select>
            </label>
            <label htmlFor="role-expert" className="role-expert">
              Expert <br />
              <input
                type="checkbox"
                id="role-expert"
                onChange={(e) => setIsExpert(e.target.value)}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="profile-photo-container">
        <label htmlFor="profile-photo-input">
          <Dropzone
            className="dropzone"
            dropzoneImage={dropzoneImage}
            setDropzoneImage={setDropzoneImage}
          />
          <img
            src={
              dropzoneImage[0]?.preview ? dropzoneImage[0]?.preview : Avatar0
            }
            alt="profil"
          />
        </label>
      </div>
      <div className="input-buttons-container">
        <div className="add-button-container">
          <button
            type="button"
            onClick={() => {
              handleAddNewUserButton(
                firstName,
                lastName,
                dropzoneImage[0]?.preview,
                email,
                password,
                role,
                isExpert
              );
            }}
          >
            Ajouter l'utilisateur
          </button>
        </div>
      </div>
    </div>
  );
}
