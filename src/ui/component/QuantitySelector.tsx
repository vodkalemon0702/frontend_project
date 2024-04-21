import {CircularProgress, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

type Props = {
    quantity: number;
    handleMinus: () => void;
    handlePlus: () => void;
    isLoading?: boolean;
}

export default function QuantitySelector({quantity, handleMinus, handlePlus, isLoading = false}: Props) {
    return (
        <Stack direction="row" alignItems="center">
            <Box>
                <IconButton
                    color="error"
                    onClick={handleMinus}
                    disabled={isLoading}>
                    <RemoveCircleOutlineIcon/>
                </IconButton>
            </Box>
            <Box>
                {
                    isLoading
                        ? <CircularProgress size="1rem" color="primary"/>
                        : <Typography textAlign="center">{quantity}</Typography>
                }
            </Box>
            <Box>
                <IconButton
                    color="success"
                    onClick={handlePlus}
                    disabled={isLoading}>
                    <AddCircleOutlineIcon/>
                </IconButton>
            </Box>
        </Stack>
    )
}