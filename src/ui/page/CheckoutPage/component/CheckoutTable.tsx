import CheckoutTableRow from "./CheckoutTableRow.tsx";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {TransactionDto} from "../../../../data/transaction/TransactionDto.ts";

type Props = {
    dto: TransactionDto;
}

export default function CheckoutTable({dto}: Props) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Unit Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Sub-Total</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        dto.items.map((value) => (
                            <CheckoutTableRow key={value.tpid} dto={value}/>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}