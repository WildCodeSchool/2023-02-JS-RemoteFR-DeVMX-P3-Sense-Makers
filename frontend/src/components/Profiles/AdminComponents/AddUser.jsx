import { useState } from "react";
import axios from "axios";
import Dropzone from "../../../services/hookDropzone";
import inputValidationRules from "../../../services/inputValidationRules";
import Avatar0 from "../../../assets/avatar0.png";

export default function AddUser() {
  const [dropzoneImage, setDropzoneImage] = useState([]);
  const [newUploadedFileName, setNewUploadedFileName] = useState("");
  const [targetValues, setTargetValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photo: "",
    role: 0,
    roleExpert: false,
  });

  const update = (event) => {
    const target = event.currentTarget;

    setTargetValues({
      ...targetValues,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    });
  };

  const submit = (event) => {
    event.preventDefault();

    const isValidForm = Object.values(inputValidationRules(targetValues)).every(
      (key) => key
    );

    if (isValidForm) {
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/users`, {
          firstname: targetValues.firstName,
          lastname: targetValues.lastName,
          photo: newUploadedFileName,
          email: targetValues.email,
          password: targetValues.password,
          role_id: targetValues.role,
          creation_date: "2023-02-03",
        })
        .then((response) => console.info(response))
        .catch((err) => console.error(err));
    } else {
      console.info("XXX Submitting form with state:", targetValues);
    }
  };
  return (
    <form className="user-management" onSubmit={submit}>
      <div className="input-container">
        <h2 className="input-title">Ajout d'utilisateur</h2>
        <div className="input-fields">
          <label htmlFor="lastName">
            Nom <br />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Insérez votre nom"
              onChange={update}
              required
            />
          </label>
          <label htmlFor="firstName">
            Prénom <br />
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Insérez votre prénom"
              onChange={update}
              required
            />
          </label>
          <label htmlFor="email">
            Email <br />
            <input
              type="email"
              id="email"
              name="email"
              className="input-email"
              placeholder="Insérez votre email"
              onChange={update}
              required
            />
          </label>
          <label htmlFor="password">
            Mot de passe <br />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Insérez votre mot de passe"
              onChange={update}
              required
            />
          </label>
          <div className="roles-container">
            <label htmlFor="role">
              Role <br />
              <select id="role" name="role" onChange={update} required>
                <option value="0">Sélectionne votre role</option>
                <option value="1">Admin</option>
                <option value="2">Utilisateur</option>
              </select>
            </label>
            <label htmlFor="role-expert" className="role-expert">
              Expert <br />
              <input
                type="checkbox"
                id="role-expert"
                name="roleExpert"
                onChange={update}
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
            setNewUploadedFileName={setNewUploadedFileName}
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
          <button type="submit">Ajouter l'utilisateur</button>
        </div>
      </div>
    </form>
  );
}
