export const client = {
  LOGIN: "login",
  LOGOUT: "logout",
  ADD_PRODUCT: "add Product",
  REMOVE_PRODUCT: "remove Product",
  VIEW_PRODUCT: "view Product",
  UPDATE_PRODUCT: "update Product",
  GET_ALL_PRODUCT: "get all product",
  TYPPING_STARTED: "typing started by user",
  TYPPING_STOPPED: "typing stopped by user",
  GET_USER_DETAILS: "alredy logged in",
  INSERT_PRODUCT_TO_CART: "add product to cart",
  REMOVE_PRODUCT_FROM_CART: "remove product from cart",
  GET_CART_ITEM: "get all product added to cart",
  CREATE_CUPON_CODE: "create cupon code",
  GET_CUPON_CODE: "get cupon code",
  VERIFY_COUPON: "VERIFY COUPON CODE",
}
export const server = {
  PRODUCT_CREATE_EVENTS: "send product",
  PRODUCT_UPDATE_EVENTS: "update product",
  PRODUCT_DELETE_EVENTS: "delete product",
  PRODUCT_VIEW_EVENTS: "view product",
  TYPPING_STARTED_BY_USER: "typing started event from server event",
  TYPPING_STOPPED_BY_USER: "typing stopped event from server",
  SEND_CREATED_CUPON: "send cupon",
}