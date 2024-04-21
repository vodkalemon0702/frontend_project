import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box, CardActionArea, CardActions} from '@mui/material';
import {ProductListDto} from "../../../../data/product/ProductListDto.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons/faCartShopping";
import {useNavigate} from "react-router-dom";
import * as CartItemApi from "../../../../api/CartItemApi.ts";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import AddToCartSuccessSnackbar from "../../../component/AddToCartSuccessSnackbar.tsx";

type Props = {
    productList: ProductListDto;
}

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
        <Box>
            <Card sx={{maxWidth: 345}}>
                <CardActionArea onClick={() => {
                    navigate(`/product/${productList.pid}`)
                }}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={productList.image_url}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {productList.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {
                                productList.has_stock
                                    ? `$ ${productList.price.toLocaleString()}`
                                    : "out of stock"
                            }
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <IconButton
                        size="small"
                        color="primary"
                        onClick={handleAddToCart}
                        disabled={isAddingCart}>
                        <FontAwesomeIcon icon={faCartShopping}/>
                    </IconButton>
                </CardActions>
            </Card>
            <AddToCartSuccessSnackbar snackbarOpen={snackBarOpen} setSnackbarOpen={setSnackBarOpen}/>
        </Box>
    );
}