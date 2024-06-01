import {AppBar, Grid, styled, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../User/userSlice";
import UserMenu from "./UserMenu";
import AnonymousMenu from "./AnonymousMenu";

const LogoLink = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit'
    }
})

const AppToolbar = () => {
    const user = useAppSelector(selectUser);


    return (
        <AppBar>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems='center'>
                    <Typography variant="h6" component='div'>
                        <LogoLink to='/'>Gallery</LogoLink>
                    </Typography>
                    <Grid item>
                        {user ? (
                            <UserMenu user={user}/>
                        ) : (<AnonymousMenu/>)
                        }
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;