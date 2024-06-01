import React, {useState} from "react";
import {RegisterMutation} from "../../types";
import {Alert, Avatar, Box, Button, Container, Grid, Link, TextField, Typography} from "@mui/material";
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUserError} from "./userSlice";
import {register} from "./userThunk";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

const Register = () => {
    const dispatch = useAppDispatch();
    const error = useAppSelector(selectUserError);
    const navigate = useNavigate()

    const [state, setState] = useState<RegisterMutation>({
        email: '',
        password: '',
        displayName: '',
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
            await dispatch(register(state)).unwrap();
            navigate('/')
        } catch (error) {

        }
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
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                {error && <Alert variant='filled' severity="error">Error!</Alert>}
                <Box component="form" noValidate onSubmit={submitFormHandler} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="E-mail"
                                name="email"
                                autoComplete="new-email"
                                onChange={inputChangeHandler}
                                value={state.email}
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
                        <Grid item xs={12}>
                            <TextField
                                required
                                name="displayName"
                                label="display name"
                                type="text"
                                autoComplete="new-displayName"
                                value={state.displayName}
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
                        register
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;