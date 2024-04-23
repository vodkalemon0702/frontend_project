import {Backdrop, Button, CircularProgress, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as TransactionApi from "../../../../api/TransactionApi.ts";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";

type Props = {
    total: number;
    tid: string
}

export default function CheckoutBox({total, tid}: Props) {
    const navigate = useNavigate();
    const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false);
    const handleCheckout = async () => {
        try {
            setIsBackdropOpen(true)
            await TransactionApi.finishTransaction(tid);
        } catch (error) {
            navigate("/error")
        }
    }

    return (
        <Stack direction="row" display="flex" justifyContent="space-between" mx={4}>
            <Box>
                <Typography>
                    {`Total:$${total.toLocaleString()}`}
                </Typography>
            </Box>
            <Box>
                <Button variant="contained" onClick={handleCheckout}>
                    <Link to={"/thankyou"}>
                        Checkout
                    </Link>
                </Button>
            </Box>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isBackdropOpen}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Stack>
    )
}