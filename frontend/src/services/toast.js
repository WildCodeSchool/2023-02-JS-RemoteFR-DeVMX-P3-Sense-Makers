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
