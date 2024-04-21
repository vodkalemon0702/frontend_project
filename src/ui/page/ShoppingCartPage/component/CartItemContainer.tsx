import {GetAllCartItemDto} from "../../../../data/cart/GetAllCartItemDto.ts";
import LoadingPage from "../../../component/LoadingPage.tsx";
import CartItemDetails from "./CartItemDetails.tsx";
import {Button, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Dispatch, SetStateAction} from "react";

type Props = {
    cartItemDtoList: GetAllCartItemDto[],
    setDtoList:Dispatch<SetStateAction<GetAllCartItemDto[] | undefined>>,
}


export default function CartItemContainer({cartItemDtoList,setDtoList}: Props) {
    const calTotal = cartItemDtoList.reduce((total, product) => {
        return total += product.price * product.cart_quantity
    }, 0)


    const renderTotalBox = () => {
        return (
            <Paper elevation={12}>
                <Box>
                    <Typography>
                        {`Total: $ ${calTotal}`}
                    </Typography>
                    <Button variant="contained">
                        Check Out
                    </Button>
                </Box>
            </Paper>

        )
    }

    return (
        <Box>
            {
                cartItemDtoList
                    ? cartItemDtoList.map((value) => (
                        <CartItemDetails dto={value}  cartItemDtoList={cartItemDtoList} setDtoList={setDtoList} key={value.pid}/>
                    ))
                    : <LoadingPage/>
            }
            {renderTotalBox()}
        </Box>
    );
}
