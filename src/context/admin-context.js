import { createContext, useContext, useState } from "react"
import { useDispatch } from "react-redux"
import { clearCart } from "../redux/cart-slice"

export const AdminContext = createContext({
  token: "",
  isLoggedIn: false,
  user: {},
  login: (token) => {},
  logout: () => {},
})

const AuthContext = (props) => {
  const [token, setToken] = useState(null)
  const [isLogin, setLogin] = useState(false)
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const loginHandelar = (token, userDetails) => {
    setLogin(true)
    setToken(token)
    setUser(userDetails)
    localStorage.setItem("token", token)
    localStorage.setItem("role", userDetails?.role)
  }
  const logouHandelart = () => {
    setToken(null)
    setLogin(false)
    setUser(null)
    localStorage.removeItem("token")
    dispatch(clearCart())
  }
  const contextValue = {
    token: token,
    isLoggedIn: isLogin,
    user: user,
    login: loginHandelar,
    logout: logouHandelart,
  }
  return (
    <AdminContext.Provider value={contextValue}>
      {props.children}
    </AdminContext.Provider>
  )
}
export default AuthContext
