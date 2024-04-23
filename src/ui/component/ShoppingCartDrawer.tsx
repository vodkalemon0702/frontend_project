import {Button, Divider, Drawer, Paper} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";
import Box from "@mui/material/Box";
import ShoppingCartDrawerItem from "./ShoppingCartDrawerItem.tsx";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import IconButton from "@mui/material/IconButton";
import {GetAllCartItemDto} from "../../data/cart/GetAllCartItemDto.ts";
import * as CartItemApi from "../../api/CartItemApi.ts"
import {Link, useNavigate} from "react-router-dom";
import LoadingPage from "./LoadingPage.tsx";

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ShoppingCartDrawer({isOpen, setIsOpen}: Props) {
    const navigate = useNavigate();

    const [cartItemDtoList, setCartItemDtoList]
        = useState<GetAllCartItemDto[] | undefined>(undefined);

    const fetchAllCartItem = async () => {
        try {
            const cartItemDtoList = await CartItemApi.getCartItems();
            setCartItemDtoList(cartItemDtoList);
        } catch (error) {
            navigate("/error")
        }
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsOpen(newOpen);
    };

    const renderCart = () => {
        if (cartItemDtoList) {
            return (
                <Box>
                    <Container>
                        <Box display="flex"
                             justifyContent="space-between"
                             my={2}
                             alignItems="center"
                        >
                            <Typography ml={2} fontWeight="bold">
                                Cart
                            </Typography>
                            <Box mr={-1}>
                                <IconButton onClick={toggleDrawer(false)}>
                                    <CancelRoundedIcon/>
                                </IconButton>
                            </Box>
                        </Box>
                        <Divider/>
                        <Box sx={{width: 440}}
                             role="presentation"
                             mt={4}
                            // onClick={toggleDrawer(false)}
                        >
                            {
                                cartItemDtoList
                                    ? cartItemDtoList.map((value) => (
                                        <Paper elevation={3} key={value.pid}>
                                            <ShoppingCartDrawerItem dto={value}/>
                                        </Paper>
                                    ))
                                    : <Typography>There is nothing.
                                        <Link to={"/"}>Go Shopping</Link></Typography>
                            }
                            <Box sx={{
                                position: 'sticky',
                                bottom: 0,
                                left: 0,
                                width: '100%',
                                backgroundColor: 'background.paper',
                                p: 1,
                                zIndex: 1,
                            }}
                            >
                                <Button
                                    color="success"
                                    variant="contained"
                                    sx={{
                                        width: "100%",
                                    }}
                                    onClick={() => {
                                        navigate("/cart")
                                    }}
                                >
                                    <Typography>
                                        Go to Shopping Cart
                                    </Typography>
                                </Button>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            )
        } else {
            return (
                <LoadingPage/>
            )
        }
    }

    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={toggleDrawer(false)}
            onTransitionEnter={() => {
                setCartItemDtoList(undefined)
                fetchAllCartItem();
            }}
        >
            <Box>
                {
                    renderCart()
                }
            </Box>
        </Drawer>
    )
}