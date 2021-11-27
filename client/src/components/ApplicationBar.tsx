import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";

const ApplicationBar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { currentUser, logOutUser } = useContext(AuthContext);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogoutClick = () => {
    handleCloseUserMenu();
    logOutUser();
  };

  const menuItems = [
    <MenuItem key={"users"} component={RouterLink} to={"/users"}>
    <Typography textAlign="center">Users</Typography>
  </MenuItem>,
  <MenuItem key={"restaurants"} component={RouterLink} to={"/restaurants"}>
    <Typography textAlign="center">Restaurants</Typography>
  </MenuItem>,
  <MenuItem key={"reviews"} component={RouterLink} to={"/reviews"}>
    <Typography textAlign="center">Reviews</Typography>
  </MenuItem>
  ]

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#3e3750" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
          >
            <Link to="/" underline="none" color="white" component={RouterLink}>
              <HomeIcon />
            </Link>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            <Link to="/" underline="none" color="white" component={RouterLink}>
              <HomeIcon />
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>

          {currentUser ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {currentUser.profile_picture ? (
                    <Avatar
                      alt={currentUser.username}
                      src={currentUser.profile_picture.thumbnail}
                    />
                  ) : (
                    <Avatar
                      alt={currentUser.username}
                      src={currentUser.username}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {currentUser.is_admin && menuItems}
                <MenuItem key={"logout"} onClick={() => onLogoutClick()}>
                  <Typography textAlign="center">Log out</Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              <MenuItem key={"login"} component={RouterLink} to={"/login"}>
                <Typography textAlign="center">Login</Typography>
              </MenuItem>
              <MenuItem key={"signup"} component={RouterLink} to={"/signup"}>
                <Typography textAlign="center">Sign Up</Typography>
              </MenuItem>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ApplicationBar;
