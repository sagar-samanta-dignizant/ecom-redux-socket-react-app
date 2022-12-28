import React from "react"
import { useParams } from "react-router-dom"

const Product = () => {
  const paramData = useParams()
  return <div style={{ minHeight: "90vh" }}>ProductId : {paramData.id}</div>
}

export default Product
