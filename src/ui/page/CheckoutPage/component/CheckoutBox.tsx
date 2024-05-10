import {Backdrop, Button, CircularProgress, Divider, Paper} from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import * as TransactionApi from "../../../../api/TransactionApi.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

type Props = {
    total: number;
    tid: string;
    totalItems:number;
}

export default function CheckoutBox({total, tid,totalItems}: Props) {
    const navigate = useNavigate();
    const [isBackdropOpen, setIsBackdropOpen] = useState<boolean>(false);
    const handleCheckout = async () => {
        try {
            setIsBackdropOpen(true)
            await TransactionApi.finishTransaction(tid);
            setIsBackdropOpen(false)
            navigate("/thankyou")
        } catch (error) {
            navigate("/error")
        }
    }

    return (

        <Paper elevation={22}
               style={{
                   border: '2px solid black',
                   minWidth: '400px',
               }}>
            <Typography variant='h4' display='flex' justifyContent="center" my={1}>
                Order Summary
            </Typography>
            <Divider color='grey'/>
            <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
                <Typography ml={4}>
                    Items
                </Typography>
                <Typography mr={4}>
                    {totalItems}
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
                <Typography ml={4}>
                    Delivery
                </Typography>
                <Typography mr={4}>
                    $0
                </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
                <Typography ml={4}>
                    Tax fee
                </Typography>
                <Typography mr={4}>
                    $0
                </Typography>
            </Box>
            <Divider/>
            <Box display="flex" justifyContent="space-between" alignItems="center" my={1}>
                <Typography ml={4}>
                    Total
                </Typography>
                <Typography mr={4}>
                    {`$${total.toLocaleString()}`}
                </Typography>
            </Box>

            {/*<Box justifyContent='center' alignItems='c'>*/}
            <Box display="flex" justifyContent="center" my={2}>
            <Button variant="contained"
                    sx={{
                        my: 1,
                        width: "50%",
                        backgroundColor: "black",
                        border: "1px solid black",
                        "&:hover": {
                            backgroundColor: "white",
                            color: "black",
                        }
                    }}
                    onClick={handleCheckout}>
                {/*<Link to={"/thankyou"}>*/}

                Checkout

                {/*</Link>*/}
            </Button>
            </Box>
            {/*</Box>*/}
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                open={isBackdropOpen}
            >
                <CircularProgress color="inherit"/>
            </Backdrop>
        </Paper>
    )
}