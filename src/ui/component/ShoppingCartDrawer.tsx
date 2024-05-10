import {Button, CircularProgress, Drawer} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";
import Box from "@mui/material/Box";
import ShoppingCartDrawerItem from "./ShoppingCartDrawerItem.tsx";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {GetAllCartItemDto} from "../../data/cart/GetAllCartItemDto.ts";
import * as CartItemApi from "../../api/CartItemApi.ts"
import {Link, useNavigate} from "react-router-dom";
import * as TransactionApi from "../../api/TransactionApi.ts";
import {Backdrop} from "@mui/material";
import LoadingGif from "./LoadingGif.tsx";


type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function ShoppingCartDrawer({isOpen, setIsOpen}: Props) {
    const navigate = useNavigate();

    const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false);

    const [cartItemDtoList, setCartItemDtoList]
        = useState<GetAllCartItemDto[] | undefined>(undefined);

    const fetchAllCartItem = async () => {
        const cartItemDtoList = await CartItemApi.getCartItems();
        setCartItemDtoList(cartItemDtoList);
    }

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsOpen(newOpen);
    };

    const handlePay = async () => {
        try {
            setIsBackdropOpen(true);
            const responseData = await TransactionApi.prepareTransaction();
            navigate(`/checkout/${responseData.tid}`)
        } catch (error) {
            navigate("/error");
        }
    }


    const scrollbarStyle = {
        width: '8px',
        backgroundColor: 'white',
        borderRadius: '6px',
    };

    const thumbStyle = {
        backgroundColor: 'black',
        borderRadius: '3px',
    };

    const thumbHoverStyle = {
        backgroundColor: 'darkgray',
    };

    // const handleCheckoutBtn = ()=>{
    //     return cartItemDtoList && cartItemDtoList.length > 0;
    // }

    const renderCart = () => {
        return (
            cartItemDtoList
                ? cartItemDtoList.length > 0
                    ? <Box>
                        {
                            cartItemDtoList.map((value) => (
                                // <Paper elevation={3} key={value.pid}>
                                //     <ShoppingCartDrawerItem dto={value}/>
                                // </Paper>
                                <Box key={value.pid}>
                                    <ShoppingCartDrawerItem dto={value} cartItemDtoList={cartItemDtoList}
                                                            setDtoList={setCartItemDtoList}/>
                                </Box>
                            ))
                        }
                    </Box>
                    : <Box display="flex"
                           flexDirection="column"
                           justifyContent="center"
                           alignItems="center" mt={-2}>
                        <Typography>
                            IT SEEMS NOTHING HERE.
                        </Typography>
                        <Link to={"/"} color="white">SHOP NOW</Link>
                    </Box>
                : <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={-2}>
                    <Typography>
                        <LoadingGif/>
                    </Typography>
                </Box>
        )

        {/*<Box sx={{*/
        }
        {/*    position: 'sticky',*/
        }
        {/*    bottom: 0,*/
        }
        {/*    left: 0,*/
        }
        {/*    width: '100%',*/
        }
        {/*    backgroundColor: 'background.paper',*/
        }
        {/*    p: 1,*/
        }
        {/*    zIndex: 1,*/
        }
        {/*}}*/
        }
        {/*>*/
        }

        {/*</Box>*/
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
            sx={{
                "& .MuiDrawer-paper": {
                    right: '0%',
                    top: '15%',
                    transform: 'translate(50%, -50%)',
                    maxHeight: '70%',
                    overflowY: 'auto',
                    backgroundColor: "white",
                    border: '2px solid black',
                    // scrollbarWidth: 'none'
                    '&::-webkit-scrollbar': scrollbarStyle,
                    '&::-webkit-scrollbar-thumb': thumbStyle,
                    '&::-webkit-scrollbar-thumb:hover': thumbHoverStyle
                }
            }}
        >
            <Container>
                <Box display="flex"
                     justifyContent="flex-end"
                     my={2}
                     alignItems="center"
                     width={420}
                >
                    {/*<Typography ml={2} fontWeight="bold">*/}
                    {/*</Typography>*/}
                    {/*<Box mr={-1}>*/}
                    {/*    <IconButton onClick={toggleDrawer(false)} sx={{color: "white"}}>*/}
                    {/*        <CancelPresentationSharpIcon/>*/}
                    {/*    </IconButton>*/}
                    {/*</Box>*/}
                </Box>
                {/*<Divider color="black" sx={{my: 4}}/>*/}
                <Box>
                    {
                        renderCart()
                    }
                </Box>
            </Container>
            <Box
                position="sticky"
                bottom={0}
                left={0}
                width="100%"
                sx={{
                    borderTop: '1px solid black',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    justifyContent: 'flex-end',
                    padding: '8px',
                    zIndex: 1
                }}
            >
                {/*<Button*/}
                {/*    variant="contained"*/}
                {/*    sx={{*/}
                {/*        width: "100%",*/}
                {/*        backgroundColor: "black",*/}
                {/*        border: "1px solid black",*/}
                {/*        "&:hover": {*/}
                {/*            backgroundColor: "white",*/}
                {/*            color: "black",*/}
                {/*        }*/}
                {/*    }}*/}
                {/*    onClick={() => {*/}
                {/*        navigate("/cart")*/}
                {/*    }}*/}
                {/*>*/}
                {/*    <Typography>*/}
                {/*        Go to Shopping Cart*/}
                {/*    </Typography>*/}
                {/*</Button>*/}
                {
                    cartItemDtoList &&
                    <Button
                        variant="contained"
                        sx={{
                            my: 1,
                            width: "100%",
                            backgroundColor: "black",
                            border: "1px solid black",
                            "&:hover": {
                                backgroundColor: "white",
                                color: "black",
                            }
                        }}
                        onClick={handlePay}
                    >
                        <Typography>
                            Check Out
                        </Typography>
                    </Button>
                }
            </Box>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isBackdropOpen}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Drawer>
    )
}