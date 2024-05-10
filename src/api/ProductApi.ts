import axios from "axios";
import {ProductListDto} from "../data/product/ProductListDto.ts";
import {ProductDetailDto} from "../data/product/ProductDetailDto.ts";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;

export async function getAllProducts(){
try{
    const response = await axios.get<ProductListDto[]>(`${baseUrl}/public/product`);
    return response.data;
}catch (error){
    console.error(error);
    throw error;
}
}

export async function getProductByPid(pid:string){
    try{
        const response = await axios.get<ProductDetailDto>(`${baseUrl}/public/product/${pid}`);
        return response.data;
    }catch (error){
        console.error(error);
        throw error;
    }
}