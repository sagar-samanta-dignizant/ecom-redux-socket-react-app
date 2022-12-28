import React from "react"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Backdrop from "@mui/material/Backdrop"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Divider from "@mui/material/Divider"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { useFormik } from "formik"
import * as yup from "yup"
import DateFnsUtils from "@date-io/date-fns"
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers"
import { addCuponCode } from "../../socket/actions"

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-40%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  //   border: "2px solid white",
  boxShadow: 24,
  p: 4,
}

const validationSchema = yup.object({
  code: yup.string().required("Required"),
  amount: yup.number().required("Required").positive(),
  createdAt: yup.string().nullable().required("Required"),
  expireAt: yup.string().nullable().required("Required"),
})

const AddCupon = ({ show, handleCloseCuponModal }) => {
  const formik = useFormik({
    initialValues: {
      code: "",
      amount: "",
      createdAt: null,
      expireAt: null,
    },

    onSubmit: async (value) => {
      await addCuponCode(value)
      handleCloseCuponModal(false)
    },
    validationSchema: validationSchema,
  })
  const [open, setOpen] = React.useState(show)
  const handleCloseModal = () => {
    setOpen(false)
    handleCloseCuponModal(false)
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
              <div>Add Cupon </div>
              <div style={{ cursor: "pointer" }} onClick={handleCloseModal}>
                X
              </div>
            </div>
            <Divider variant="fullWidth" style={{ marginBottom: "2rem" }} />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  //   type="da"
                  size="small"
                  label="Cupon Code"
                  variant="standard"
                  onChange={formik.handleChange}
                  name="code"
                  fullWidth
                  value={formik.values.code}
                  error={formik.touched.code && Boolean(formik.errors.code)}
                  helperText={formik.touched.code && formik.errors.code}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  id="outlined-basic"
                  type="number"
                  size="small"
                  label="Amount"
                  variant="standard"
                  onChange={formik.handleChange}
                  name="amount"
                  fullWidth
                  value={formik.values.amount}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  helperText={formik.touched.amount && formik.errors.amount}
                />
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    style={{ marginTop: "-1px" }}
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    name="createdAt"
                    id="createdAt"
                    error={
                      formik.touched.createdAt &&
                      Boolean(formik.errors.createdAt)
                    }
                    helperText={
                      formik.touched.createdAt && formik.errors.createdAt
                    }
                    label="Created At"
                    value={formik.values.createdAt}
                    onChange={(v) => {
                      let isoData = v.toISOString()
                      formik.setFieldValue("createdAt", isoData)
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    style={{ marginTop: "-1px" }}
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    name="expireAt"
                    id="expireAt"
                    error={
                      formik.touched.expireAt && Boolean(formik.errors.expireAt)
                    }
                    helperText={
                      formik.touched.expireAt && formik.errors.expireAt
                    }
                    label="Expire At"
                    value={formik.values.expireAt}
                    onChange={(v) => {
                      let isoData = v.toISOString()
                      formik.setFieldValue("expireAt", isoData)
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
            </Grid>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Button
                fullWidth
                style={{
                  border: "1px solid #6767a3",
                  marginTop: "20px",
                  padding: "5px",
                  width: "200px",
                }}
                variant="outlined"
                onClick={formik.handleSubmit}
              >
                Add
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}

export default AddCupon
