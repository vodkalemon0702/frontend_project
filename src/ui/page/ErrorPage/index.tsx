import Box from "@mui/material/Box";
import NavBar from "../../component/NavBar.tsx";

export default function ErrorPage(){
    return(
        <>
        <NavBar/>
            <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
                <img src="https://w3-lab.com/wp-content/uploads/2022/09/FOR-WEB-404-astronaut.jpg"/>
            </Box>
        </>
    )
}