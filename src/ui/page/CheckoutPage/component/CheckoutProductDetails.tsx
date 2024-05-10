import {Paper} from "@mui/material";
import {TransactionProductDto} from "../../../../data/transaction/TransactionDto.ts";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

type Props = {
    dto: TransactionProductDto;
}

const imageBaseUrl = "https://gshock.casio.com/content/casio/locales/jp/ja/brands/gshock/products/"


export default function CheckoutProductDetails({dto}: Props) {
    return (
        <Container>
            {/*<TableContainer component={Paper} style={{*/}
            {/*    border: '2px solid black'*/}
            {/*}}>*/}
            {/*    <Table sx={{minWidth: 650}} aria-label="simple table">*/}
            {/*        <TableHead>*/}
            {/*            <TableRow>*/}
            {/*                <TableCell></TableCell>*/}
            {/*                <TableCell>Item</TableCell>*/}
            {/*                <TableCell>Unit Price</TableCell>*/}
            {/*                <TableCell>Quantity</TableCell>*/}
            {/*                <TableCell>Sub-Total</TableCell>*/}
            {/*            </TableRow>*/}
            {/*        </TableHead>*/}
            {/*        <TableBody>*/}
            {/*            {*/}
            {/*                dto.items.map((value) => (*/}
            {/*                    <CheckoutTableRow key={value.tpid} dto={value}/>*/}
            {/*                ))*/}
            {/*            }*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</TableContainer>*/}

            <Paper elevation={22}
                   style={{
                       display: "flex",
                       alignItems: 'center',
                       border: '2px solid black',
                       marginBottom: 20,
                       minWidth:'400px'
                   }}
            >
                <Grid mt={2} ml={2} mr={4}>
                    <img src={`${imageBaseUrl}${dto.product.image_url}`} height={130}/>
                </Grid>
                <Grid display="flex" flexDirection="column" width={400} pr={2}>
                    <Typography>
                        {dto.product.name}
                    </Typography>
                    <Grid display="flex" justifyContent="space-between">
                        <Typography color='grey'>
                            Unit Price
                        </Typography>
                        <Typography>
                            {`$${dto.product.price.toLocaleString()}`}
                        </Typography>
                    </Grid>
                    <Grid display="flex" justifyContent="space-between">
                        <Typography color='grey'>
                            Quantity
                        </Typography>
                        <Typography>
                            {dto.quantity}
                        </Typography>
                    </Grid>
                    <Grid display="flex" justifyContent="space-between">
                        <Typography color='grey'>
                            SubTotal
                        </Typography>
                        <Typography>
                            {`$${dto.subTotal.toLocaleString()}`}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}