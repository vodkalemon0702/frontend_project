export interface UpdateCartItemQuantityDto {
    pid:           number;
    name:          string;
    price:         number;
    stock:         number;
    image_url:     string;
    cart_quantity: number;
}
