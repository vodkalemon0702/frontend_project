import NavBar from "../../component/NavBar.tsx";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

export default function ThankYouPage() {
    const [second, setSecond] = useState<number>(5);
    const navigate = useNavigate();


    const handleCountDown = (() => {
        setSecond((prevState) => (
            prevState - 1
        ))
    })

    useEffect(() => {
        const countDown = setTimeout(handleCountDown, 1000)
        if (second <= 0){
            navigate("/")
        }
        return (() => {
            clearTimeout(countDown);
        })
    }, [second])


    return (
        <Container>
            <NavBar/>
            <Box>
                <Typography>
                    back to home page in {second}second
                </Typography>
            </Box>
            <Box>
                <img
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExd3htZ3lmM2h1eTVwMWw3OHhvOW92NWt5a2V0ajF2c3Fqd3N4cHNwZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3CLLLQCX25HP3gxbyK/giphy.gif"
                    width="100%"/>
            </Box>
        </Container>
    )
}