import { Outlet } from "react-router-dom"
import NavBar from "./NavBar"

export default function Wrapper(props) {
  return (
    <>
      <div id="detail">
        <NavBar />
        <div style={{ margin: "2rem" }}>
          {/* <Outlet /> */}
          {props.children}
          <div>footer</div>
        </div>
      </div>
    </>
  )
}
