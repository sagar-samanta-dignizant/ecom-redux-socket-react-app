import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
export const SuccessMessage = (message) => {
  toast.success(message, { autoClose: 2000, closeButton: true })
}
export const ErrorMessage = (message) => {
  toast.error(message, { autoClose: 2000, closeButton: true })
}
export const WarnMessage = (message) => {
  toast.warn(message, { autoClose: 2000, closeButton: true })
}
