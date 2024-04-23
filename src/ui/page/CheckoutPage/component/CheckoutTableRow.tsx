import {TableCell, TableRow} from "@mui/material";
import {TransactionProductDto} from "../../../../data/transaction/TransactionDto.ts";

type Props = {
    dto: TransactionProductDto;
}

export default function CheckoutTableRow({dto}: Props) {


    return (
        <TableRow
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
        >
            <TableCell>
                <img src={dto.product.image_url} width="120"/>
            </TableCell>
            <TableCell>{dto.product.name}</TableCell>
            <TableCell >{`$${dto.product.price.toLocaleString()}`}</TableCell>
            <TableCell>{dto.quantity}</TableCell>
            <TableCell>{`$${dto.subTotal.toLocaleString()}`}</TableCell>
        </TableRow>
    )
}