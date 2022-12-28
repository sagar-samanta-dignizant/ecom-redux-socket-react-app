import React, { useState } from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Divider from "@mui/material/Divider"
import Select from "@mui/material/Select"
import InputAdornment from "@mui/material/InputAdornment"
import { useFormik } from "formik"
import { updateProduct } from "../../API/admin"
import { productUpdateRequest } from "../../socket/actions"
import * as yup from "yup"
import MenuItem from "@mui/material/MenuItem"

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-40%, -50%)",
  width: 700,
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
export default function UpdateProduct({ handleClose, show, data }) {
  const [open, setOpen] = React.useState(show)
  console.log(data)
  const handleCloseModal = () => {
    handleClose()
    setOpen(false)
  }
  const formik = useFormik({
    initialValues: {
      productName: data?.productName,
      price: data?.price,
      companyName: data?.companyName,
      category: data?.category,
    },
    validationSchema: schema,
    onSubmit: (values) => {
      values.id = data._id
      console.log(values)
      productUpdateRequest(values, (data) => {
        handleCloseModal()
      })
    },
  })
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
              <div style={{ fontWeight: "bold", textTransform: "uppercase" }}>
                Update Product
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
                  name="price"
                  size="small"
                  fullWidth
                  type="number"
                  value={formik.values.price}
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
                Update
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
