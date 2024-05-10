import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import {GetAllCartItemDto} from "../../../../data/cart/GetAllCartItemDto.ts";
import Box from "@mui/material/Box";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import IconButton from "@mui/material/IconButton";
import * as CartItemApi from "../../../../api/CartItemApi.ts";
import {Dispatch, SetStateAction, useState} from "react";
import {useNavigate} from "react-router-dom";
import DeleteConfirmDialog from "./DeleteConfirmDialog.tsx";
import Container from "@mui/material/Container";


type Props = {
    dto: GetAllCartItemDto;
    cartItemDtoList: GetAllCartItemDto[]
    setDtoList: Dispatch<SetStateAction<GetAllCartItemDto[] | undefined>>
}

const imageBaseUrl = "https://gshock.casio.com/content/casio/locales/jp/ja/brands/gshock/products/"

export default function CartItemDetails({dto, setDtoList, cartItemDtoList}: Props) {
    const [isQuantityPatching, setIsQuantityPatching] = useState<boolean>(false);
    const navigate = useNavigate();
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
        <Box>
            <Container>
                    <Card sx={{display: "flex", maxWidth: "100%",my:2}}>
                            <CardMedia
                                sx={{width: 140, height: 200}}
                                image={`${imageBaseUrl}${dto.image_url}`}
                            >
                            </CardMedia>

                        <CardContent
                            sx={{width: "80%"}}>
                            <Typography gutterBottom variant="overline" component="div" fontSize={15}>
                                {dto.name}
                            </Typography>
                            <QuantitySelector
                                quantity={dto.cart_quantity}
                                handleMinus={handleMinusOne}
                                handlePlus={handlePlusOne}
                                isLoading={isQuantityPatching}
                            />
                        </CardContent>
                        <CardActions>
                            <Typography variant="body2" color="text.secondary">
                                {`$${(dto.price*dto.cart_quantity).toLocaleString()}`}
                            </Typography>
                            <IconButton
                                sx={{
                                    "&:hover": {
                                        color: "inherit"
                                    }
                                }}
                                onClick={handleDelete}>
                                <DeleteForeverRoundedIcon/>
                            </IconButton>·
                        </CardActions>
                    </Card>
                <DeleteConfirmDialog
                    isOpen={isDeleteConfirm} setIsOpen={setIsDeleteConfirm}
                                     handleDelete={handleDelete}/>
            </Container>
        </Box>
    )
        ;
}
