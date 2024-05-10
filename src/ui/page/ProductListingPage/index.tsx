import {useEffect, useState} from "react";
import {ProductListDto} from "../../../data/product/ProductListDto.ts";
import ProductList from "./component/ProductList.tsx";
import * as ProductApi from "../../../api/ProductApi.ts"
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import LoadingPage from "../../component/LoadingPage.tsx";
import TopNavBar from "../../component/TopNavBar.tsx";
import ProductListingHeader from "./component/ProductListingHeader.tsx";
import Container from "@mui/material/Container";
import {Divider} from "@mui/material";
import Footer from "../../component/Footer.tsx";

const videoUrl = "https://fsse2401-project-man.s3.ap-southeast-1.amazonaws.com/HomePageVideo.mp4";

export default function ProductListingPage() {
    const [productListDto, setProductListDto]
        = useState<ProductListDto[] | undefined>(undefined);

    const navigate = useNavigate();


    const fetchAllProducts = async () => {
        try {
            setProductListDto(undefined);
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
            <TopNavBar/>
            <Container>
                <Box
                >
                    <Box mb={4}>
                        <ProductListingHeader/>
                    </Box>
                    <Box my={4}>
                        <Divider color="black"/>
                    </Box>
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <video width="80%" autoPlay muted loop>
                            <source src={videoUrl}/>
                        </video>
                    </Box>
                    <Box
                    >
                        {productListDto
                            ?
                                <ProductList productList={productListDto}/>
                            : <LoadingPage/>
                        }
                    </Box>
                </Box>
            </Container>
            <Footer/>
        </>
    )

}