import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import {Button} from "@mui/material";
import imgSrc2 from "../../img/btmbar2.png";
import imgSrc3 from "../../img/btmbar3.png";
import imgSrc4 from "../../img/btmbar4.jpeg";
import imgSrc5 from "../../img/btmbar5.jpeg";
import iconSrc1 from "../../img/btmbaricon1.png";
import IconButton from "@mui/material/IconButton";
import iconSrc2 from "../../img/btmbaricon2.png";
import iconSrc3 from "../../img/btmbaricon3.png";
import iconSrc4 from "../../img/btmbaricon4.png";

export default function Footer() {
    return (
        <Box
            mt={8}
            sx={{
                width: "100%",
                height: "auto",
                backgroundColor: "black",
                paddingTop: "1rem",
                paddingBottom: "1rem",
                position: "relative",
            }}
        >
            <Container>
                <Grid container direction="column" alignItems="center" spacing={5}>
                    <Grid item xs={12} style={{position: 'absolute', top: '-30px', right: '10px'}}>
                        <IconButton><img src={iconSrc1} height={24}/></IconButton>
                        <IconButton><img src={iconSrc2} height={24}/></IconButton>
                        <IconButton><img src={iconSrc3} height={24}/></IconButton>
                        <IconButton><img src={iconSrc4} height={24}/></IconButton>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} flexDirection={{xs: 'column', sm: 'row', md: 'row'}}
                          sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <img src={`${imgSrc2}`} height={100}/>
                        <img src={`${imgSrc3}`} height={100}/>
                        <img src={`${imgSrc4}`} height={100}/>
                        <img src={`${imgSrc5}`} height={100}/>
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <Button style={{paddingRight: "3rem"}}>
                            <Typography color="white" variant="body2">
                                Privacy Stuff
                            </Typography>
                        </Button>
                        <Button style={{paddingRight: '3rem'}}>
                            <Typography color="white" variant="body2">
                                Legal Stuff
                            </Typography>
                        </Button>
                        <Button style={{paddingRight: '3rem'}}>
                            <Typography color="white" variant="body2">
                                Copyright Dispute
                            </Typography>
                        </Button>
                        <Button style={{paddingRight: '3rem'}}>
                            <Typography color="white" variant="body2">
                                Copyright Dispute
                            </Typography>
                        </Button>
                        <Button style={{paddingRight: '3rem'}}>
                            <Typography color="white" variant="body2">
                                Sweepstakes
                            </Typography>
                        </Button>
                        <Button>
                            <Typography color="white" variant="body2">
                                Creator Application
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography color="white" variant="subtitle1" textAlign="center">
                            {`${new Date().getFullYear()} | React | Material UI | React Router |Spring Boot | Spring M-V-C`}
                        </Typography>
                        <Typography color="white" variant="subtitle1" textAlign="center">
                            {`Copyright © ${new Date().getFullYear()} MAN's CO. LTD.`}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}