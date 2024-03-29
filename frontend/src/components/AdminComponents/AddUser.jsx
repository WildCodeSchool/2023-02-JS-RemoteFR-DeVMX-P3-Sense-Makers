import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";
import Dropzone from "../../services/hookDropzone";
import inputValidationRules from "../../services/inputValidationRules";

export default function AddUser({ setShowAddUser }) {
  const [dropzoneImage, setDropzoneImage] = useState([]);
  const [newUploadedFileName, setNewUploadedFileName] = useState("");
  const [rolesData, setRolesData] = useState([]);
  const [requireSelect, setRequiredSelect] = useState(false);
  const { t } = useTranslation();

  const generatePassword = () => {
    const pwd =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    return pwd;
  };

  const [targetValues, setTargetValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photo: newUploadedFileName,
    role: "",
    roleExpert: false,
  });

  const update = (event) => {
    const target = event.currentTarget;

    setTargetValues({
      ...targetValues,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
      photo: newUploadedFileName,
    });
  };

  useEffect(() => {
    setTargetValues({
      ...targetValues,
      photo: newUploadedFileName,
    });
  }, [newUploadedFileName]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/roles`, {
        withCredentials: true,
      })
      .then((response) => setRolesData(response.data))
      .catch((err) => console.error(err));
  }, []);

  const submit = (event) => {
    event.preventDefault();

    const isValidForm = Object.values(inputValidationRules(targetValues)).every(
      (key) => key
    );
    if (isValidForm) {
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_URL}/users`,
          {
            firstname: targetValues.firstName,
            lastname: targetValues.lastName,
            photo: newUploadedFileName || "default_avatar.png",
            email: targetValues.email,
            password: generatePassword(),
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 201 && !targetValues.roleExpert) {
            axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/users/${
                response.data.insertId
              }/role`,
              {
                roleId: parseInt(targetValues.role, 10),
              },
              {
                withCredentials: true,
              }
            );
          } else {
            axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/users/${
                response.data.insertId
              }/role`,
              {
                roleId: parseInt(targetValues.role, 10),
              },
              {
                withCredentials: true,
              }
            );
            axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/users/${
                response.data.insertId
              }/role`,
              {
                roleId: 3,
              },
              {
                withCredentials: true,
              }
            );
          }
          if (response.status === 201) {
            axios
              .post(
                `${import.meta.env.VITE_BACKEND_URL}/sendmail`,
                {
                  id: response.data.insertId,
                  email: targetValues.email,
                },
                {
                  withCredentials: true,
                }
              )
              .then((resp) => {
                if (resp.status === 200) {
                  setShowAddUser(false);
                  toast.success(t("Toast.userAddNotif"), {
                    color: "white",
                    backgroundColor: "green",
                    icon: "✔️",
                  });
                }
              })
              .catch((err) => {
                console.error(err);
              });
          }
        })
        .catch((err) => {
          console.error(err);
          toast.error(t("Toast.userNotAddNotif"), {
            color: "white",
            backgroundColor: "red",
            icon: "❌",
          });
        });
    } else {
      const invalidInputsTargets = inputValidationRules(targetValues);
      if (!invalidInputsTargets.role) {
        setRequiredSelect(true);
      }
    }
  };
  return (
    <form className="add-user-management" onSubmit={submit}>
      <div className="add-user-title-container">
        <h2 className="add-user-title">{t("addUser.add")}</h2>
        <div className="close-modal-button-container">
          <div className="close-btn">
            <button type="button" onClick={() => setShowAddUser(false)}>
              {" "}
              X{" "}
            </button>
          </div>
        </div>
      </div>
      <div className="user-management-container">
        <div className="input-container">
          <div className="input-fields">
            <div className="input-fields name-inputs-container">
              <label htmlFor="lastName" className="lastName">
                {t("addUser.lastname")} <br />
                <input
                  type="text"
                  name="lastName"
                  placeholder={t("addUser.placeholderLastname")}
                  onChange={update}
                  required
                />
              </label>
              <label htmlFor="firstName" className="firstName">
                {t("addUser.firstname")} <br />
                <input
                  type="text"
                  name="firstName"
                  placeholder={t("addUser.placeholderFirstname")}
                  onChange={update}
                  required
                />
              </label>
            </div>
            <label htmlFor="email">
              {t("addUser.email")} <br />
              <input
                type="email"
                name="email"
                className="input-email"
                placeholder={t("addUser.placeholderEmail")}
                onChange={update}
                required
              />
            </label>
            <p>{t("addUser.passwordAuto")}</p>
            <div className="roles-container-1">
              <label htmlFor="role">
                {t("addUser.role")} <br />
                <select
                  className={requireSelect ? "require-select" : ""}
                  name="role"
                  defaultValue={t("addUser.defaultRole")}
                  onChange={update}
                  onClick={() => setRequiredSelect(false)}
                >
                  <option disabled>
                    {t("addUser.")}
                    {t("addUser.defaultRole")}
                  </option>
                  {rolesData
                    .filter((roleExpert) => roleExpert.role_name !== "Expert")
                    .map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.role_name}
                      </option>
                    ))}
                </select>
              </label>
              <label htmlFor="role-expert" className="role-expert">
                {t("addUser.expert")} <br />
                <input type="checkbox" name="roleExpert" onChange={update} />
              </label>
            </div>
          </div>
        </div>
        <div className="profile-photo-container">
          <label htmlFor="profile-photo-input">
            <div className="img-container">
              <img
                src={
                  dropzoneImage[0]?.preview
                    ? dropzoneImage[0]?.preview
                    : `${
                        import.meta.env.VITE_BACKEND_URL
                      }/assets/images/default_avatar.png`
                }
                alt="profil"
              />
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
            <label htmlFor="role">
              {t("addUser.role")} <br />
              <select
                className={requireSelect ? "require-select" : ""}
                name="role"
                defaultValue={t("addUser.defaultRole")}
                onChange={update}
                onClick={() => setRequiredSelect(false)}
              >
                <option disabled>{t("addUser.defaultRole")}</option>
                {rolesData
                  .filter((roleExpert) => roleExpert.role_name !== "Expert")
                  .map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.role_name}
                    </option>
                  ))}
              </select>
            </label>
            <label htmlFor="role-expert" className="role-expert-2">
              <input type="checkbox" name="roleExpert" onChange={update} />
              {t("addUser.expert")}
            </label>
          </div>
          <div className="add-button-container">
            <button type="submit">{t("addUser.addUser")}</button>
          </div>
        </div>
      </div>
    </form>
  );
}

AddUser.propTypes = {
  setShowAddUser: PropTypes.func.isRequired,
};
