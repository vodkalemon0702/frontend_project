import TopNavBar from "../../component/NavList/TopNavBar.tsx";
import Box from "@mui/material/Box";
import {Alert, Button, Divider, Paper, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import {useNavigate} from "react-router-dom";
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {GoogleLoginButton} from "react-social-login-buttons";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);

    const navigate = useNavigate();

    const loginUser = useContext<UserData | null | undefined>(LoginUserContext);

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPassword(event.target.value);
    }

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const longinResult = await FirebaseAuthService.handleSignInWithEmailAndPassword(email, password);
        if (longinResult) {
            navigate(-1)
        } else {
            setIsLoginFailed(true);
        }
    }

    const handleGoogleSignIn = async () => {
        if (await FirebaseAuthService.handleSignInWithGoogle()) {
            navigate(-1)
        }
    }

    useEffect(() => {
        if (loginUser) {
            navigate("/");
        }
    }, [loginUser]);

    return (
        <>
            <TopNavBar/>
            <Box sx={{
                width: "100%",
                height: "92vh",
                backgroundColor: "lightgrey",
                display: "flex",
                justifyContent: "center"
            }}
            >
                <Paper elevation={3} sx={{
                    width: "480px",
                    height: "fit-content",
                    px: 3, py: 3, mt: 3, mb: 3
                }}
                       component="form"
                       onSubmit={handleLogin}
                >
                    {
                        isLoginFailed &&
                        <Box mb={2}>
                            <Alert variant="filled" severity="error">
                                Login Failed!
                            </Alert>
                        </Box>
                    }
                    <Box>
                        <TextField label="Email" variant="outlined" fullWidth type={"email"}
                                   onChange={handleEmailChange}/>
                    </Box>
                    <Box mt={3}>
                        <TextField label="Password" variant="outlined" fullWidth type={"password"}
                                   onChange={handlePasswordChange}/>
                    </Box>
                    <Box mt={2}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                height:50
                            }}
                        >
                            LOGIN
                        </Button>
                        <Divider sx={{my: 1}}/>
                        <GoogleLoginButton
                            style={{width: '100%', margin: '0'}}
                            onClick={handleGoogleSignIn}/>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}