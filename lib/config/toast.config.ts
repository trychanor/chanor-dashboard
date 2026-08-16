import { Bounce, ToastPosition } from "react-toastify";

export const TOAST_PROPERTIES = {
  position: "top-left" as ToastPosition,
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Bounce,
};
