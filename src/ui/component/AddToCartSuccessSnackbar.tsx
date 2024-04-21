import {Alert, Snackbar} from "@mui/material";
import {Dispatch, SetStateAction} from "react";

type Props = {
    snackbarOpen: boolean;
    setSnackbarOpen: Dispatch<SetStateAction<boolean>>;
}

export default function AddToCartSuccessSnackbar({snackbarOpen, setSnackbarOpen}: Props) {
    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: "bottom", horizontal: "right"}}
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={() => setSnackbarOpen(false)}>
                <Alert severity="success">
                    Success Add To Cart
                </Alert>
            </Snackbar>
        </>
    )
}