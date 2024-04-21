import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {CircularProgress, Drawer, Stack} from "@mui/material";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartPage from "../../page/ShoppingCartPage";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export default function TopNavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const loginUser = useContext<UserData | null | undefined>(LoginUserContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen((prev) => !prev);
    };

    const renderLoginUser = () => {
        if (loginUser) {
            return (
                <Stack direction="row" textAlign="center">
                    <Box>
                        <Typography mr={1}>
                            {loginUser.email}
                        </Typography>
                    </Box>
                    <Button variant="contained" color="secondary" onClick={toggleDrawer}>
                        <ShoppingCartIcon/>
                    </Button>
                    <Button color="error" variant="contained"
                            onClick={() => {
                                FirebaseAuthService.handleSignOut();
                            }}>Logout</Button>
                </Stack>
            )
        } else if (loginUser === null) {
            return (
                <Button variant="contained" color={"secondary"}>
                    <Link to={"/login"}>
                        LOGIN
                    </Link>
                </Button>
            )
        } else {
            return (
                <Box>
                    <CircularProgress color={"secondary"}/>
                </Box>
            )
        }
    }

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    // const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    //     setAnchorElUser(event.currentTarget);
    // };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // };

    return (
        <Box>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to={"/"}>
                            <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        </Link>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Link to={"/"}>
                                LOGO
                            </Link>
                        </Typography>

                        {/*{renderLoginUser()}*/}

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            {/*<Menu*/}
                            {/*    id="menu-appbar"*/}
                            {/*    anchorEl={anchorElNav}*/}
                            {/*    anchorOrigin={{*/}
                            {/*        vertical: 'bottom',*/}
                            {/*        horizontal: 'left',*/}
                            {/*    }}*/}
                            {/*    keepMounted*/}
                            {/*    transformOrigin={{*/}
                            {/*        vertical: 'top',*/}
                            {/*        horizontal: 'left',*/}
                            {/*    }}*/}
                            {/*    open={Boolean(anchorElNav)}*/}
                            {/*    onClose={handleCloseNavMenu}*/}
                            {/*    sx={{*/}
                            {/*        display: {xs: 'block', md: 'none'},*/}
                            {/*    }}*/}
                            {/*>*/}
                            {/*    {pages.map((page) => (*/}
                            {/*        <MenuItem key={page} onClick={handleCloseNavMenu}>*/}
                            {/*            <Typography textAlign="center">{page}</Typography>*/}
                            {/*        </MenuItem>*/}
                            {/*    ))}*/}
                            {/*</Menu>*/}
                        </Box>
                        <Link to={"/"}>
                            <AdbIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        </Link>
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Link to={"/"}>
                                LOGO
                            </Link>

                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            {/*<Tooltip title="Open settings">*/}
                            {/*    <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>*/}
                            {/*        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>*/}
                            {/*    </IconButton>*/}
                            {/*</Tooltip>*/}
                            {/*<Menu*/}
                            {/*    sx={{mt: '45px'}}*/}
                            {/*    id="menu-appbar"*/}
                            {/*    anchorEl={anchorElUser}*/}
                            {/*    anchorOrigin={{*/}
                            {/*        vertical: 'top',*/}
                            {/*        horizontal: 'right',*/}
                            {/*    }}*/}
                            {/*    keepMounted*/}
                            {/*    transformOrigin={{*/}
                            {/*        vertical: 'top',*/}
                            {/*        horizontal: 'right',*/}
                            {/*    }}*/}
                            {/*    open={Boolean(anchorElUser)}*/}
                            {/*    onClose={handleCloseUserMenu}*/}
                            {/*>*/}
                            {/*    {settings.map((setting) => (*/}
                            {/*        <MenuItem key={setting} onClick={handleCloseUserMenu}>*/}
                            {/*            <Typography textAlign="center">{setting}</Typography>*/}
                            {/*        </MenuItem>*/}
                            {/*    ))}*/}
                            {/*</Menu>*/}
                            {renderLoginUser()}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}