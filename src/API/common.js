import axios from "axios"

export const sendRequest = async (reqBody, callBack) => {
  await axios({
    ...reqBody,
  })
    .then((response) => {
      callBack(null, response)
    })
    .catch((err) => {
      callBack(err, null)
    })
}
