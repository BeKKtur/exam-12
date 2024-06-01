import {Button, Grid, Link, Menu, MenuItem} from "@mui/material";
import React, {useState} from "react";
import {User} from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {unsetUser} from "../User/userSlice";
import {Link as RouterLink} from "react-router-dom";

interface Props {
    user: User;
}

const UserMenu:React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch()

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (e:React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        dispatch(unsetUser())
    }

    return (
        <>
            <Grid>
                <Button
                    color='inherit'
                    onClick={handleClick}
                >
                    Hello {user.displayName}
                </Button>
                <Link component={RouterLink} to="/new-photo" variant="body2" color='inherit'>
                    Add new photo
                </Link>
            </Grid>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                keepMounted
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>

            </Menu>
        </>
    );
};

export default UserMenu;