import React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

export default function FeedbackStars({ rating }) {
    return (
        <Box component="fieldset" borderColor="transparent">
            <Rating name="feedback-rating" value={ rating } precision={ 0.5 } readOnly />
        </Box>
    );
}
