import {TransactionDto} from "../data/transaction/TransactionDto.ts";
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts";
import axios from "axios";

const baseUrl = "http://localhost:8080";

const getAuthConfig = async () => {
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken) {
        throw new Error();
    }
    return {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }
}

export async function prepareTransaction(): Promise<TransactionDto> {
    try {
        const response = await axios.post<TransactionDto>(
            `${baseUrl}/transaction/prepare`,
            null,
            await getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getTransactionByTid(tid: string): Promise<TransactionDto> {
    try {
        const response = await axios.get<TransactionDto>(
            `${baseUrl}/transaction/${tid}`,
            await getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function finishTransaction(tid: string): Promise<void> {
    try {
        await axios.patch(
            `${baseUrl}/transaction/${tid}/pay`,
            null,
            await getAuthConfig()
        );
        await axios.patch(
            `${baseUrl}/transaction/${tid}/finish`,
            null,
            await getAuthConfig()
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}