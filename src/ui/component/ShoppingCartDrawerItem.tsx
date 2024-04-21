    import Box from "@mui/material/Box";
    import Typography from "@mui/material/Typography";
    import {Divider} from "@mui/material";
    import {GetAllCartItemDto} from "../../data/cart/GetAllCartItemDto.ts";

    type Props = {
        dto:GetAllCartItemDto;
    }

    export default function ShoppingCartDrawerItem({dto}:Props) {
        return (
            <Box>
                <Box display="flex">
                    <Box>
                        <img
                            src={dto.image_url}
                            width={120}
                        />
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" component="div" mt={4} fontWeight="bolder">
                            {dto.name}
                        </Typography>
                        <Box display="flex" mt={3}>
                            <Typography variant="body1" component="div" color="text.secondary" mr={8}>
                                {`Price: $${dto.price.toLocaleString()}`}
                            </Typography>
                            <Typography variant="body1" component="div" color="text.secondary">
                                {`Quantity: ${dto.cart_quantity}`}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{my: 2}}/>
            </Box>
        )
    }