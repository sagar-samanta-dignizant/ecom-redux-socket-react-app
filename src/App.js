import "./App.css"
import { Navigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import socket from "./socket/connect"
import { client } from "./socket/events"
import { AdminContext } from "./context/admin-context"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import { default as AdminHome } from "./pages/admin/Home"
import { default as AdminProducts } from "./pages/admin/Product"
import Wrapper from "./Layout/Wrapper"
import Products from "./pages/user/Products"
import Cart from "./pages/user/Cart"
import Home from "./pages/user/Home"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
function App() {
  const context = useContext(AdminContext)
  const { isLoggedIn, user } = context
  const role = user?.role === "ADMIN" ? "/admin/home" : "/user/home"
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return
    socket.emit(client.GET_USER_DETAILS, token, (user) => {
      context.login(token, user)
    })
  }, [isLoggedIn])
  return (
    <BrowserRouter>
      <Routes>
        {!isLoggedIn ? (
          <Route exact path="/" element={<Login />} />
        ) : (
          <Route exact path="/" element={<Navigate to={role} replace />} />
        )}

        {isLoggedIn ? (
          <Route
            path="/admin/home"
            element={
              <Wrapper>
                <AdminHome />
              </Wrapper>
            }
          />
        ) : (
          <Route
            exact
            path="/admin/home"
            element={<Navigate to="/" replace />}
          />
        )}
        {isLoggedIn ? (
          <Route
            path="/admin/home/products"
            element={
              <Wrapper>
                <AdminProducts />
              </Wrapper>
            }
          />
        ) : (
          <Route
            exact
            path="/admin/home/products"
            element={<Navigate to="/" replace />}
          />
        )}
        {isLoggedIn ? (
          <Route
            path="/user/home/products"
            element={
              <Wrapper>
                <Products />
              </Wrapper>
            }
          />
        ) : (
          <Route
            exact
            path="/user/home/products"
            element={<Navigate to="/" replace />}
          />
        )}
        {isLoggedIn ? (
          <Route
            path="/user/home"
            element={
              <Wrapper>
                <Home />
              </Wrapper>
            }
          />
        ) : (
          <Route
            exact
            path="/user/home"
            element={<Navigate to="/" replace />}
          />
        )}
        {isLoggedIn ? (
          <Route
            path="/user/cart"
            element={
              <Wrapper>
                <Cart />
              </Wrapper>
            }
          />
        ) : (
          <Route
            exact
            path="/user/cart"
            element={<Navigate to="/" replace />}
          />
        )}

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App
