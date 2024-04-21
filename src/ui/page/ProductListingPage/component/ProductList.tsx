import Grid from '@mui/material/Grid';
import {ProductListDto} from "../../../../data/product/ProductListDto.ts";
import Product from "./Product.tsx";
import Container from "@mui/material/Container";
import LoadingPage from "../../../component/LoadingPage.tsx";

type Props = {
    productList: ProductListDto[];
}

export default function ProductList({productList}: Props) {
    return (
        <Container sx={{flexGrow: 1}}>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                {
                    productList
                        ? productList.map((value) => (
                            <Grid item xs={2} sm={4} md={4} key={value.pid}>
                                <Product productList={value}/>
                            </Grid>
                        ))
                        : <LoadingPage/>
                }
            </Grid>
        </Container>
    );
}