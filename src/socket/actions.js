import socket from "./connect"
import { client } from "./events"
const token = localStorage.getItem("token")
export const loginRequest = (data, cb) => {
  socket.emit(client.LOGIN, data, (values) => {
    cb(values.user, values.token)
  })
}

export const productAddRequest = (values, file) => {
  socket.emit(client.ADD_PRODUCT, { values, file }, token)
}
export const productUpdateRequest = (values, cb) => {
  socket.emit(client.UPDATE_PRODUCT, values, token)
  cb()
}
export const productRemoveRequest = (values) => {
  socket.emit(client.REMOVE_PRODUCT, values, token)
}
export const getAllExistProducts = (values, cb) => {}
export const addCuponCode = (values) => {
  socket.emit(client.CREATE_CUPON_CODE, values)
}
