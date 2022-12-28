import { configureStore } from "@reduxjs/toolkit"
import CartReducer from "./cart-slice"
const store = configureStore({
  reducer: {
    // user: CountReducer,
    cart: CartReducer,
  },
})
export default store
