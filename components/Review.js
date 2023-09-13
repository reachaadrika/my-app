import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Rating from '@mui/material/Rating';

export default function Review() {
    const [value, setValue] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        // Load reviews from local storage when the component mounts
        const storedReviews = JSON.parse(localStorage.getItem('userReviews')) || [];
        setReviews(storedReviews);
    }, []);

    const handleReviewChange = (e) => {
        setNewReview(e.target.value);
    };

    const handleSubmitReview = () => {
        if (newReview.trim() !== '') {
            const reviewObj = {
                text: newReview,
                date: new Date().toLocaleString(),
            };

            // Add the new review to the reviews array
            const updatedReviews = [...reviews, reviewObj];
            setReviews(updatedReviews);

            // Clear the input field
            setNewReview('');

            // Store the updated reviews in local storage
            localStorage.setItem('userReviews', JSON.stringify(updatedReviews));

            console.log(updatedReviews);
            setIsDialogOpen(true);
        }
    };

    const handleCloseDialog = () => {
        // Close the dialog
        setIsDialogOpen(false);
    };

    return (
        <div>
            <div style={ { display: 'flex', flexDirection: 'column', gap: '20px' } }>
                <Rating
                    name="simple-controlled"
                    value={ value }
                    onChange={ (event, newValue) => {
                        setValue(newValue);
                    } }
                    style={ { marginTop: '2px', marginLeft: '10px', marginBottom: '10px', width: '80%' } }
                    size="large" />
                <TextField
                    style={ { marginTop: '2px', marginLeft: '10px', marginBottom: '10px', width: '80%' } }
                    id="outlined-multiline-static"
                    label="Enter your feedback"
                    value={ newReview }
                    onChange={ handleReviewChange }
                    placeholder="Type your review here..."
                    multiline
                    rows={ 4 }
                />
            </div>
            <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={ handleSubmitReview }
                style={ { marginTop: '10px', marginLeft: '10px', marginBottom: '10px' } }
            >
                Submit your Review :)
            </Button>

            {/* Modal for successful submission*/ }
            <Dialog open={ isDialogOpen } onClose={ handleCloseDialog } style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
                <DialogTitle>
                    <CheckCircleOutlineIcon style={ { color: 'green', fontSize: 40, display: 'flex', justifyContent: 'center' } } />

                </DialogTitle>
                <DialogContent>
                    <DialogContentText>Your review has been submitted.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleCloseDialog } color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div >

    );
}
