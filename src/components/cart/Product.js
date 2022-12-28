import { Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import { addProduct, removeProduct } from "../../redux/cart-slice"
import socket from "../../socket/connect"
import { client } from "../../socket/events"
const Product = ({ item }) => {
  const dispatch = useDispatch()

  const handleRemoveProduct = (data) => {
    const token = localStorage.getItem("token")
    dispatch(removeProduct(data))
    socket.emit(client.REMOVE_PRODUCT_FROM_CART, data, token)
  }
  const handleAddProduct = (data) => {
    console.log(data)
    const token = localStorage.getItem("token")
    dispatch(addProduct(item))
    socket.emit(client.INSERT_PRODUCT_TO_CART, data, token)
  }
  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        minWidth: "20%",
        // padding: "10px",
        height: "360px",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "100%",
          textAlign: "center",
          backgroundImage: "linear-gradient(45deg, #75bdaa, transparent)",
          padding: "10px",
        }}
      >
        PRODUCT DETAILS
      </div>
      <div style={{ padding: "10px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          <div style={{ fontWeight: "bold" }}>Product Name : </div>
          <div>{item.productName}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          <div style={{ fontWeight: "bold" }}>Price : </div>
          <div>₹{item.price}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          <div style={{ fontWeight: "bold" }}>Company : </div>
          <div>{item.companyName}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          <div style={{ fontWeight: "bold" }}>Category : </div>
          <div>{item.category}</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "5px",
          }}
        >
          {" "}
          <div style={{ fontWeight: "bold" }}>Quantity : </div>
          <div>{item.quantity ? item.quantity : 0}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <img
            alt="NOT"
            // src={`http://localhost:3001${item.imgUrl}`}
            src={item?.imgUrl}
            style={{ height: "50px" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
            gap: "3px",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            Total Amount : ₹{item?.totalAmount?.toFixed(3)}{" "}
          </div>
          <Button
            color="success"
            variant="outlined"
            // startIcon={<VisibilityIcon />}
            onClick={() => handleAddProduct(item)}
          >
            <AddIcon />
          </Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => handleRemoveProduct(item)}
          >
            <RemoveIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Product
