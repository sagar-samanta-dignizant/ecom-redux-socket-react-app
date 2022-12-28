import React, { useContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AdminContext } from "../../context/admin-context"

const Home = () => {
  const navigate = useNavigate()
  const context = useContext(AdminContext)
  console.log(context)
  // useEffect(() => {
  //   if (!context.token) {
  //     navigate("/login")
  //   }
  // }, [])
  return (
    <div style={{ minHeight: "60vh" }}>
      Wellcome {context?.user?.name} as a {context?.user?.role}{" "}
    </div>
  )
}

export default Home
