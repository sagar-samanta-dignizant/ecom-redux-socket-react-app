import React, { useContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AdminContext } from "../../context/admin-context"
import myToken from "../../utils/token"

const Home = () => {
  const naigate = useNavigate()
  const context = useContext(AdminContext)
  const { user } = context
  // useEffect(() => {
  //   if (!context.token) {
  //     naigate("/login")
  //   }
  // }, [])

  return (
    <div style={{ minHeight: "60vh" }}>
      Wellcome {user?.name} as a {user?.role}{" "}
    </div>
  )
}

export default Home
