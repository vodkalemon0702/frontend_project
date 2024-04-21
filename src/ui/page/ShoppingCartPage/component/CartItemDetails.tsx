import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Card from "@mui/material/Card";
import {GetAllCartItemDto} from "../../../../data/cart/GetAllCartItemDto.ts";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import IconButton from "@mui/material/IconButton";
import * as CartItemApi from "../../../../api/CartItemApi.ts";
import {Dispatch, SetStateAction} from "react";

type Props = {
    dto: GetAllCartItemDto;
    cartItemDtoList: GetAllCartItemDto[]
    setDtoList:Dispatch<SetStateAction<GetAllCartItemDto[] | undefined>>
}

export default function CartItemDetails({dto,setDtoList,cartItemDtoList}: Props) {
    const handlePlusOne = async () =>{
        const response = await CartItemApi.patchCartItemQuantity(dto.pid,dto.cart_quantity+1);
        const updatedDtoList = cartItemDtoList.map((value)=>{
            if (value.pid === dto.pid){
                value.cart_quantity = response.cart_quantity;
            }
            return value;
        });
        setDtoList(updatedDtoList);
    }

    const handleMinusOne = async () =>{
        const response = await CartItemApi.patchCartItemQuantity(dto.pid,dto.cart_quantity-1);
        const updatedDtoList = cartItemDtoList.map((value)=>{
            if (value.pid === dto.pid){
                value.cart_quantity = response.cart_quantity;
            }
            return value;
        });
        setDtoList(updatedDtoList);
    }

    return (
        <Box>
            <Paper elevation={0}>
                <Card sx={{maxWidth: 345}}>
                    <CardMedia
                        sx={{height: 140}}
                        image={dto.image_url}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {dto.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {dto.cart_quantity}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {dto.price}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <QuantitySelector
                            quantity={dto.cart_quantity}
                            handleMinus={handleMinusOne}
                            handlePlus={handlePlusOne}
                        />
                        <IconButton>
                            <DeleteForeverRoundedIcon/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Paper>
        </Box>
    );
}
