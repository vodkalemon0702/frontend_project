import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box, CardActionArea, Paper} from '@mui/material';
import {ProductListDto} from "../../../../data/product/ProductListDto.ts";
import {useNavigate} from "react-router-dom";
import * as CartItemApi from "../../../../api/CartItemApi.ts";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import AddToCartSuccessSnackbar from "../../../component/AddToCartSuccessSnackbar.tsx";

type Props = {
    productList: ProductListDto;
}
const imageBaseUrl = "https://gshock.casio.com/content/casio/locales/jp/ja/brands/gshock/products/"


export default function Product({productList}: Props) {
    const navigate = useNavigate();
    const [isAddingCart, setIsAddingCart] = useState<boolean>(false);
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);

    const handleAddToCart = async () => {
        try {
            setIsAddingCart(true);
            await CartItemApi.putCartItem(productList.pid, 1);
            setIsAddingCart(false);
            setSnackBarOpen(true);
        } catch (error) {
            navigate("/error");
        }
    }

    return (
        <Box mt={8}>
            <Paper elevation={24} sx={{
                maxWidth: 345
            }}>
                <CardActionArea onClick={() => {
                    navigate(`/product/${productList.pid}`)
                }}>
                    <CardMedia
                        component="img"
                        // height="306px"
                        width="100%"
                        style={{objectFit: "contain"}}
                        image={`${imageBaseUrl}${productList.image_url}`}
                    />
                </CardActionArea>
                    <Box>
                        <Box display="flex" justifyContent="center">
                            <Typography gutterBottom variant="subtitle1">
                                {productList.name}
                            </Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mx={4} mt={-1}>
                            <Box>
                                <Typography variant="body2">
                                    {
                                        productList.has_stock
                                            ? `$ ${productList.price.toLocaleString()}`
                                            : "out of stock"
                                    }
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton
                                    size="small"
                                    sx={{color:"black"}}
                                    onClick={handleAddToCart}
                                    disabled={isAddingCart}
                                >
                                    <ShoppingBagOutlinedIcon/>
                                </IconButton>
                            </Box>
                        </Box>
                    </Box>
                {/*<CardActions>*/}
                {/*    <IconButton*/}
                {/*        size="small"*/}
                {/*        color="primary"*/}
                {/*        onClick={handleAddToCart}*/}
                {/*        disabled={isAddingCart}>*/}
                {/*        <FontAwesomeIcon icon={faCartShopping}/>*/}
                {/*    </IconButton>*/}
                {/*</CardActions>*/}
            </Paper>
            <AddToCartSuccessSnackbar snackbarOpen={snackBarOpen} setSnackbarOpen={setSnackBarOpen}/>
        </Box>
    );
}