import {createBrowserRouter} from "react-router-dom";
import ProductListingPage from "../ui/page/ProductListingPage";
import ErrorPage from "../ui/page/ErrorPage";
import ProductDetailPage from "../ui/page/ProductDetailPage";
import LoginPage from "../ui/page/LoginPage";
import ShoppingCartPage from "../ui/page/ShoppingCartPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductListingPage/>,
        errorElement:<ErrorPage/>
    },
    {
        path: "/product/:productId",
        element: <ProductDetailPage/>
    },
    {
        path: "/cart",
        element: <ShoppingCartPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    // {
    //     path: "/checkout/:transactionId",
    //     element: <Checkout/>
    // },
    // {
    //     path: "/thankyou",
    //     element: <ThankYou/>
    // }
    {
        path: "/error",
        element:<ErrorPage/>
    }
])