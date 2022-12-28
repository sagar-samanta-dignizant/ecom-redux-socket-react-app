import React, { useEffect, useState } from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import { Checkbox, TextField } from "@mui/material"
import PaidIcon from "@mui/icons-material/Paid"
import socket from "../../socket/connect"
import { client, server } from "../../socket/events"
import { useRef } from "react"
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-40%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  //   border: "2px solid white",
  boxShadow: 24,
  p: 4,
}
const Product = ({ productName, quantity, price, totalAmount }) => {
  return (
    <div
      style={{ boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "5px" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bold" }}>Product Name</div>
        <div>{productName}</div>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bold" }}>Quantity</div>
        <div>{quantity}</div>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bold" }}>Price</div>
        <div>₹{price?.toFixed(2)}</div>
      </div>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "bold" }}>Total Amount</div>
        <div>₹{totalAmount?.toFixed(2)}</div>
      </div>
    </div>
  )
}

const Order = ({
  handlePlaceOrderModalClose,
  show,
  cart,
  totalAmountTopay,
}) => {
  const [open, setOpen] = React.useState(show)
  const [isCuponApplied, setCuponApplied] = useState(false)
  const [cupon, setCupon] = useState()
  const [appliedCoupon, setAppliedCoupon] = useState("")
  const [finalAmount, setFinalAmount] = useState(totalAmountTopay)
  const [tokenVerified, setTokenVerified] = useState()
  const handleCloseModal = () => {
    handlePlaceOrderModalClose(false)
    setOpen(false)
  }
  const handleProccedPay = () => {
    alert(`Succesfull pay ${finalAmount}`)
    handlePlaceOrderModalClose(false)
    setOpen(false)
  }
  useEffect(() => {
    if (isCuponApplied && cupon) {
      setFinalAmount((prevAmount) => {
        let amount = Number(prevAmount)
        let couponAmount = Number(cupon)
        let newCuponAppliedAmount = (amount * couponAmount) / 100
        return newCuponAppliedAmount
      })
    } else {
      setFinalAmount(totalAmountTopay)
    }
  }, [isCuponApplied, cupon])

  // useEffect(() => {
  //   socket.emit(client.GET_CUPON_CODE, { text: "coupon" }, (data) => {
  //     console.log(data)
  //     setCupon(data?.amount)
  //   })
  // }, [])
  const label = { inputProps: { "aria-label": "Checkbox demo" } }
  const handleApplyCoupon = () => {
    console.log(appliedCoupon)
    socket.emit(client.VERIFY_COUPON, appliedCoupon, (data) => {
      console.log(data)
      if (data.Message) {
        setTokenVerified(data.Message)
        setCupon(null)
      } else if (data?.coupon) {
        setTokenVerified(false)
        setCupon(data?.coupon.amount)
        setAppliedCoupon("")
      }
    })
  }
  return (
    <div>
      {" "}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 700,
        }}
      >
        <Fade in={open}>
          <Box sx={style} style={{ border: "none", outline: "none" }}>
            <div
              style={{
                // boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                width: "100%",
                // padding: "10px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  marginBottom: "20px",
                  backgroundColor: "gray",
                  padding: "10px",
                }}
              >
                Product Details
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "space-evenly",
                  marginBottom: "20px",
                }}
              >
                {cart?.map((p, i) => (
                  <Product
                    productName={p.productName}
                    price={p.price}
                    quantity={p.quantity}
                    totalAmount={p.totalAmount}
                  />
                ))}
              </div>
              <hr />
              <div style={{ fontWeight: "bold" }}>
                Amount To Pay :
                <span
                  style={{
                    color: "red",
                    marginLeft: "5px",
                    marginRight: "10px",
                  }}
                >
                  ₹{finalAmount?.toFixed(2)}
                </span>
                {cupon && (
                  <span style={{ color: "green" }}>
                    (Cupon Applied {cupon ? cupon : 0}% discount)
                  </span>
                )}
              </div>
              <hr />

              <div
                style={{
                  display: "flex",
                  // justifyContent: "space-between",
                  gap: "15px",
                  marginBottom: "1rem",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: "bold" }}>Apply Cupon Code</div>{" "}
                <Checkbox
                  {...label}
                  onChange={(e) => {
                    setFinalAmount(totalAmountTopay)
                    setCuponApplied((prev) => {
                      if (prev) {
                        setCupon(false)
                        return !prev
                      } else {
                        return !prev
                      }
                    })
                  }}
                  checked={isCuponApplied}
                />
                {isCuponApplied && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      id="code"
                      name="code"
                      label="Coupon Code"
                      variant="standard"
                      placeholder="Enter Code Here"
                      value={appliedCoupon}
                      onChange={(e) => {
                        if (!e.target.value) {
                          setTokenVerified(false)
                        }
                        setAppliedCoupon(e.target.value)
                      }}
                    />
                    <Button variant="outlined" onClick={handleApplyCoupon}>
                      Apply
                    </Button>
                  </div>
                )}
              </div>
              {tokenVerified && isCuponApplied && appliedCoupon ? (
                <div
                  style={{ textAlign: "right", width: "1005", color: "red" }}
                >
                  {tokenVerified}
                </div>
              ) : (
                ""
              )}
              <hr />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "1rem",
                }}
              >
                <Button
                  variant="outlined"
                  endIcon={<PaidIcon />}
                  onClick={handleProccedPay}
                >
                  Procced To pay
                </Button>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default Order
