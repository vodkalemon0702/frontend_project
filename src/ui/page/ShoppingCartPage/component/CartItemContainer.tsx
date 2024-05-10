import {GetAllCartItemDto} from "../../../../data/cart/GetAllCartItemDto.ts";
import LoadingPage from "../../../component/LoadingPage.tsx";
import CartItemDetails from "./CartItemDetails.tsx";
import {Backdrop, Button, CircularProgress, Paper} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {Dispatch, SetStateAction, useState} from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import * as TransactionApi from "../../../../api/TransactionApi.ts";
import {useNavigate} from "react-router-dom";

type Props = {
    cartItemDtoList: GetAllCartItemDto[],
    setDtoList: Dispatch<SetStateAction<GetAllCartItemDto[] | undefined>>,
}


export default function CartItemContainer({cartItemDtoList, setDtoList}: Props) {
    const navigate = useNavigate();
    const calTotal = cartItemDtoList.reduce((total, product) => {
        return total += product.price * product.cart_quantity
    }, 0)
    const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false);

    const handlePay = async () => {
        try {
            setIsBackdropOpen(true);
            const responseData = await TransactionApi.prepareTransaction();
            navigate(`/checkout/${responseData.tid}`);
        } catch (error) {
            navigate("/error");
        }
    }

    const renderTotalBox = () => {
        return (
            <Paper elevation={8}>
                <Box>
                    <Box display="flex" justifyContent="space-between" ml={2} mr={2} mb={2} mt={2}>
                        <Typography fontSize={20} mt={2}>
                            Total:
                        </Typography>
                        <Typography fontSize={20} mt={2}>
                            {` $ ${calTotal}`}
                        </Typography>
                    </Box>
                    <Button variant="contained" color="success" sx={{width: "100%"}}
                            onClick={handlePay}>
                        Check Out
                    </Button>
                </Box>
            </Paper>

        )
    }

    return (
        <>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={8}>
                        {
                            cartItemDtoList
                                ? cartItemDtoList.map((value) => (
                                    <CartItemDetails dto={value} cartItemDtoList={cartItemDtoList} setDtoList={setDtoList}
                                                     key={value.pid}/>
                                ))
                                : <LoadingPage/>
                        }
                    </Grid>
                    <Grid item xs={6} md={4} sx={{position: "sticky", top: 0}}>
                        {renderTotalBox()}
                    </Grid>
                </Grid>
            </Container>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isBackdropOpen}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </>
    );
}
