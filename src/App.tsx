import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./config/RouterConfig.tsx";
import {UserData} from "./data/user/UserData.ts";
import {useEffect, useState} from "react";
import * as FirebaseAuthService from "./authService/FirebaseAuthService.ts";
import {LoginUserContext} from "./context/LoginUserContext.ts";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
    const [loginUser, setLoginUser]
        = useState<UserData | null | undefined>(undefined);

    useEffect(() => {
        FirebaseAuthService.handleOnAuthStateChanged(setLoginUser)
    }, []);

    return (
        <>
            <LoginUserContext.Provider value={loginUser}>
                <RouterProvider router={router}/>
            </LoginUserContext.Provider>
        </>
    )
}

export default App
