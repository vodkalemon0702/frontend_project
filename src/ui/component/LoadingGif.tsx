import loadingGif from "../../img/loadingGif.gif"
import Box from "@mui/material/Box";

export default function LoadingGif() {
    return (
        // <Box width="100%" display='flex' justifyContent={}>
            <Box display="flex" alignItems="center" justifyContent="center"
            sx={{
                width: "100%",
            }}>
                <img src={loadingGif} width={400}/>
            </Box>
        // </Box>
    )
}