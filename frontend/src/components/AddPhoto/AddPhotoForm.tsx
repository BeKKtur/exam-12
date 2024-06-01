import {Box, Button, Container, Grid, TextField, Typography} from "@mui/material";
import FileInput from "./FileInput";
import {useAppDispatch} from "../../app/hooks";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {ImageMutation} from "../../types";
import {addImage} from "./imageThunk";

const AddPhotoForm = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const [state, setState] = useState<ImageMutation>({
        title: '',
        image: null,
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, files } = e.target;
        if (files){
            setState(prevState => ({
                ...prevState,
                [name]: files[0]
            }))
        }
    };

    const FileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
        const { name, value } = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        } );
    };

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(addImage(state));
            navigate('/')
        } catch (error) {

        }
    }

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',

                }}
            >
                <Typography variant='h4' textAlign='left'>
                    Add new photo
                </Typography>
                <Box component="form" noValidate sx={{mt: 3}} onSubmit={submitFormHandler}>
                    <Grid container  spacing={2} mb='10px' sx={{mb: 3}}>
                        <Grid item xs>
                            <TextField
                                required
                                label="Title"
                                name="title"
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Grid>
                        <FileInput
                            onChange={FileInputChangeHandler}
                            name='image'
                            label='Image'
                        />
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        add photo
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AddPhotoForm;