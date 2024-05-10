import Typography from '@mui/material/Typography';
import {Box, Paper} from '@mui/material';
import {ProductListDto} from "../../../../data/product/ProductListDto.ts";
import {useNavigate} from "react-router-dom";
import * as CartItemApi from "../../../../api/CartItemApi.ts";
import IconButton from "@mui/material/IconButton";
import {useState} from "react";
import AddToCartSuccessSnackbar from "../../../component/AddToCartSuccessSnackbar.tsx";
import addCartIcon from "../../../../img/addCartIcon.png";
import AddToCartFailedSnackbar from "../../../component/AddToCartFailedSnackbar.tsx";
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons";

type Props = {
    productList: ProductListDto;
}
const imageBaseUrl = "https://gshock.casio.com/content/casio/locales/jp/ja/brands/gshock/products/"


export default function Product({productList}: Props) {
    const navigate = useNavigate();
    const [isAddingCart, setIsAddingCart] = useState<boolean>(false);
    const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false);
    const [failedSnackBarOpen, setFailedSnackBarOpen] = useState<boolean>(false);
    //
    // const [hoveredBox, setHoveredBox] = useState<number | null>(null);
    //
    // const handleMouseEnter = (index: number) => {
    //     setHoveredBox(index);
    // };
    //
    // const handleMouseLeave = () => {
    //     setHoveredBox(null);
    // };

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
        <Paper elevation={24}
               sx={{
                   mt: 4,
                   maxWidth: 320,
                   boxShadow: '16px 16px 30px -3px rgba(26,3,15,0.7)',
                   border: "2px solid black",
                   borderRadius: 1,
                   "&:hover": {
                       boxShadow: '16px 16px 30px -3px rgba(0,0,255,0.5)',
                   },

                   // "&:hover > :not(:hover)":{
                   //     opacity: "0.4",
                   // },
                   // transition: "opacity 0.6s ease",
               }}
               // sx={{
               //     transition: "opacity 0.6s ease",
               // }}
            // sx={{
            //     "&:hover > :not(:hover)":{
            //         opacity: "0.4",
            //     }
            // }}
        >
            <Box ml={"auto"} mr={"auto"} pt={1}
                 pl={1} pr={1}
                 onClick={() => {
                     navigate(`/product/${productList.pid}`)
                 }}
                 sx={{cursor: "pointer"}}>
                {/*<CardActionArea onClick={() => {*/}
                {/*    navigate(`/product/${productList.pid}`)*/}
                {/*}}*/}
                {/*>*/}
                <img
                    // component="img"
                    // height={280}
                    width="100%"
                    // style={{objectFit: "contain"}}
                    src={`${imageBaseUrl}${productList.image_url}`}
                    // style={{width:'100%'}}
                />
                {/*</CardActionArea>*/}
            </Box>
            <Box>
                <Box display="flex" justifyContent="center">
                    <Typography gutterBottom variant="subtitle1">
                        {productList.name}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mx={4} mt={-2}>
                    <Box>
                        <Typography variant="body2">
                            ${productList.price.toLocaleString()}
                        </Typography>
                        {
                            productList.has_stock
                                ? <Typography variant="body2" color="green">
                                    <FontAwesomeIcon icon={faCircle} fade size="2xs" style={{color: "#5bd917",}}/>
                                    <Box ml={1} component='span'>
                                        available
                                    </Box>
                                </Typography>
                                : <Typography variant="body2" color="error">
                                    <FontAwesomeIcon icon={faCircle} fade size="2xs" style={{color: "#d91717",}}/>
                                    <Box ml={1} component='span'>
                                        sold out
                                    </Box>
                                </Typography>
                        }
                    </Box>
                    <Box>
                        {
                            productList.has_stock
                                ? <IconButton
                                    onClick={handleAddToCart}
                                    disabled={isAddingCart}
                                    sx={{mb: 0.1}}
                                >
                                    {/*<ShoppingBagOutlinedIcon/>*/}
                                    <img src={addCartIcon} height={24}/>
                                </IconButton>
                                : <IconButton
                                    // size="small"
                                    // sx={{color: "black"}}
                                    onClick={() => setFailedSnackBarOpen(true)}
                                    // disabled={true}
                                >
                                    {/*<ShoppingBagOutlinedIcon/>*/}
                                    <RemoveShoppingCartOutlinedIcon/>
                                </IconButton>
                        }
                    </Box>
                </Box>
            </Box>
            {/*<CardActions>*/
            }
            {/*    <IconButton*/
            }
            {/*        size="small"*/
            }
            {/*        color="primary"*/
            }
            {/*        onClick={handleAddToCart}*/
            }
            {/*        disabled={isAddingCart}>*/
            }
            {/*        <FontAwesomeIcon icon={faCartShopping}/>*/
            }
            {/*    </IconButton>*/
            }
            {/*</CardActions>*/
            }
            <AddToCartSuccessSnackbar snackbarOpen={snackBarOpen} setSnackbarOpen={setSnackBarOpen}/>
            <AddToCartFailedSnackbar snackbarOpen={failedSnackBarOpen} setSnackbarOpen={setFailedSnackBarOpen}/>
        </Paper>
    )
        ;
}