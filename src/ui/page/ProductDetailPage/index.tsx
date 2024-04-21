import {useEffect, useState} from "react";
import {ProductDetailDto} from "../../../data/product/ProductDetailDto.ts";
import ProductDetailsContainer from "./component/ProductDetailsContainer.tsx";
import Container from "@mui/material/Container";
import * as ProductApi from "../../../api/ProductApi.ts"
import {useNavigate, useParams} from "react-router-dom";
import LoadingPage from "../../component/LoadingPage.tsx";
import NavBar from "../../component/NavBar.tsx";


type Params = {
    productId: string;
}

export default function ProductDetailPage() {
    const [productDetailDto, setProductDetailDto]
        = useState<ProductDetailDto | undefined>(undefined);
    const {productId} = useParams<Params>();
    const navigate = useNavigate();
    const fetchProductDetailsDto = async (pid: string) => {
        try {
            const responseDto = await ProductApi.getProductByPid(pid);
            setProductDetailDto(responseDto);
        } catch (error) {
            navigate("/error");
        }
    }

    useEffect(() => {
        if (productId) {
            fetchProductDetailsDto(productId);
        } else {
            navigate("/error")
        }
    }, [])

    return (
        <>
            <NavBar/>
            <Container>
                {
                    productDetailDto
                        ? <ProductDetailsContainer productDetailDto={productDetailDto}/>
                        : <LoadingPage/>
                }
            </Container>
        </>
    )
}