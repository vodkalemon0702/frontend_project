import Button from "@mui/material/Button";
import {CircularProgress, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";

type Props = {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    handleDelete: () => Promise<void>
}

export default function DeleteConfirmDialog({isOpen, setIsOpen, handleDelete}: Props) {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const handleDeleteClick = async () => {
        setIsDeleting(true);
        await handleDelete();
        setIsOpen(false);
        setIsDeleting(false);
    }

    return (
        <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            {
                isDeleting
                    ? <DialogTitle id="alert-dialog-title">
                        <CircularProgress />
                    </DialogTitle>
                    : <>
                        <DialogTitle id="alert-dialog-title">
                            {"Confirm Delete?"}
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={() => setIsOpen(false)}>No</Button>
                            <Button onClick={handleDeleteClick} autoFocus>
                                Confirm
                            </Button>
                        </DialogActions>
                    </>

            }
        </Dialog>
    )
}