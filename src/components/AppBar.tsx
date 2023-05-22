import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Iuser } from "../interface";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import { ModalCRUDUser } from ".";

const pages = ["article", "user"];
export default function ButtonAppBar({ user }: { user: Iuser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openModal, setopenModal] = useState<boolean>(false);
  const [typeModal, settypeModal] = useState<string>("");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handeOpenModal = (type: string) => {
    setopenModal(true);
    settypeModal(type);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Welcome {user?.username || "Guest"}
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", marginLeft: "20px" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={() => {
                  if (page === "user") navigate("/");
                  else navigate(`/${page}`);
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenu}
            >
              <Avatar>H</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handeOpenModal("profile");
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handeOpenModal("edit");
                }}
              >
                Edit
              </MenuItem>
            </Menu>
          </div>
          <Button
            color="inherit"
            onClick={() => {
              dispatch(setLogout());
              navigate("/login");
            }}
          >
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <ModalCRUDUser
        open={openModal}
        handleClose={() => setopenModal(false)}
        type={typeModal}
      />
    </Box>
  );
}
