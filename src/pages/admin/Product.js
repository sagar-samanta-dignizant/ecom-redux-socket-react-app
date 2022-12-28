import { Button } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { deleteProduct } from "../../API/admin"
import getAllProducts from "../../API/user"
import { USER } from "../../API/util/endpoint"
import AddProductModal from "../../components/Admin/AddProductModal"
import UpdateProduct from "../../components/Admin/UpdateProduct"
import Product from "../../components/Product"
import { productRemoveRequest } from "../../socket/actions"
import socket from "../../socket/connect"
import { client, server } from "../../socket/events"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import AddCupon from "../../components/Admin/AddCupon"
import Cupon from "../../components/cupon/Cupon"
import myToken from "../../utils/token"
import { useNavigate } from "react-router-dom"
import AuthContext from "../../context/admin-context"
const Products = () => {
  const naigate = useNavigate()
  const context = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [selectedproduct, setSelectedProduct] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [show, setShow] = useState(false)
  const [showCuponModal, setshowCuponModal] = useState(false)
  const [cupon, setCupon] = useState({})
  let createdAt = new Date(cupon?.createdAt).toLocaleDateString("en-US")

  let expireAt = new Date(cupon?.expireAt).toLocaleDateString("en-US")
  const handleAddCupon = () => {
    setshowCuponModal(true)
  }
  const handleSelecteProductForEdit = (data) => {
    setSelectedProduct(data)
    setShowModal(true)
  }
  const handleSelecteProductForDelete = (data) => {
    productRemoveRequest(data?._id)
  }
  const handleAddProductModal = () => {
    setShow(true)
  }
  const handleCloseProductModal = () => {
    setShow(false)
  }
  const handleCloseCuponModal = () => {
    setshowCuponModal(false)
  }
  const handleClose = (data) => {
    setShowModal(false)
  }
  const updateData = (data) => {
    const index = products.findIndex((object) => {
      return object._id === data._id
    })
    products.splice(index, 1, data)
  }
  const addData = (data) => {
    setProducts((prev) => {
      return [data, ...prev]
    })
  }
  const updateProduct = (data) => {
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
  // useEffect(() => {
  //   if (!context.token) {
  //     naigate("/login")
  //   }
  // }, [])
  useEffect(() => {
    socket.emit(client.GET_CUPON_CODE, { text: "cupon add" }, (value) => {
      setCupon(value)
    })
    return () => {
      socket.off(client.GET_CUPON_CODE)
    }
  }, [showCuponModal])
  useEffect(() => {
    socket.emit(client.GET_ALL_PRODUCT, null, (recvdata) => {
      setProducts(recvdata)
    })

    socket.on(server.PRODUCT_CREATE_EVENTS, (data) => {
      if (data.action === "create") {
        addData(data.product)
      }
    })
    socket.on(server.PRODUCT_UPDATE_EVENTS, (data) => {
      console.log(data)

      if (data.action === "update") {
        updateProduct(data.product)
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
      socket.off(client.GET_CUPON_CODE)
    }
  }, [])
  return (
    <div style={{ minHeight: "90vh", marginTop: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1rem",
        }}
      >
        <div></div>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          {" "}
          OUR PRODUCTS
        </div>
        <div>
          <Button
            onClick={handleAddCupon}
            variant="outlined"
            startIcon={<AddCircleIcon />}
          >
            Add Cupon code
          </Button>
          <Button
            onClick={handleAddProductModal}
            variant="outlined"
            startIcon={<AddCircleIcon />}
            style={{ marginLeft: "10px" }}
          >
            Add product
          </Button>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flex: 5,
            gap: "20px",
            flexWrap: "wrap",
            margin: "1rem",
          }}
        >
          {products?.map((item, index) => (
            <Product
              key={index}
              item={item}
              handleSelecteProductForEdit={handleSelecteProductForEdit}
              handleSelecteProductForDelete={handleSelecteProductForDelete}
            />
          ))}
        </div>
        <Cupon
          code={cupon?.code}
          createdAt={createdAt}
          expireAt={expireAt}
          amount={cupon?.amount}
        />
      </div>
      {showModal && (
        <UpdateProduct
          show={showModal}
          data={selectedproduct}
          handleClose={handleClose}
          updateData={updateData}
        />
      )}
      {show && (
        <AddProductModal
          handleCloseProductModal={handleCloseProductModal}
          show={show}
        />
      )}
      {showCuponModal && (
        <AddCupon
          show={showCuponModal}
          handleCloseCuponModal={handleCloseCuponModal}
        />
      )}
    </div>
  )
}

export default Products
