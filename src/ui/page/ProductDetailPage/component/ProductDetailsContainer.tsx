import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import {useState} from "react";
import {Button} from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {ProductDetailDto} from "../../../../data/product/ProductDetailDto.ts";
import * as CartItemApi from "../../../../api/CartItemApi.ts";
import {useNavigate} from "react-router-dom";
import AddToCartSuccessSnackbar from "../../../component/AddToCartSuccessSnackbar.tsx";

type Props = {
    productDetailDto: ProductDetailDto;
}

export default function ProductDetailsContainer({productDetailDto}: Props) {
    const [quantity, setQuantity] = useState<number>(1);
    const navigate = useNavigate();
    const[isAddingCart, setIsAddingCart] = useState<boolean>(false);
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);

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

    const handleAddToCart = async ()=>{
        try {
            setIsAddingCart(true);
            await CartItemApi.putCartItem(productDetailDto.pid,quantity);
            setIsAddingCart(false);
            setSnackBarOpen(true);
        }catch (error){
            navigate("/error");
        }
    }

    const renderAddToCart = ()=>{
        if (productDetailDto.stock > 0){
            return <>
                <Box>
                    <QuantitySelector quantity={quantity} handleMinus={handleMinus} handlePlus={handlePlus}/>
                </Box>
                <Box mt={2} display="flex">
                    <Button
                        onClick={handleAddToCart}
                        disabled={isAddingCart}
                    >
                        <ShoppingCartIcon/>
                    </Button>
                </Box>
            </>

        }else {
            return(
                <Box>
                    <Typography color="red">
                        out of stock!
                    </Typography>
                </Box>
            )
        }
    }

    return (
        <Box>
            <Box>
                <img
                    src={productDetailDto.image_url}
                    height={700}/>
            </Box>
            <Box>
                <Typography variant="h2">
                    {productDetailDto.name}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h3"
                            color="text.secondary" sx={{whiteSpace:"pre-line"}}>{productDetailDto.description}</Typography>
            </Box>
            <Box>
                <Typography variant="h4">${productDetailDto.price.toLocaleString()}</Typography>
            </Box>
            {renderAddToCart()}
            <AddToCartSuccessSnackbar setSnackbarOpen={setSnackBarOpen} snackbarOpen={snackBarOpen}/>
        </Box>

    )
}