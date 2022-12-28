import React, { useState } from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
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

export default function ViewProductModal({
  handleCloseProductViewModal,
  show,
  item,
}) {
  const [open, setOpen] = React.useState(show)
  const handleCloseModal = () => {
    handleCloseProductViewModal()
    setOpen(false)
  }
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} style={{ border: "none", outline: "none" }}>
            <div
              style={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                width: "100%",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                Product Details
              </div>
              <hr />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>Product Name : </div>
                <div>{item?.productName}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                }}
              >
                <div>Price : </div>
                <div>{item?.price}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                }}
              >
                <div>Company : </div>
                <div>{item?.companyName}</div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                }}
              >
                <div>Category : </div>
                <div>{item?.category}</div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "5px",
                }}
              >
                {" "}
                <div>Description : </div>
                <div>{item?.description || "NA"}</div>
              </div>
              <div>
                <img alt="NOT" src={item?.imgUrl} style={{ height: "50px" }} />
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  justifyContent: "space-evenly",
                }}
              ></div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
