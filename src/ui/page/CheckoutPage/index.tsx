import CheckoutProductDetails from "./component/CheckoutProductDetails.tsx";
import TopNavBar from "../../component/TopNavBar.tsx";
import Container from "@mui/material/Container";
import CheckoutBox from "./component/CheckoutBox.tsx";
import {useContext, useEffect, useState} from "react";
import {TransactionDto} from "../../../data/transaction/TransactionDto.ts";
import {useNavigate, useParams} from "react-router-dom";
import * as TransactionApi from "../../../api/TransactionApi.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {UserData} from "../../../data/user/UserData.ts";
import Footer from "../../component/Footer.tsx";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LoadingGif from "../../component/LoadingGif.tsx";

type Params = {
    transactionId: string;
}

export default function CheckoutPage() {
    const [dto, setDto] = useState<TransactionDto | undefined>(undefined);
    const params = useParams<Params>();
    const navigate = useNavigate();
    const loginUser = useContext<UserData | null | undefined>(LoginUserContext);

    const fetchTransactionDto = async () => {
        try {
            const responseDto = await TransactionApi.prepareTransaction();
            setDto(responseDto)
        } catch (error) {
            navigate("/error")
        }
    }

    useEffect(() => {
        if (loginUser && params.transactionId) {
            fetchTransactionDto();
        }
    }, [loginUser, params.transactionId]);

    function calculateTotalItems() {
        let totalItems = 0;
        dto?.items.forEach((item) => {
            totalItems += item.quantity;
        });
        return totalItems;
    }


    return (
        <>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "60vh",
            }}
            >
                <TopNavBar/>
                <Container>
                    {/*{*/}
                    {/*    dto && params.transactionId*/}
                    {/*        ?*/}
                    {/*        <>*/}

                    {/*            <CheckoutProductDetails/>*/}
                    {/*            <CheckoutBox total={dto.total} tid={params.transactionId}/>*/}
                    {/*        </>*/}
                    {/*        : <LoadingPage/>*/}
                    {/*}*/}
                    {
                        dto && params.transactionId
                            ? <Grid container spacing={3} mt={1}
                                    flexDirection={{
                                        xs: 'column',
                                        sm: 'column',
                                        md: 'row'
                                    }}
                            >
                                <Grid item xs={6}>
                                    {dto.items.map((value) => (
                                        <CheckoutProductDetails dto={value}/>
                                    ))}
                                </Grid>
                                <Grid item xs={6}>
                                    < CheckoutBox total={dto.total} tid={params.transactionId}
                                                  totalItems={calculateTotalItems()}/>
                                </Grid>
                            </Grid>
                            : <LoadingGif/>
                    }
                </Container>
                {/*<Box style={{position: "fixed", bottom: 0, width: "100%"}}>*/}
                {/*</Box>*/}
            </Box>
            <Footer/>
        </>
    )
}