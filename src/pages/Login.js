import React, { useState, useEffect, useContext } from "react"
import classes from "./Login.module.css"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import * as yup from "yup"
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom"

import { loginRequest } from "../socket/actions"
import { AdminContext } from "../context/admin-context"
let schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(/@[^.]*\./)
    .required("Email is required"),
  password: yup.string().max(255).required("Password is required"),
})
const Login = () => {
  const navigate = useNavigate()
  const context = useContext(AdminContext)
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSubmit(values)
    },
    validationSchema: schema,
  })
  const handleSubmit = async (data) => {
    loginRequest(data, (user, token) => {
      console.log(user, token)
      context.login(token, user)
      if (user?.role === "ADMIN") {
        navigate("/admin/home", {
          state: {
            role: user?.role,
            user: user?.name,
          },
        })
      } else {
        navigate("/user/home", {
          state: {
            role: user?.role,
            user: user?.name,
          },
        })
      }
    })
  }
  // useEffect(() => {
  //   if (!context.isLoggedIn) {
  //     navigate("/login")
  //   }
  // }, [])
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.title}>Login Here</div>
        <div className={classes.inputWrapper}>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            required
            onChange={formik.handleChange}
            value={formik.values.email}
            error={Boolean(formik.errors.email && formik.touched.email)}
            helperText={formik.errors.email && formik.touched.email}
          />
        </div>
        <div className={classes.inputWrapper}>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            name="password"
            required
            onChange={formik.handleChange}
            value={formik.values.password}
            error={Boolean(formik.errors.password && formik.touched.password)}
            helperText={formik.errors.password && formik.touched.password}
          />
        </div>

        <div>
          <Button
            type="submit"
            onClick={formik.handleSubmit}
            variant="contained"
          >
            Login
          </Button>
          .
        </div>
      </div>
    </div>
  )
}

export default Login
