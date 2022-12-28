import { createSlice } from "@reduxjs/toolkit"
const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addProduct: (state, action) => {
      const product = state.find((p) => p._id === action.payload._id)
      if (product) {
        product.quantity = product.quantity + 1
        product.totalAmount = product.totalAmount + action.payload.price
      } else {
        state.push({
          ...action.payload,
          totalAmount: action.payload.price,
        })
      }
    },
    removeProduct: (state, action) => {
      state.find((product) => {
        if (product?._id === action.payload._id) {
          if (product.quantity === 1) {
            state.splice(
              state.findIndex((arrow) => arrow._id === action.payload._id),
              1
            )
          } else {
            product.quantity = product.quantity - 1
            product.totalAmount = product.totalAmount - action.payload.price
          }
        }
      })
      // product.completed = !product.completed;
    },
    clearCart: (state, action) => {
      return (state = [])
    },
    addLoadingCartData: (state, action) => {
      const product = state.find((p) => p._id === action.payload._id)
      if (!product) {
        state.push({
          ...action.payload,
        })
      } else {
        return state
      }
    },
  },
})
export const { addProduct, removeProduct, clearCart, addLoadingCartData } =
  cartSlice.actions
export default cartSlice.reducer
