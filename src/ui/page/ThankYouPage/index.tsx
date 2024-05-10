import TopNavBar from "../../component/TopNavBar.tsx";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";
import thankYouIcon from "../../../img/thankYouPageIcon.gif";

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
            <TopNavBar/>
            <Box display='flex' justifyContent='center' alignItems='center' mb={4} flexDirection='column'>
                <Typography variant='h3' color='lightgreen'>
                    Check Out Success!
                    Love Youuuuu
                </Typography>
                <Typography variant='h6'>
                    Back to home page in {second} second
                </Typography>
            </Box>
            <Box>
                <img
                    src={thankYouIcon}
                    width="100%"/>
            </Box>
        </Container>
    )
}