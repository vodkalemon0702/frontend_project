import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import {useState} from "react";
import Container from "@mui/material/Container";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import IconButton from "@mui/material/IconButton";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

const steps = [
    {
      imgPath: 'https://gshock.casio.com/content/casio/locales/jp/ja/brands/gshock/_jcr_content/root/responsivegrid/container_879908243_/carousel_copy_copy/image_copy.casiocoreimg.png/1713736757596/pc-1920x816-0315.png'
    },
    {
        imgPath: 'https://www.casio.com/content/experience-fragments/casio/locales/jp/ja/top_banner/gshock/master/_jcr_content/root/container/image.casiocoreimg.jpeg/1704417644912/pc-w1920h816-logo.jpeg'

    },
    {
        imgPath: 'https://www.casio.com/content/casio/locales/jp/ja/products/watches/gshock/_jcr_content/root/responsivegrid/carousel_copy/image_1431869481_cop.casiocoreimg.jpeg/1712119165800/pc-w1920h816-logo.jpeg'

    },
    {
        imgPath: 'https://www.casio.com/content/casio/locales/jp/ja/products/watches/gshock/_jcr_content/root/responsivegrid/carousel_copy/image_copy.casiocoreimg.jpeg/1712119165852/casio-24ss-web-1920pxx816px.jpeg'

    },
    {
        imgPath: 'https://www.casio.com/content/casio/locales/jp/ja/products/watches/gshock/_jcr_content/root/responsivegrid/carousel_copy/image_187820677_copy.casiocoreimg.jpeg/1712119165903/pc-w1920h816-rangeman-logo.jpeg'

    },
    {
        imgPath: 'https://www.casio.com/content/casio/locales/jp/ja/products/watches/gshock/_jcr_content/root/responsivegrid/carousel_copy/teaser_copy_copy_cop.casiocoreimg.jpeg/1712119165954/gd-b500-kv-pc-log.jpeg'

    },
    {
        imgPath: 'https://www.casio.com/content/casio/locales/jp/ja/products/watches/gshock/_jcr_content/root/responsivegrid/carousel_copy/image_716323714_copy_1449835808.casiocoreimg.jpeg/1712119165748/full-metal-kv-pc.-logo.jpeg'

    },
    {
        imgPath: 'https://www.casio.com/content/casio/locales/jp/ja/products/watches/gshock/_jcr_content/root/responsivegrid/carousel_copy/image_1678898588_cop.casiocoreimg.jpeg/1712119166114/pc-4.jpeg'
    },
];

export default function ProductListingHeader() {
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Container>
            <Box sx={{position: 'relative', display: 'flex', alignItems: 'center'}}>
                <Box sx={{height: 440, width: '100%', p: 2}}>
                    <img src={steps[activeStep].imgPath} width="100%" height={440}/>
                    <Box sx={{position: 'absolute', left: -80, top: '50%', transform: 'translateY(-50%)',margin: '0 20px'}}>
                        <IconButton onClick={handleBack} disabled={activeStep === 0}>
                            <ChevronLeftRoundedIcon fontSize="large"/>
                        </IconButton>
                    </Box>
                    <Box sx={{position: 'absolute', right: -80, top: '50%', transform: 'translateY(-50%)',margin: '0 20px'}}>
                        <IconButton onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            <ChevronRightRoundedIcon fontSize="large"/>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    nextButton={<></>}
                    backButton={<></>}
                    sx={{
                        mt: 4
                    }}
                />
            </Box>
            {/*<MobileStepper*/}
            {/*    steps={maxSteps}*/}
            {/*    position="static"*/}
            {/*    activeStep={activeStep}*/}
            {/*    nextButton={*/}
            {/*        <Button*/}
            {/*            size="medium"*/}
            {/*            onClick={handleNext}*/}
            {/*            disabled={activeStep === maxSteps - 1}*/}
            {/*        >*/}
            {/*            Next*/}
            {/*            /!*{theme.direction === 'rtl' ? (*!/*/}
            {/*            /!*    <KeyboardArrowLeft/>*!/*/}
            {/*            /!*) : (*!/*/}
            {/*            /!*    <KeyboardArrowRight/>*!/*/}
            {/*            /!*)}*!/*/}
            {/*        </Button>*/}
            {/*    }*/}
            {/*    backButton={*/}
            {/*        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>*/}
            {/*            /!*{theme.direction === 'rtl' ? (*!/*/}
            {/*            /!*    <KeyboardArrowRight/>*!/*/}
            {/*            /!*) : (*!/*/}
            {/*            /!*    <KeyboardArrowLeft/>*!/*/}
            {/*            /!*)}*!/*/}
            {/*            Back*/}
            {/*        </Button>*/}
            {/*    }*/}
            {/*/>*/}
            {/*</Box>*/}
        </Container>
    )
}