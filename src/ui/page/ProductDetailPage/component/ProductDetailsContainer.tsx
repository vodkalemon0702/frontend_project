import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import {useContext, useEffect, useState} from "react";
import {Button, Divider} from "@mui/material";
import {ProductDetailDto} from "../../../../data/product/ProductDetailDto.ts";
import * as CartItemApi from "../../../../api/CartItemApi.ts";
import {useNavigate} from "react-router-dom";
import AddToCartSuccessSnackbar from "../../../component/AddToCartSuccessSnackbar.tsx";
import LoadingGif from "../../../component/LoadingGif.tsx";
import Grid from "@mui/material/Grid";
import {LoginUserContext} from "../../../../context/LoginUserContext.ts";
import {UserData} from "../../../../data/user/UserData.ts";
import Container from "@mui/material/Container";
import soldOutIcon from "../../../../img/soldOutIcon.png";

type Props = {
    productDetailDto: ProductDetailDto;
}

// const videoUrl = "https://fsse2401-project-man.s3.ap-southeast-1.amazonaws.com/ProductDetailVideo.mp4";

const imageBaseUrl = "https://gshock.casio.com/content/casio/locales/jp/ja/brands/gshock/products/"

export default function ProductDetailsContainer({productDetailDto}: Props) {
    const [quantity, setQuantity] = useState<number>(1);
    const navigate = useNavigate();
    const [isAddingCart, setIsAddingCart] = useState<boolean>(false);
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const loginUser = useContext<UserData | undefined | null>(LoginUserContext);

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity((prevState) => (
                prevState - 1
            ))
        }
    }
    const handlePlus = () => {
        if (quantity < productDetailDto.stock) {
            setQuantity(prevState => (
                prevState + 1
            ))
        }
    }

    const handleAddToCart = async () => {
        try {
            if (loginUser) {
                setIsAddingCart(true);
                await CartItemApi.putCartItem(productDetailDto.pid, quantity);
                setIsAddingCart(false);
                setSnackBarOpen(true);
            } else {
                navigate("/login");
            }
        } catch (error) {
            navigate("/error");
        }
    }


    useEffect(() => {
        const timer = setTimeout(() => {
            setImageLoaded(true);
        }, 2000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    const scrollbarStyle = {
        width: '6px',
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

    const renderAddToCart = () => {
        if (productDetailDto.stock > 0) {
            return (
                // <Box display="flex" justifyContent="space-between" alignItems="center" mx={3}>
                <Container>
                    <Box display="flex" justifyContent="flex-end" mr={2}>
                        <QuantitySelector
                            quantity={quantity}
                            handleMinus={handleMinus}
                            handlePlus={handlePlus}/>
                    </Box>
                    <Box display="flex" justifyContent="center" my={2}>
                        <Button
                            onClick={handleAddToCart}
                            disabled={isAddingCart}
                            variant="contained"
                            sx={{
                                height: 40,
                                width: "90%",
                                backgroundColor: "black",
                                border: "1px solid black",
                                borderRadius: '0px',
                                "&:hover": {
                                    backgroundColor: "white",
                                    color: "black",
                                    // "&img":{
                                    //     visibility:"hidden"
                                    //     }
                                },
                            }}
                        >
                            {/*<ShoppingCartIcon/>*/}
                            {/*<span style={{marginRight:10,*/}
                            {/*}}>*/}
                            ADD TO CART
                            {/*</span>*/}
                            {/*<img src={addCartIconWhite} height={24}*/}
                            {/*      style={{position: 'absolute', top: 8, right:140 }}/>*/}
                            {/* <img src={addCartIconBlack} height={24}*/}
                            {/*      style={{visibility:"hidden"}}/>/ */}
                        </Button>
                    </Box>

                    {/*</Box>*/}
                </Container>
            )
        } else {
            return (
                <Box display="flex"
                     justifyContent="center"
                     mt={-17}

                >
                    {/*<Typography color="red" variant="h6">*/}
                    {/*    SOLD OUT*/}
                    {/*</Typography>*/}
                    <img src={soldOutIcon} height="240" />
                </Box>
            )
        }
    }

    return (
        <Box display="flex"
             justifyContent="space-between"
             flexDirection={{xs: 'column', sm: 'column', md: 'row'}}
             sx={{flexGrow: 1}}
        >
            <Container>
                <Grid
                    // container xs={12} sm={6} md={4} mb={4} columns={{xs: 8, sm: 16}}
                    sx={{
                        width: "400px",
                        // boxShadow: '0px 2px 60px 6px rgba(30, 0, 0, 2)',
                        border: "2px solid black"
                    }}>
                    {
                        imageLoaded
                            ? <Box px={1} py={1}>
                                <img
                                    src={`${imageBaseUrl}${productDetailDto.image_url}`}
                                    height={380} style={{objectFit: "contain"}}/>
                            </Box>
                            : <LoadingGif/>
                    }
                    <Box mx={3} height={380} width={370} overflow="auto"
                         sx={{
                             '&::-webkit-scrollbar': scrollbarStyle,
                             '&::-webkit-scrollbar-thumb': thumbStyle,
                             '&::-webkit-scrollbar-thumb:hover': thumbHoverStyle
                         }}
                    >
                        <Typography variant="body1"
                                    color="text.secondary"
                                    sx={{
                                        whiteSpace: "pre-line"
                                    }}
                        >
                            {productDetailDto.description}
                        </Typography>
                    </Box>
                </Grid>
            </Container>
            <Container>
                <Grid xs={12} sm={6} md={4} mb={4}
                      sx={{
                          mt: {xs: 4, sm: 4, md: 0}
                      }}>
                    <Box>
                        <img
                            src="https://www.casio.com/content/experience-fragments/casio/locales/jp/ja/modal/email-subscriber/g-shock_modal/_jcr_content/root/modal_container/container_773075794/image.casiocoreimg.png/1654238195662/image-pc-1920-1080.png"
                            width={500}/>
                    </Box>
                    {/*<Box>*/}
                    {/*    <video width={500} autoPlay muted loop>*/}
                    {/*        <source src={videoUrl}/>*/}
                    {/*    </video>*/}
                    {/*</Box>*/}

                    <Box border="2px solid black" mt={4}
                         width={500}
                         sx={{
                             // boxShadow: '0px 2px 60px 6px rgba(30, 0, 0, 2)'
                         }}>
                        <Box mx={3} mt={3}>
                            <Typography variant="h6">
                                {productDetailDto.name}
                            </Typography>
                        </Box>
                        <Divider sx={{my: 2, backgroundColor: 'black', borderWidth: 1}}/>
                        <Box display="flex" justifyContent="space-between" alignItems="center" my={2} mx={4}>
                            <Typography variant="h6">Price:</Typography>
                            <Typography variant="h6">${productDetailDto.price.toLocaleString()}</Typography>
                        </Box>
                        <Box>
                            {renderAddToCart()}
                        </Box>
                    </Box>
                    {/*<Box my={1}>*/}
                    {/*    <video width={500} autoPlay muted loop>*/}
                    {/*        <source src={videoUrl}/>*/}
                    {/*    </video>*/}
                    {/*</Box>*/}
                </Grid>
            </Container>
            <AddToCartSuccessSnackbar setSnackbarOpen={setSnackBarOpen} snackbarOpen={snackBarOpen}/>
        </Box>
    )
}
