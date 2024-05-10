import Box from "@mui/material/Box";
import TopNavBar from "../../component/TopNavBar.tsx";

export default function ErrorPage(){
    return(
        <>
        <TopNavBar/>
            <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
                <img src="https://w3-lab.com/wp-content/uploads/2022/09/FOR-WEB-404-astronaut.jpg"/>
            </Box>
        </>
    )
}