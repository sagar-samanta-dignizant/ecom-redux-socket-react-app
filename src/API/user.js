import axios from "axios"

const getAllProducts = async (req, cb) => {
  await axios(req)
    .then((res) => {
      cb(null, res)
    })
    .catch((err) => {
      cb(err, null)
    })
}
export default getAllProducts
