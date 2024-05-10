import Box from "@mui/material/Box";
import {Alert, Button, Divider, Icon, Paper, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useContext, useEffect, useState} from "react";
import * as FirebaseAuthService from "../../../authService/FirebaseAuthService.ts"
import {useNavigate} from "react-router-dom";
import {UserData} from "../../../data/user/UserData.ts";
import {LoginUserContext} from "../../../context/LoginUserContext.ts";
import {GoogleLoginButton} from "react-social-login-buttons";
import TopNavBar from "../../component/TopNavBar.tsx";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

export default function LoginPage() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoginFailed, setIsLoginFailed] = useState<boolean>(false);
    const [isSigningUp, setIsSigningUp] = useState<boolean>(false);

    const navigate = useNavigate();

    const loginUser = useContext<UserData | null | undefined>(LoginUserContext);

    const bgvideo = "https://fsse2401-project-man.s3.ap-southeast-1.amazonaws.com/LoginPageVideo.mp4";

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

    const renderLoginOrSignUp = () => {
        if (!isSigningUp) {
            return (
                <Paper elevation={3} sx={{
                    width: "480px",
                    height: "fit-content",
                    px: 3, py: 3, mt: 3, mb: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(8px)',
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
                            // variant="contained"
                            sx={{
                                height: 50,
                                color: "white",
                                backgroundColor: "black",
                                "&:hover": {
                                    color: "black",
                                    backgroundColor: "white",
                                    border: '1px solid black',
                                }
                            }}
                        >
                            LOGIN
                        </Button>
                        <Divider sx={{my: 1}}/>
                        <GoogleLoginButton
                            style={{width: '100%', margin: '0'}}
                            onClick={handleGoogleSignIn}/>
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="space-between"
                         ml={2} mr={2} mt={2}>
                        <Typography variant='subtitle1'>
                            Do not have account?
                        </Typography>
                        <Button style={{color: 'black'}}
                                onClick={() => setIsSigningUp(true)}>
                            Create Account
                        </Button>
                    </Box>
                </Paper>
            )
        } else {
            return (
                <Paper elevation={3} sx={{
                    width: "480px",
                    height: "fit-content",
                    px: 3, py: 3, mt: 3, mb: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(8px)',
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
                    <Box mt={3}>
                        <TextField label="Re-enter password" variant="outlined" fullWidth type={"password"}
                                   onChange={handlePasswordChange}/>
                    </Box>
                    <Box mt={2}>
                        <Button
                            type="submit"
                            fullWidth
                            // variant="contained"
                            sx={{
                                height: 50,
                                color: "white",
                                backgroundColor: "black",
                                "&:hover": {
                                    color: "black",
                                    backgroundColor: "white",
                                    border: '1px solid black',
                                }
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
            )
        }
    }

    return (
        <>
            <TopNavBar/>
            <Container>
                <Box sx={{
                    width: "100%",
                    height: "75vh",
                    // backgroundColor: "lightgrey",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                    <video
                        autoPlay
                        loop
                        muted
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            zIndex: -1,
                        }}
                    >
                        <source src={bgvideo}/>
                    </video>
                    {renderLoginOrSignUp()}
                </Box>
            </Container>

        </>
    )
}