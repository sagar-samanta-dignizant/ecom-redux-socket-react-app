import { Button } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import socket from "../socket/connect"
import { client, server } from "../socket/events"
import ViewProductModal from "./ViewProduct"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { useDispatch } from "react-redux"
import { addProduct } from "../redux/cart-slice"
const Product = ({
  item,
  handleSelecteProductForEdit,
  handleSelecteProductForDelete,
}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [product, setProduct] = useState()
  const handleCloseProductViewModal = () => {
    setShow(false)
  }
  const handleShowViewModal = (data) => {
    socket.emit(client.VIEW_PRODUCT, data, (value) => {
      setProduct(value)
    })
    setShow(true)
  }

  const handleAddToCart = (item) => {
    console.log(item)
    const token = localStorage.getItem("token")
    dispatch(addProduct(item))
    socket.emit(client.INSERT_PRODUCT_TO_CART, item, token)
  }

  const role = localStorage.getItem("role")
  const handleSelectProduct = (data) => {
    handleSelecteProductForEdit(data)
  }
  const handleDeleteProduct = (data) => {
    handleSelecteProductForDelete(data)
  }
  return (
    <div
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        minWidth: "20%",
        // padding: "10px",
        height: "350px",
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
          <div>₹ {item.price}</div>
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
        <div>
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
          {role !== "USER" && (
            <>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => handleSelectProduct(item)}
              >
                Edit
              </Button>
              <Button
                fullWidth
                color="error"
                variant="outlined"
                onClick={() => handleDeleteProduct(item)}
              >
                Delete
              </Button>
            </>
          )}
          <Button
            fullWidth
            size="small"
            color="success"
            variant="outlined"
            // startIcon={<VisibilityIcon />}
            onClick={() => handleShowViewModal(item)}
          >
            View
          </Button>
          {role === "USER" && (
            <Button
              fullWidth
              size="small"
              color="secondary"
              variant="outlined"
              startIcon={<AddShoppingCartIcon />}
              onClick={() => handleAddToCart(item)}
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
      {show && (
        <ViewProductModal
          show={show}
          handleCloseProductViewModal={handleCloseProductViewModal}
          item={product}
        />
      )}
    </div>
  )
}

export default Product
