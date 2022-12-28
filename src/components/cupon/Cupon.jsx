import React, { useContext } from "react"
import AuthContext from "../../context/admin-context"

const Cupon = ({ code, createdAt, expireAt, amount }) => {
  const context = useContext(AuthContext)
  return (
    <div
      style={{
        flex: 1,
        // marginTop: "1rem",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        height: "350px",
        // alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "10px",
          backgroundColor: "gray",
          width: "100%",
          textAlign: "center",
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Available COUPON
      </div>
      {code && createdAt && expireAt && amount ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "1rem",
            padding: "0pc 15px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: "bold" }}>Code: </div>
            <div>{code}</div>{" "}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: "bold" }}>Deduction: </div>
            <div>{amount}%</div>{" "}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: "bold" }}>Creation Date : </div>
            <div>{createdAt}</div>{" "}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ fontWeight: "bold" }}>Expire Date : </div>
            <div>{expireAt}</div>{" "}
          </div>
        </div>
      ) : (
        <div style={{ width: "100%", textAlign: "center", marginTop: "15px" }}>
          No Cupon Available
        </div>
      )}
    </div>
  )
}

export default Cupon
