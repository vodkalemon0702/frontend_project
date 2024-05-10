import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {GetAllCartItemDto} from "../../data/cart/GetAllCartItemDto.ts";
import {useNavigate} from "react-router-dom";
import * as CartItemApi from "../../api/CartItemApi.ts";
import {Dispatch, SetStateAction, useState} from "react";
import QuantitySelector from "./QuantitySelector.tsx";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import IconButton from "@mui/material/IconButton";
import DeleteConfirmDialog from "../page/ShoppingCartPage/component/DeleteConfirmDialog.tsx";

type Props = {
    dto: GetAllCartItemDto;
    cartItemDtoList: GetAllCartItemDto[]
    setDtoList: Dispatch<SetStateAction<GetAllCartItemDto[] | undefined>>
}

const imageBaseUrl = "https://gshock.casio.com/content/casio/locales/jp/ja/brands/gshock/products/"

export default function ShoppingCartDrawerItem({dto, cartItemDtoList, setDtoList}: Props) {
    const navigate = useNavigate();

    const [isQuantityPatching, setIsQuantityPatching] = useState<boolean>(false);

    const [isDeleteConfirm, setIsDeleteConfirm] = useState<boolean>(false);

    const handlePlusOne = async () => {
        if (dto.cart_quantity + 1 < dto.stock) {
            setIsQuantityPatching(true)
            const response = await CartItemApi.patchCartItemQuantity(dto.pid, dto.cart_quantity + 1);
            const updatedDtoList = cartItemDtoList.map((value) => {
                if (value.pid === dto.pid) {
                    value.cart_quantity = response.cart_quantity;
                }
                return value;
            });
            setDtoList(updatedDtoList);
            setIsQuantityPatching(false);
        }
    }

    const handleMinusOne = async () => {
        if (dto.cart_quantity - 1 > 0) {
            setIsQuantityPatching(true)
            const response = await CartItemApi.patchCartItemQuantity(dto.pid, dto.cart_quantity - 1);
            const updatedDtoList = cartItemDtoList.map((value) => {
                if (value.pid === dto.pid) {
                    value.cart_quantity = response.cart_quantity;
                }
                return value;
            });
            setDtoList(updatedDtoList);
            setIsQuantityPatching(false)
        } else {
            setIsDeleteConfirm(true)
        }
    }

    const handleDelete = async () => {
        try {
            await CartItemApi.deleteCartItem(dto.pid);
            const updatedDtoList = cartItemDtoList.filter((value) => (
                value.pid !== dto.pid
            ));
            setDtoList(updatedDtoList);
        } catch (error) {
            navigate("/error")
        }
    }

    return (
        // <Box>
        <Box display="flex" my={1}
             height={160}
             sx={{
                 border: "2px solid black",
                 borderRadius: 1,
                 backgroundColor: "white"
             }}>

            <Box height={140} my={1} mx={1}>
                <img
                    src={`${imageBaseUrl}${dto.image_url}`}
                    height="100%"
                    onClick={() => navigate(`/product/${dto.pid}`)}
                />
            </Box>
            <Box ml={4}>
                <Typography variant="subtitle1" component="div" mt={4} fontWeight="bolder" color="black">
                    {dto.name}
                </Typography>
                <Box display="flex" mt={3}>
                    <Typography color="grey" mr={1}>
                        Price:
                    </Typography>
                    <Typography variant="body1" component="div" mr={8} color="black">
                        {`$${dto.price.toLocaleString()}`}
                    </Typography>
                    <Typography color="grey" mr={1}>
                        Quantity:
                    </Typography>
                    <Typography variant="body1" component="div" color="black" mr={4}>
                        {`${dto.cart_quantity}`}
                    </Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end" mr={2}>
                    <QuantitySelector
                        quantity={dto.cart_quantity}
                        handleMinus={handleMinusOne}
                        handlePlus={handlePlusOne}
                        isLoading={isQuantityPatching}
                    />
                </Box>
            </Box>
            <Box>
                <IconButton
                    onClick={handleDelete}
                    disableRipple={true}
                    style={{
                        // marginTop: ,
                        // marginLeft: -40,
                    }}
                >
                    <DeleteForeverRoundedIcon/>
                </IconButton>
            </Box>
            <DeleteConfirmDialog isOpen={isDeleteConfirm} setIsOpen={setIsDeleteConfirm}
                                 handleDelete={handleDelete}/>
        </Box>
    )
}