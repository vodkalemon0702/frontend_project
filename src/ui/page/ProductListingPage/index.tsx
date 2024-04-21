import {useEffect, useState} from "react";
import {ProductListDto} from "../../../data/product/ProductListDto.ts";
import ProductList from "./component/ProductList.tsx";
import * as ProductApi from "../../../api/ProductApi.ts"
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import LoadingPage from "../../component/LoadingPage.tsx";
import NavBar from "../../component/NavBar.tsx";

export default function ProductListingPage() {
    const [productListDto, setProductListDto]
        = useState<ProductListDto[] | undefined>(undefined);

    const navigate = useNavigate();


    const fetchAllProducts = async () => {
        try {
            const responseDtoList = await ProductApi.getAllProducts();
            setProductListDto(responseDtoList);
        } catch (error) {
            navigate("/error");
        }
    }

    useEffect(() => {
        fetchAllProducts();
    }, [])



    return (
        <>
            <NavBar/>
            <Box mb={4}>
                <video width={"100%"} autoPlay muted loop>
                    <source
                        src="https://media.rolex.com/video/upload/c_limit,w_1920/f_auto:video/q_auto:best/v1/rolexcom/new-watches/2024/hub-new-watches/videos/cover/watches-new-watches-2024-hub-cover-autoplay"/>
                </video>
            </Box>
            <Box>
                {
                    productListDto
                        ? <ProductList productList={productListDto}/>
                        : <LoadingPage/>
                }
            </Box>
        </>
    )

}