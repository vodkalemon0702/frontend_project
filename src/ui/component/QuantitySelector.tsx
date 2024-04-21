import {Stack} from "@mui/material";
import Box from "@mui/material/Box";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

type Props = {
    quantity: number;
    handleMinus: () => void;
    handlePlus: () => void;
}

export default function QuantitySelector({quantity, handleMinus, handlePlus}: Props) {
    return (
        <Stack direction="row" alignItems="center">
            <Box>
                <IconButton color="error" onClick={handleMinus}>
                    <RemoveCircleOutlineIcon/>
                </IconButton>
            </Box>
            <Box>
                <Typography textAlign="center">{quantity}</Typography>
            </Box>
            <Box>
                <IconButton color="success" onClick={handlePlus}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </Box>
        </Stack>
    )
}