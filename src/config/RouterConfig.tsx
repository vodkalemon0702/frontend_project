import {createBrowserRouter} from "react-router-dom";
import ProductListingPage from "../ui/page/ProductListingPage";
import ErrorPage from "../ui/page/ErrorPage";
import ProductDetailPage from "../ui/page/ProductDetailPage";
import LoginPage from "../ui/page/LoginPage";
import ShoppingCartPage from "../ui/page/ShoppingCartPage";
import CheckoutPage from "../ui/page/CheckoutPage";
import ThankYouPage from "../ui/page/ThankYouPage";

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
    {
        path: "/checkout/:transactionId",
        element: <CheckoutPage/>
    },
    {
        path: "/thankyou",
        element: <ThankYouPage/>
    },
    {
        path: "/error",
        element:<ErrorPage/>
    }
])