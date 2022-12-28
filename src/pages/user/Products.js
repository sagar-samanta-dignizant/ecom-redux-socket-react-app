import { AddModeratorSharp } from "@mui/icons-material"
import { Button } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cupon from "../../components/cupon/Cupon"
import Product from "../../components/Product"
import AuthContext from "../../context/admin-context"
import socket from "../../socket/connect"
import { client, server } from "../../socket/events"

const Products = () => {
  const navigate = useNavigate()
  const context = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [cupon, setCupon] = useState({})
  let createdAt = new Date(cupon?.createdAt).toLocaleDateString("en-US")

  let expireAt = new Date(cupon?.expireAt).toLocaleDateString("en-US")
  const addData = (data) => {
    setProducts((prev) => {
      return [data, ...prev]
    })
  }
  // useEffect(() => {
  //   if (!context?.token) {
  //     navigate("/login")
  //   }
  // }, [])
  const updateData = (data) => {
    setProducts((prevData) => {
      const filterData = prevData.filter((product) => {
        return product._id !== data._id
      })
      return [...filterData, data]
    })
  }
  const deleteData = (id) => {
    setProducts((prev) => {
      const newData = prev.filter((p) => p._id !== id)
      return newData
    })
  }
  useEffect(() => {
    socket.emit(client.GET_ALL_PRODUCT, null, (recvdata) => {
      setProducts(recvdata)
    })
    socket.on(server.PRODUCT_CREATE_EVENTS, (data) => {
      console.log(data)
      if (data.action === "create") {
        addData(data.product)
      }
    })
    socket.on(server.SEND_CREATED_CUPON, (data) => {
      console.log(data)
      if (data.action === "cupon") {
        setCupon(data.cupon)
      }
    })
    socket.on(server.PRODUCT_UPDATE_EVENTS, (data) => {
      if (data.action === "update") {
        updateData(data.product)
      }
    })
    socket.on(server.PRODUCT_DELETE_EVENTS, (data) => {
      if (data.action === "delete") {
        deleteData(data.product)
      }
    })
    return () => {
      socket.off(server.PRODUCT_CREATE_EVENTS)
      socket.off(server.PRODUCT_DELETE_EVENTS)
      socket.off(server.PRODUCT_UPDATE_EVENTS)
      socket.off(client.GET_ALL_PRODUCT)
    }
  }, [])

  useEffect(() => {
    socket.emit(client.GET_CUPON_CODE, { text: "cupon add" }, (value) => {
      setCupon(value)
    })
    return () => {
      socket.off(client.GET_CUPON_CODE)
    }
  }, [])
  return (
    <div style={{ minHeight: "90vh", marginTop: "2rem" }}>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "2rem",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        OUR PRODUCTS
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flex: 5,
            flexWrap: "wrap",
            // marginLeft: "1rem",
            padding: "10px",
            // border: "1px solid red",
            minHeight: "100vh",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        >
          {products.length > 0 &&
            products?.map((item, index) => <Product key={index} item={item} />)}
        </div>{" "}
        <Cupon
          code={cupon?.code}
          createdAt={createdAt}
          expireAt={expireAt}
          amount={cupon?.amount}
        />
      </div>
    </div>
  )
}

export default Products
