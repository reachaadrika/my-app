
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';
import schoolData from '../../data/schools.json';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import styles from '../../styles/Schools.module.css';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { InputAdornment } from '@mui/material';

import FeedbackStars from '../../components/FeedbackStars';
import Review from '../../components/Review';


export default function School({ school }) {
    const [userLocation, setUserLocation] = useState({
        latitude: '', // User's latitude input
        longitude: '', // User's longitude input
    });
    const [distance, setDistance] = useState(null);
    const [showDistance, setShowDistance] = useState(false);

    useEffect(() => {
        if (userLocation.latitude && userLocation.longitude) {

            const distanceInKm = calculateDistance(
                parseFloat(userLocation.latitude),
                parseFloat(userLocation.longitude),
                school.location.latitude,
                school.location.longitude
            );

            setDistance(distanceInKm.toFixed(2));
        }
    }, [school, userLocation]);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    };

    const deg2rad = (deg) => {
        return deg * (Math.PI / 180);
    };

    const handleLatitudeChange = (e) => {

        const latitude = e.target.value;
        setUserLocation({ ...userLocation, latitude });
        if (!latitude || latitude.trim() === '') {
            setShowDistance(false);
        }
    };

    const handleLongitudeChange = (e) => {
        const longitude = e.target.value;
        setUserLocation({ ...userLocation, longitude });
        if (!longitude || longitude.trim() === '') {
            setShowDistance(false);
        }
    };
    const handleCalculateDistance = () => {
        if (userLocation.latitude && userLocation.longitude) {
            // Calculate distance when the button is clicked
            const distanceInKm = calculateDistance(
                parseFloat(userLocation.latitude),
                parseFloat(userLocation.longitude),
                school.location.latitude,
                school.location.longitude
            );

            setDistance(distanceInKm.toFixed(2));
            setShowDistance(true); // Show the distance
        }
    };

    return (
        <>
            <div className={ styles.container }>
                <h1>{ school.name }</h1>
                <Card sx={ { maxWidth: '100%', display: 'flex', flexDirection: 'column' } }>
                    <CardActionArea sx={ { display: 'flex', flexDirection: 'row' } }>
                        <CardMedia
                            sx={ { height: 80, width: 80, marginTop: 2, marginLeft: 10 } }
                            image={ school.imageUrl }
                        />
                        <CardContent style={ { display: 'flex', flexDirection: 'column', flexGrow: 1 } }>
                            <Typography gutterBottom variant="h5" component="div">
                                { school.name }
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                { school.description }
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                <FmdGoodIcon fontSize="small" />
                                { school.address }
                            </Typography>
                            <FeedbackStars rating={ school.rating } />
                        </CardContent>

                    </CardActionArea>

                </Card>
            </div>
            <div className={ styles.Cardscontainer }>

                <div>
                    <Card style={ { marginTop: '50px' } }>
                        <Typography gutterBottom variant="h5" component="div" style={ { marginLeft: '10px', marginTop: '10px' } }>
                            Calculate how far your child goes to school
                        </Typography>
                        <Divider />
                        <div>

                            <FormControl variant="standard" style={ { width: '90%', textAlign: 'center', justifyContent: 'flex-start', marginLeft: '10px' } }>
                                <TextField
                                    label=" Enter Latitude:"
                                    id="margin-normal"
                                    margin="normal"
                                    type="text"
                                    value={ userLocation.latitude }
                                    onChange={ handleLatitudeChange }
                                    InputProps={ {

                                        startAdornment: (
                                            <InputAdornment position="start" >
                                                <FmdGoodIcon fontSize="small" />
                                            </InputAdornment>


                                        )
                                    } }
                                />
                            </FormControl></div>



                        <div>

                            <FormControl variant="standard" style={ { width: '90%', textAlign: 'center', justifyContent: 'flex-start', marginLeft: '10px' } }>
                                <TextField
                                    label="  Enter Longitude:"
                                    id="margin-normal"
                                    margin="normal"
                                    type="text"
                                    value={ userLocation.longitude }
                                    onChange={ handleLongitudeChange }
                                    InputProps={ {

                                        startAdornment: (
                                            <InputAdornment position="start" >
                                                <FmdGoodIcon fontSize="small" />
                                            </InputAdornment>


                                        )
                                    } }
                                />
                            </FormControl></div>


                        <Button
                            variant="contained"
                            color="primary"
                            disableElevation
                            onClick={ handleCalculateDistance }
                            style={ { marginTop: '10px', marginLeft: '10px', marginBottom: '10px' } }
                        >
                            Calculate Distance
                        </Button>
                        { console.log(showDistance) }
                        { showDistance && (
                            <Typography variant="h6" style={ { marginTop: '10px', marginLeft: '10px', marginBottom: '10px' } } >
                                Distance from your location: { distance } km
                            </Typography>
                        ) }
                    </Card>
                </div>

                <div>
                    <Card style={ { marginTop: '50px' } }>
                        <Typography gutterBottom variant="h5" component="div" style={ { marginLeft: '10px', marginTop: '10px' } }>
                            Drop Your Reviews
                        </Typography>
                        <Divider />
                        <Review />
                    </Card>
                </div>
            </div>

        </>
    );
}

export async function getStaticPaths() {
    const paths = schoolData.map((school) => ({
        params: { id: school.id },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const school = schoolData.find((s) => s.id === params.id);
    return { props: { school } };
}
