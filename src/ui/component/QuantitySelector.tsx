import {CircularProgress, Stack} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';


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
                    size="large"
                    onClick={handleMinus}
                    disabled={isLoading}
                    style={{color: "black"}}>
                    {/*<RemoveCircleOutlineIcon/>*/}
                    <IndeterminateCheckBoxOutlinedIcon/>
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
                    size="large"
                    onClick={handlePlus}
                    disabled={isLoading}
                    style={{color: "black"}}>
                    {/*<AddCircleOutlineIcon/>*/}
                    <AddBoxOutlinedIcon/>
                </IconButton>
            </Box>
        </Stack>
    )
}