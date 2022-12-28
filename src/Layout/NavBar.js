import { Avatar } from "@mui/material"
import React, { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { AdminContext } from "../context/admin-context"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"
import PersonAdd from "@mui/icons-material/PersonAdd"
import Settings from "@mui/icons-material/Settings"
import Logout from "@mui/icons-material/Logout"
import classes from "./NavBar.module.css"
import Badge from "@mui/material/Badge"
import { styled } from "@mui/material/styles"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useSelector } from "react-redux"
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))
const NavBar = () => {
  const navigate = useNavigate()
  const context = useContext(AdminContext)
  const role = localStorage.getItem("role")
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [isActive, setActive] = useState("home")
  const open = Boolean(anchorEl)
  const cart = useSelector((state) => state.cart)
  const sumWithInitial = cart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  )

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    context?.logout()
    console.log("first")
    navigate("/")
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        padding: "1rem",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <div style={{ display: "flex", gap: 20, marginRight: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 30,
            marginRight: "6rem",
          }}
        >
          <NavLink
            to={role === "USER" ? "/user/home" : "/admin/home"}
            onClick={() => setActive("home")}
            className={isActive === "home" ? classes.active : classes.notActive}
          >
            Home
          </NavLink>

          <NavLink
            to={
              role === "USER" ? "/user/home/products" : "/admin/home/products"
            }
            onClick={() => setActive("products")}
            className={
              isActive === "products" ? classes.active : classes.notActive
            }
          >
            Products
          </NavLink>
          {role === "USER" && (
            <NavLink
              to={"/user/cart"}
              style={({ isActive }) =>
                isActive
                  ? { color: "red", textDecoration: "none" }
                  : { textDecoration: "none" }
              }
            >
              <IconButton aria-label="cart">
                <Badge
                  color="secondary"
                  badgeContent={sumWithInitial}
                  // variant="dot"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </NavLink>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          Wellcome {context?.user?.name} ({context?.user?.role})
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            </IconButton>
          </Tooltip>
        </div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Avatar /> Profile
          </MenuItem>
          <MenuItem>
            <Avatar /> My account
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}

export default NavBar
