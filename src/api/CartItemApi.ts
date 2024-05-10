import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts"
import axios from "axios";
import {GetAllCartItemDto} from "../data/cart/GetAllCartItemDto.ts";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;

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

export async function putCartItem(pid: number, quantity: number): Promise<void> {
    try {
        await axios.put(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig()
        )
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getCartItems(): Promise<GetAllCartItemDto[]> {
    try {
        const response = await axios.get<GetAllCartItemDto[]>(
            `${baseUrl}/cart`,
            await getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function patchCartItemQuantity(pid: number, quantity: number) {
    try {
        const response = await axios.patch(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function deleteCartItem(pid: number) {
    try {
        await axios.delete(
            `${baseUrl}/cart/${pid}`,
            await getAuthConfig()
        )
    } catch (error) {
        console.error(error);
        throw error;
    }
}