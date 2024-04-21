import NavBar from "../../component/NavBar.tsx";
import {useContext, useEffect, useState} from "react";
import {GetAllCartItemDto} from "../../../data/cart/GetAllCartItemDto.ts";
import * as CartItemApi from "../../../api/CartItemApi.ts";
import {useNavigate} from "react-router-dom";
import CartItemContainer from "./component/CartItemContainer.tsx";
import LoadingPage from "../../component/LoadingPage.tsx";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {UserData} from "../../../data/user/UserData.ts";

export default function ShoppingCartPage() {
    const navigate = useNavigate();

    const [cartItemDtoList, setCartItemDtoList]
        = useState<GetAllCartItemDto[] | undefined>(undefined);

    const loginUser = useContext<UserData | undefined | null>(LoginUserContext);

    const fetchAllCartItemDto = async () => {
        try {
            const cartItemDto = await CartItemApi.getCartItems();
            setCartItemDtoList(cartItemDto);
        } catch (error) {
            navigate("/error")
        }
    }

    useEffect(() => {
        if (loginUser) {
            fetchAllCartItemDto();
        }
    }, [loginUser])

    return (
        <>
            <NavBar/>
            {
                cartItemDtoList
                    ? <CartItemContainer cartItemDtoList={cartItemDtoList} setDtoList={setCartItemDtoList}/>
                    : <LoadingPage/>
            }
        </>
    )
}