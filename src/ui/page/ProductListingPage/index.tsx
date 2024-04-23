import {useEffect, useState} from "react";
import {ProductListDto} from "../../../data/product/ProductListDto.ts";
import ProductList from "./component/ProductList.tsx";
import * as ProductApi from "../../../api/ProductApi.ts"
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import LoadingPage from "../../component/LoadingPage.tsx";
import NavBar from "../../component/NavBar.tsx";
import ProductListingHeader from "./component/ProductListingHeader.tsx";
import Container from "@mui/material/Container";
import {Divider} from "@mui/material";

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
            <Container>
                {/*<Box mb={4}>*/}
                {/*    <video width={"100%"} autoPlay muted loop>*/}
                {/*        <source*/}
                {/*            src="https://media.rolex.com/video/upload/c_limit,w_1920/f_auto:video/q_auto:best/v1/rolexcom/new-watches/2024/hub-new-watches/videos/cover/watches-new-watches-2024-hub-cover-autoplay"/>*/}
                {/*    </video>*/}
                {/*</Box>*/}
                <Box>
                    <Box mb={4}>
                        <ProductListingHeader/>
                    </Box>
                    <Box my={3}>
                    <Divider color="black"/>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <iframe
                            width="80%"
                            height="500"
                            src="https://www.youtube.com/embed/t8mLzN8kUAU?si=SzfgABljuo8eNZLv&autoplay=1&muted=true"
                            style={{ border: 'none' }}
                            allow="autoplay;encrypted-media"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        >
                        </iframe>
                    </Box>
                    <Box>
                        {productListDto
                            ? <ProductList productList={productListDto}/>
                            : <LoadingPage/>
                        }
                    </Box>
                </Box>
            </Container>
        </>
    )

}