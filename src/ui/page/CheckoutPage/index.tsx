import CheckoutTable from "./component/CheckoutTable.tsx";
import NavBar from "../../component/NavBar.tsx";
import Container from "@mui/material/Container";
import CheckoutBox from "./component/CheckoutBox.tsx";
import {useContext, useEffect, useState} from "react";
import {TransactionDto} from "../../../data/transaction/TransactionDto.ts";
import LoadingPage from "../../component/LoadingPage.tsx";
import {useNavigate, useParams} from "react-router-dom";
import * as TransactionApi from "../../../api/TransactionApi.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {UserData} from "../../../data/user/UserData.ts";

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


    return (
        <Container>
            <NavBar/>
            {
                dto && params.transactionId
                    ? <>
                        <CheckoutTable dto={dto}/>
                        <CheckoutBox total={dto.total} tid={params.transactionId}/>
                    </>
                    : <LoadingPage/>
            }
        </Container>
    )
}