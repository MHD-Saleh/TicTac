import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector, useDispatch } from "react-redux";
import { setboardd, setRest, sendMSG } from "../../redux/LoginSlice";
export default function Appbar() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const dispatch = useDispatch();
  const handel_restart = () => {
    alert("reset!");
    dispatch(setRest());
    dispatch(
      sendMSG({
        room: myaccount.room,
        name: myaccount.name,
        type: "rest_game",
      })
    );
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          onClick={handel_restart}
          size="large"
          aria-label="show 4 new mails"
          color="inherit"
        >
          <RestartAltIcon />
        </IconButton>
        <p>Restart</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <LogoutIcon />
        </IconButton>
        <p>Log Out</p>
      </MenuItem>
    </Menu>
  );

  const { Type, myaccount } = useSelector((state) => state.userlog);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sty={"true"}
        className="AppbarStyle"
        style={{
          background: "#2E3B55",
          color: "#27cddf",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Tic Tac toe
          </Typography>
          {Type && (
            <Box sx={{ marginLeft: "10px" }}>
              <Typography color={"white"}>You'r : {Type}</Typography>
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={handel_restart}
            >
              <RestartAltIcon />
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            {myaccount.name && (
              <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                <Typography color={"white"}>{myaccount.name}</Typography>
              </Box>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                paddingTop: "7px",
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Tic Tac Toe
            </Typography>

            {myaccount.name && (
              <Box sx={{ marginLeft: "10px", marginTop: "10px" }}>
                <Typography color={"white"}>{myaccount.name}</Typography>
              </Box>
            )}
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
}
