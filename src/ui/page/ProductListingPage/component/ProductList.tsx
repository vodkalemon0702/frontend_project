import Grid from '@mui/material/Grid';
import {ProductListDto} from "../../../../data/product/ProductListDto.ts";
import Product from "./Product.tsx";
import Container from "@mui/material/Container";
import {useState} from "react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

type Props = {
    productList: ProductListDto[];
}

export default function ProductList({productList}: Props) {
    const [page, setPage] = useState(1);
    const [pageSize] = useState(6);

    const totalPages = Math.ceil(productList.length / pageSize);

    const getCurrentPageProducts = () => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return productList.slice(startIndex, endIndex);
    };


    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    // const getCurrentPageProducts = ():ProductListDto[] => {
    //     const startIndex = (page - 1) * pageSize;
    //     const endIndex = startIndex + pageSize;
    //     return productList.slice(startIndex, endIndex);
    // };
    //
    // const handleChange = (event: ChangeEvent<unknown>, value: number) => {
    //     setPage(value);
    // };

    return (
        // <Container sx={{flexGrow: 1}}>
        //     <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
        //         {
        //             productList
        //                 ? productList.map((value) => (
        //                     <Grid item xs={2} sm={4} md={4} key={value.pid}>
        //                         <Product productList={value}/>
        //                     </Grid>
        //                 ))
        //                 : <LoadingPage/>
        //         }
        //     </Grid>
        // </Container>


        // <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        //     <Pagination
        //         count={Math.ceil(productList.length / pageSize)}
        //         page={page}
        //         onChange={handleChange}
        //         sx={{marginBottom: '1rem'}}
        //     />
        //     <Grid container spacing={2}>
        //         {
        //             getCurrentPageProducts().map((value) => (
        //                 <Grid item xs={12} sm={6} md={4} key={value.pid}>
        //                     <Product productList={value}/>
        //                 </Grid>
        //             ))
        //         }
        //     </Grid>
        //     <Pagination
        //         count={Math.ceil(productList.length / pageSize)}
        //         page={page}
        //         onChange={handleChange}
        //         sx={{marginTop: '1rem'}}
        //     />
        // </Container>


        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative'}}>
            <Box sx={{position: 'absolute', left: 0, top: '50%', transform: 'translate(-70%, -50%)'}}>
                <IconButton
                    disabled={page === 1}
                    onClick={handlePrevPage}
                    sx={{
                        // backgroundColor: "black",
                        color: 'black',
                        // "&:hover": {
                        //     backgroundColor: "white",
                        //     color: 'black',
                        // }
                    }}
                >
                    <ArrowBackIosNewRoundedIcon fontSize="large"/>
                </IconButton>
            </Box>
            <Box sx={{position: 'absolute', right: 0, top: '50%', transform: 'translate(50%, -50%)'}}>
                <IconButton
                    disabled={page === totalPages}
                    onClick={handleNextPage}
                    sx={{
                        // backgroundColor: "black",
                        color: 'black',
                        // "&:hover": {
                        //     backgroundColor: "white",
                        //     color: 'black',
                        // }
                    }}
                >
                    <ArrowForwardIosRoundedIcon fontSize="large"/>
                </IconButton>
            </Box>
            <Grid container
                sx={{
                    "&:hover > :not(:hover)":{
                        opacity: "0.4",

                    },
                }}
            >
                {
                    getCurrentPageProducts().map((value) => (
                        <Grid item xs={12} sm={6} md={4} mb={4} key={value.pid}

                              sx={{
                                  transition: "opacity 0.6s ease",
                                  // "&:hover > :not(:hover)": {
                                  //     opacity: "0.4",
                                  // },
                              }}
                        >
                            {/*<Box*/}
                            {/*    sx={{*/}
                            {/*        // "&:hover > :not(:hover)": {*/}
                            {/*        //     opacity: "0.4",*/}
                            {/*        // }*/}
                            {/*        transition: "opacity 0.6s ease",*/}
                            {/*    }}*/}
                            {/*>*/}
                                <Product productList={value}/>
                            {/*</Box>*/}
                        </Grid>
                    ))
                }
            </Grid>
        </Container>
    );
}