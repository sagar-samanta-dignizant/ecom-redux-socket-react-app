import React, { useState } from "react"

const AddProduct = () => {
  const [show, setShow] = useState(false)
  const showModal = (val) => {
    setShow(val)
  }
  return <div>AddProduct</div>
}

export default AddProduct
