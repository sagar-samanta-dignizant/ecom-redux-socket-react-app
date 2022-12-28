import React, { useState, useEffect } from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Divider from "@mui/material/Divider"
// import Select from "react-select"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import classes from "./AddProductModal.module.css"
import { useFormik } from "formik"
import { Input, InputAdornment } from "@mui/material"
import { addproduct } from "../../API/admin"
import { productAddRequest } from "../../socket/actions"
import socket from "../../socket/connect"
import { client, server } from "../../socket/events"
import InputLabel from "@mui/material/InputLabel"
import * as yup from "yup"
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-40%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  //   border: "2px solid white",
  boxShadow: 24,
  p: 4,
}
let schema = yup.object().shape({
  productName: yup.string().required("Required"),
  price: yup.number().required("Required").positive(),
  companyName: yup.string().required("Required"),
  category: yup.string().required("Required"),
})
export default function AddProductModal({ handleCloseProductModal, show }) {
  const [open, setOpen] = React.useState(show)
  const [image, setImage] = useState(false)
  const [isTypping, setTypping] = useState(false)
  const [imgError, setImageError] = useState(false)

  const handleCloseModal = () => {
    handleCloseProductModal()
    setOpen(false)
  }
  const formik = useFormik({
    initialValues: {
      productName: "",
      price: "",
      companyName: "",
      category: "",
      description: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (!image) {
        return setImageError(true)
      }
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onload = async () => {
        const file = reader.result
        await productAddRequest(values, file)
        setImageError(false)
        handleCloseModal()
      }
    },
  })
  useEffect(() => {
    socket.on(server.TYPPING_STARTED_BY_USER, () => {
      setTypping(true)
    })
    socket.on(server.TYPPING_STOPPED_BY_USER, () => {
      setTypping(false)
    })
  }, [])

  const handleTypping = () => {
    socket.emit(client.TYPPING_STARTED)
    let timeout
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      socket.emit(client.TYPPING_STOPPED)
    }, 1000)
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
                display: "flex",
                justifyContent: "space-between",
                marginBlockEnd: "2rem",
              }}
            >
              <div></div>
              <div>
                Add Product{" "}
                <span style={{ color: "green" }}>
                  {isTypping ? "Typping..." : ""}
                </span>
              </div>
              <div style={{ cursor: "pointer" }} onClick={handleCloseModal}>
                X
              </div>
            </div>
            <Divider variant="fullWidth" style={{ marginBottom: "2rem" }} />
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <TextField
                  id="outlined-basic"
                  label="Product Name"
                  variant="outlined"
                  name="productName"
                  fullWidth
                  size="small"
                  value={formik.values.productName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.productName &&
                    Boolean(formik.errors.productName)
                  }
                  helperText={
                    formik.touched.productName && formik.errors.productName
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">₹</InputAdornment>
                    ),
                  }}
                  id="outlined-basic"
                  label="Price"
                  variant="outlined"
                  value={formik.values.price}
                  name="price"
                  size="small"
                  fullWidth
                  type="number"
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  onChange={formik.handleChange}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formik.values.category}
                  label="Category Name"
                  name="category"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.category && Boolean(formik.errors.category)
                  }
                  helperText={formik.touched.category && formik.errors.category}
                >
                  <MenuItem value={"APPLE"}>APPLE</MenuItem>
                  <MenuItem value={"HTC"}>HTC</MenuItem>
                  <MenuItem value={"LG"}>LG</MenuItem>
                  <MenuItem value={"ANDROID"}>ANDROID</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  labelId="demo-simple-select-label-5"
                  id="demo-simple-select-5"
                  value={formik.values.companyName}
                  label="Company Name"
                  name="companyName"
                  onChange={formik.handleChange}
                  error={
                    formik.touched.companyName &&
                    Boolean(formik.errors.companyName)
                  }
                  helperText={
                    formik.touched.companyName && formik.errors.companyName
                  }
                >
                  <MenuItem value="POCO">POCO</MenuItem>
                  <MenuItem value={"VIVO"}>VIVO</MenuItem>
                  <MenuItem value={"LAVA"}>LAVA</MenuItem>
                  <MenuItem value={"MOTO"}>MOTO</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <input
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Upload Image"
                  name="image"
                  //   value={formik.values.image}
                  onChange={(event) => {
                    setImage(event.currentTarget.files[0])
                    if (event.currentTarget.files[0]) {
                      setImageError(false)
                    }
                  }}
                  type="file"
                />
                {imgError ? (
                  <div
                    style={{
                      color: "red",
                      fontSize: "13px",
                    }}
                  >
                    Required
                  </div>
                ) : (
                  ""
                )}
              </Grid>
              <Grid item xs={8}>
                <TextField
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  name="description"
                  fullWidth
                  rows={5}
                  value={formik.values.description}
                  onChange={(v) => {
                    handleTypping()
                    formik.setFieldValue("description", v.target.value)
                  }}
                />
              </Grid>
            </Grid>
            <div
              style={{
                widyh: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <Button
                style={{ width: "200px" }}
                variant="contained"
                onClick={formik.handleSubmit}
              >
                Save
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
