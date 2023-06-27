import { useState, useEffect } from "react";
import axios from "axios";
import Dropzone from "../../../services/hookDropzone";
// import inputValidationRules from "../../../services/inputValidationRules";
import Avatar0 from "../../../assets/avatar0.png";

export default function ModifyUser() {
  const [userData, setUserData] = useState([]);
  const [dropzoneImage, setDropzoneImage] = useState([]);
  const [newUploadedFileName, setNewUploadedFileName] = useState("");
  const [rolesData, setRolesData] = useState([]);

  const [targetValues, setTargetValues] = useState({
    firstName: userData.firstname,
    lastName: userData.lastname,
    email: userData.email,
    password: userData.password,
    photo: userData.photo,
    role: userData.role_id,
  });

  const update = (event) => {
    const target = event.currentTarget;

    setTargetValues({
      ...targetValues,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    });
  };

  // const subitOldAndNewValues = () => {
  //   if (targetValues.firstName === "")
  //     targetValues.firstName = userData.firstname;

  //   if (targetValues.lastName === "") targetValues.lastName = userData.lastname;

  //   if (targetValues.email === "") targetValues.email = userData.email;

  //   if (targetValues.photo === "") targetValues.photo = userData.photo;

  //   if (targetValues.role === "") targetValues.role = userData.role_id;

  //   if (targetValues.roleExpert === "")
  //     targetValues.roleExpert = userData.is_expert;
  // };

  const submit = (event) => {
    event.preventDefault();

    // subitOldAndNewValues();

    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/users/${userData.id}`, {
        firstname: targetValues.firstName,
        lastname: targetValues.lastName,
        photo: newUploadedFileName,
        email: targetValues.email,
        password: targetValues.password,
        role_id: targetValues.role,
        is_expert: targetValues.roleExpert,
        creation_date: "2023-02-03",
      })
      .then((response) =>
        console.info({ message: "Update user done!!!", response })
      )
      .catch((err) => console.error(err));
    console.info("Submited new values form with state:", targetValues);
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/roles`)
      .then((response) => setRolesData(response.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/users/4`)
      .then((result) => {
        console.info("User data on DB", result.data);
        setUserData(result.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <form className="modify-user-management" onSubmit={submit}>
      <div className="add-user-title-container">
        <h2 className="add-user-title">Modification d'utilisateur</h2>
        <div className="remove-button-container-2">
          <button type="button">Supprimer</button>
        </div>
      </div>
      <div className="user-management-container">
        <div className="input-container">
          <div className="input-fields">
            <div className="input-fields name-inputs-container">
              <label htmlFor="lastName" className="lastName">
                Nom <br />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Insérez votre nom"
                  onChange={update}
                  required
                />
              </label>
              <label htmlFor="firstName" className="firstName">
                Prénom <br />
                <input
                  type="text"
                  name="firstName"
                  placeholder="Insérez votre prénom"
                  onChange={update}
                  required
                />
              </label>
            </div>
            <label htmlFor="email">
              Email <br />
              <input
                type="email"
                name="email"
                className="input-email"
                placeholder="Insérez votre email"
                onChange={update}
                required
              />
            </label>
            <div className="roles-container-1">
              <div className="role-actuel-container">
                <div className="role">
                  <h4 className="role-actuel-title"> Rôle(s) actuel(s) </h4>
                  <p className="role-actuel-data">{userData[0]?.roles}</p>
                </div>
                <label htmlFor="role">
                  Rôle <br />
                  <select name="role" onChange={update} required>
                    <option value="0">Sélectionne votre rôle</option>
                    {rolesData
                      .filter((roleExpert) => roleExpert.role_name !== "expert")
                      .map((role) => (
                        <option key={role.id} value={role.id}>
                          {role.role_name}
                        </option>
                      ))}
                  </select>
                </label>
                <label htmlFor="roleExpert" className="role-expert">
                  <input type="checkbox" name="roleExpert" onChange={update} />
                  Expert(e)
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="profile-photo-container">
          <label htmlFor="profile-photo-input">
            <div className="img-container">
              {userData ? (
                <img
                  src={
                    userData
                      ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${
                          userData[0]?.photo
                        }`
                      : Avatar0
                  }
                  alt="profil"
                />
              ) : (
                <img
                  src={
                    dropzoneImage[0]?.preview
                      ? dropzoneImage[0]?.preview
                      : Avatar0
                  }
                  alt="profil"
                />
              )}
            </div>
            <Dropzone
              className="dropzone"
              dropzoneImage={dropzoneImage}
              setDropzoneImage={setDropzoneImage}
              setNewUploadedFileName={setNewUploadedFileName}
            />
          </label>
        </div>

        <div className="input-buttons-container">
          <div className="roles-container-2">
            <div className="role-actuel">
              <h4 className="role-actuel-title"> Rôle(s) actuel(s) </h4>
              <span className="role-actuel-data">{userData[0]?.roles}</span>
              <label htmlFor="role">
                Rôle <br />
                <select name="role" onChange={update} required>
                  <option value="0">Sélectionne votre rôle</option>
                  {rolesData
                    .filter((roleExpert) => roleExpert.role_name !== "expert")
                    .map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.role_name}
                      </option>
                    ))}
                </select>
              </label>
              <label htmlFor="role-expert" className="role-expert-2">
                <input type="checkbox" name="roleExpert" onChange={update} />
                Expert(e)
              </label>
            </div>
          </div>
          <div className="add-remove-buttons-container-1">
            <div className="add-button-container-1">
              <button type="submit">Valider les modifications</button>
            </div>
            <div className="remove-button-container-1">
              <button type="button">Supprimer</button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
