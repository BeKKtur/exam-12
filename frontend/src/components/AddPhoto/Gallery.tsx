import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchImage} from "./imageThunk";
import {Box, Card, CardContent, CardMedia, Container, styled, Typography} from "@mui/material";

const Gallery = () => {
    const dispatch = useAppDispatch();
    const images = useAppSelector(state => state.image.images);

    useEffect(() => {
        dispatch(fetchImage())
    }, [dispatch]);

    const ImageCardMedia = styled(CardMedia)({
        height:0,
        paddingTop: '56.25%'
    })


    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
            >
                {images?.map(image => (
                    <Card sx={{ maxWidth: 345,mb: 5, width: '300px', mr: 5}} key={image._id}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {image.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default Gallery;