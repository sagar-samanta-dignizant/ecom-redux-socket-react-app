import axios from "axios"
import socket from "../socket/connect"
import { ADMIN } from "./util/endpoint"

const token = localStorage.getItem("authToken")

export const addproduct = async (data, callBack) => {
  console.log("data", data)
  data.file = data.image
  const formData = new FormData()
  formData.append("file", data.image)
  formData.append("productName", data.name)
  formData.append("price", data.price)
  formData.append("companyName", data.companyName.label)
  formData.append("category", data.categoryName.label)
  formData.append("size", data.size ? data.size : "Not found")
  formData.append("description", data.description)
  // socket.emit("addProduct", { data: data })
  await axios({
    method: "POST",
    url: ADMIN.ADD_PRODUCT,
    data: formData,
    headers: { "x-access-token": `${token}` },
  })
    .then((res) => {
      callBack(null, res)
    })
    .catch((err) => {
      callBack(err, null)
    })
}
export const updateProduct = async (data, callBack) => {
  const reqUrl = ADMIN.UPDATE_PRODUCT + `/${data.id}`
  await axios({
    method: "POST",
    url: reqUrl,
    data: data,
    headers: { "x-access-token": `${token}` },
  })
    .then((res) => {
      callBack(null, res)
    })
    .catch((err) => {
      callBack(err, null)
    })
}
export const deleteProduct = async (data, callBack) => {
  const reqUrl = ADMIN.DELETE_PRODUCT + `/${data._id}`

  await axios({
    method: "DELETE",
    url: reqUrl,
    headers: { "x-access-token": `${token}` },
  })
    .then((res) => {
      callBack(null, res)
    })
    .catch((err) => {
      callBack(err, null)
    })
}
