import { toast } from "react-toastify";

export function emailSend() {
  toast.success("email envoyé", {
    color: "white",
    backgroundColor: "green",
    icon: "✔️",
  });
}
export function emailNotSend() {
  toast.success("l'email n'existe pas", {
    color: "white",
    backgroundColor: "red",
    icon: "❌",
  });
}
export function dataNotValide() {
  toast.error("email ou mot de passe incorrect", {
    color: "white",
    backgroundColor: "red",
    icon: "❌",
  });
}

export function passwordReinit() {
  toast.success("Mot de passe reinitialisé", {
    color: "white",
    backgroundColor: "green",
    icon: "✔️",
  });
}
export function errorSamePassword() {
  toast.error("les mot de passe ne sont pas similaires!", {
    color: "white",
    backgroundColor: "red",
    icon: "❌",
  });
}

export function notifyDecision() {
  toast.success("décision postée", {
    color: "white",
    backgroundColor: "green",
    icon: "✔️",
  });
}

export function userAddNotif() {
  toast.success("utilisateur ajouté", {
    color: "white",
    backgroundColor: "green",
    icon: "✔️",
  });
  toast.success("email envoyé", {
    color: "white",
    backgroundColor: "green",
    icon: "✔️",
  });
}

export function userNotAddNotif() {
  toast.error("l'email existe déjà", {
    color: "white",
    backgroundColor: "red",
    icon: "❌",
  });
}

export function userModifNotif() {
  toast.success("utilisateur modifié", {
    color: "white",
    backgroundColor: "green",
    icon: "✔️",
  });
}

export function userNotModifyNotif() {
  toast.error("Aucune modification effectué", {
    color: "white",
    backgroundColor: "red",
    icon: "❌",
  });
}

export function userDeleteNotif() {
  toast.success("utilisateur supprimé", {
    color: "white",
    backgroundColor: "green",
    icon: "✔️",
  });
}

export function commentAdd() {
  toast.success("commentaire ajouté", {
    color: "white",
    backgroundColor: "green",
    icon: "✔️",
  });
}
export function firstDecisionAdd() {
  toast.success("première décision ajoutée", {
    color: "white",
    backgroundColor: "green",
    icon: "✔️",
  });
}
export function finalDecisionAdd() {
  toast.success("validation prise en compte", {
    color: "white",
    backgroundColor: "green",
    icon: "✔️",
  });
}

export default {
  emailSend,
  emailNotSend,
  dataNotValide,
  passwordReinit,
  errorSamePassword,
  notifyDecision,
  userAddNotif,
  userNotAddNotif,
  userModifNotif,
  userNotModifyNotif,
  userDeleteNotif,
  commentAdd,
  firstDecisionAdd,
  finalDecisionAdd,
};
