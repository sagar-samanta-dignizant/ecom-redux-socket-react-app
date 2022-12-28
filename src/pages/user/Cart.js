import { Button } from "@mui/material"
import React, { memo, useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Product from "../../components/cart/Product"
import SendIcon from "@mui/icons-material/Send"
import socket from "../../socket/connect"
import { client } from "../../socket/events"
import {
  addLoadingCartData,
  addProduct,
  clearCart,
} from "../../redux/cart-slice"
import Order from "../../components/order/Order"
const Cart = () => {
  const cart = useSelector((state) => state.cart)
  console.log(cart)
  const dispatch = useDispatch()
  const [orderPlaceModal, setOrdePlace] = useState(false)
  const totalAmountTopay = cart?.reduce(
    (accumulator, currentValue) => accumulator + currentValue.totalAmount,
    0
  )
  const handlePlaceOrder = () => {
    setOrdePlace(true)
  }
  const handlePlaceOrderModalClose = () => {
    setOrdePlace(false)
  }
  useEffect(() => {
    const token = localStorage.getItem("token")
    socket.emit(client.GET_CART_ITEM, null, token, (data) => {
      const filterProduct = data?.map((product) => {
        return {
          ...product.productId[0],
          quantity: product?.quantity,
          totalAmount: product?.totalAmount,
        }
      })
      console.log(filterProduct)
      if (cart?.length > 0) return
      filterProduct?.forEach((element) => {
        // console.log("insert", element)
        dispatch(addLoadingCartData(element))
        // dispatch(addProduct(element))
      })
    })
  }, [])

  return (
    <div>
      {cart.length === 0 ? (
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          No Product In Cart
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            justifyContent: "flex-end",
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            Total Amount To Pay : ₹{totalAmountTopay?.toFixed(2)}
          </div>
          <Button
            variant="contained"
            style={{}}
            endIcon={<SendIcon />}
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      )}
      <div
        style={{
          display: "flex",
          gap: "10px",
          minHeight: "90vh",
          margin: "1rem",
        }}
      >
        {cart?.map((cartItem, index) => (
          <Product key={index} item={cartItem} />
        ))}
      </div>
      {orderPlaceModal && (
        <Order
          show={orderPlaceModal}
          handlePlaceOrderModalClose={handlePlaceOrderModalClose}
          totalAmountTopay={totalAmountTopay}
          cart={cart}
        />
      )}
    </div>
  )
}

export default memo(Cart)
