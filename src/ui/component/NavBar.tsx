import {useContext, useState} from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    Button,
    CircularProgress,
    CssBaseline,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Stack
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import * as FirebaseAuthService from "../../authService/FirebaseAuthService.ts";
import {Link} from "react-router-dom";
import {UserData} from "../../data/user/UserData.ts";
import {LoginUserContext} from "../../context/LoginUserContext.ts";
import ShoppingCartDrawer from "./ShoppingCartDrawer.tsx";
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";

const drawerWidth = 240;
const navItems = ['Home'];

export default function NavBar() {
    const loginUser = useContext<UserData | null | undefined>(LoginUserContext);

    const [mobileOpen, setMobileOpen] = useState<boolean>(false);

    const [isOpen, setIsOpen] = useState<boolean>(false);


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };


    const renderLoginUser = () => {
        if (loginUser) {
            return (
                <Stack direction="row" alignItems="center">
                    <Box>
                        <Typography mr={1}>
                            {loginUser.email}
                        </Typography>
                    </Box>
                    <IconButton color="success"

                                sx={{
                                    mr: 2
                                }}
                                onClick={() => {
                                    setIsOpen(true);
                                }}>
                        <ShoppingCartTwoToneIcon/>
                    </IconButton>

                    <IconButton color="error"
                                onClick={() => {
                                    FirebaseAuthService.handleSignOut();
                                }}>
                        <Box
                            display="flex"
                            sx={{
                            border: "white 2px solid",
                            padding: "4px",
                            "&:hover": {
                                backgroundColor: "lightgrey",
                            }
                        }}>
                            <Typography mr={1} color="white" fontSize={16} fontWeight="bold">
                                Logout
                            </Typography>
                            <LogoutTwoToneIcon/>
                        </Box>
                    </IconButton>
                </Stack>
            )
        } else if (loginUser === null) {
            return (

                <IconButton>
                    <Link to={"/login"} style={{textDecoration: 'none'}}>
                        <Box
                            display="flex"
                            sx={{
                                border: "white 2px solid",
                                padding: "4px",
                                "&:hover": {
                                    backgroundColor: "lightgrey",
                                }
                            }}>
                            <Typography mr={1} color="white" fontSize={16} fontWeight="bold">
                                LOGIN
                            </Typography>
                            <FontAwesomeIcon icon={faRightToBracket} fade style={{color: "#0ea074",}}/>
                        </Box>
                    </Link>
                </IconButton>
            )
        } else {
            return (
                <Box>
                    <CircularProgress color={"secondary"}/>
                </Box>
            )
        }
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>
                Man's e-Shop
            </Typography>
            <Divider/>
            <List>
                {navItems.map((item, index) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton sx={{textAlign: 'center', width: '100%'}}>
                            {
                                index === 0 ? (
                                        <Button
                                            component={Link}
                                            to="/"
                                            sx={{
                                                width: "100%",
                                                color: 'white',
                                                backgroundColor: 'black',
                                                fontWeight:"bold",
                                                "&:hover": {
                                                    backgroundColor:"ActiveBorder"
                                                }
                                            }}
                                        >
                                            {item}
                                        </Button>
                                    )
                                    : (<ListItemText primary={item}/>)
                            }
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar component="nav" sx={{backgroundColor: "black"}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        Man's e-Shop
                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {navItems.map((item, index) => (
                            <Button key={item}
                                    component={Link}
                                    to={index === 0 ? "/" : ""}
                                    sx={{
                                        color: 'white',
                                        fontWeight:"bold",
                                        fontSize:16,
                                        mr:4
                            }}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                    {renderLoginUser()}
                </Toolbar>
            </AppBar>
            <ShoppingCartDrawer isOpen={isOpen} setIsOpen={setIsOpen}/>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{p: 3}}>
                <Toolbar/>
            </Box>
        </Box>
    );
}