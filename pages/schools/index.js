// pages/schools/index.js
import Link from 'next/link';
import { useState } from 'react';
import schoolData from '../../data/schools.json';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import styles from '../../styles/Schools.module.css';

import FeedbackStars from '../../components/FeedbackStars';
export default function Schools() {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredSchools = schoolData.filter((school) =>
        school.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div>
            <h1>Schools Listing Page</h1>
            <div className={ styles.search }>
                <FormControl variant="standard" style={ { width: '80%', textAlign: 'center', justifyContent: 'center' } }>
                    <TextField
                        label="Search Schools"
                        id="margin-normal"
                        margin="normal"
                        type="text"
                        placeholder="Search by name"
                        value={ searchTerm }
                        onChange={ (e) => setSearchTerm(e.target.value) }
                        InputProps={ {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />


                                </InputAdornment>
                            ),
                            startAdornment: (
                                <InputAdornment position="start" >
                                    <SchoolIcon />
                                </InputAdornment>


                            )
                        } }
                    />
                </FormControl></div>


            <div className={ styles.schoolsContainer }>

                <div className={ styles.cardGrid } >

                    { filteredSchools.map((school) => (

                        <Card key={ school.id } sx={ { maxWidth: 345 } } className={ styles.schoolCard }>
                            <CardMedia
                                sx={ { height: 80, width: 80, margin: '0 auto', marginTop: 2 } }
                                image={ school.imageUrl }

                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    { school.name }
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    { school.description }
                                </Typography>
                                <FeedbackStars rating={ school.rating } />
                            </CardContent>
                            <CardActions>
                                <Button size="small">Share</Button>
                                <Link href={ `/schools/${ school.id }` }>
                                    <Button size="small">Learn More</Button>
                                </Link>

                            </CardActions>
                        </Card>

                    )) }

                </div>

            </div>

        </div>
    );
}
