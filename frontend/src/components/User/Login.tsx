import React, {useState} from "react";
import {LoginMutation} from "../../types";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Alert, Avatar, Box, Button, Container, Grid, Link, TextField, Typography} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen"
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectLoginError} from "./userSlice";
import {googleLogin, login} from "./userThunk";
import {GoogleLogin} from "@react-oauth/google";

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectLoginError);

    const [state, setState] = useState<LoginMutation>({
        email: '',
        password: '',
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        } );
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(login(state)).unwrap();
            navigate('/')
        } catch (error) {

        }
    }

    const googleLoginHandler = async (credential:string) => {
        await dispatch(googleLogin(credential)).unwrap();
        navigate('/')
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOpenIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {error && <Alert severity='error' sx={{mt: 5, width: '100%'}}>{error.error}</Alert>}
                <Box sx={{pt: 2}}>
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            if (credentialResponse.credential){
                                googleLoginHandler(credentialResponse.credential)
                            }
                        }}
                        onError={() => {
                            console.log('login error');
                        }}
                    />
                </Box>
                <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="E-mail"
                                name="email"
                                autoComplete="new-email"
                                value={state.email}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                value={state.password}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2">
                                or register
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;