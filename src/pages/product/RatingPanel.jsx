import React from 'react';
import { Box, Typography, List, ListItem, Rating, Button, CircularProgress } from '@mui/material';

const RatingSummary = ({ averageRating, totalRatings }) => (
  <Box
    sx={{
      position: 'relative',
      marginBottom: '20px',
    }}
    className="rating-summary"
  >
    <Typography variant="body1">Average Rating: {averageRating}</Typography>
    <Typography variant="body1">Total Ratings: {totalRatings}</Typography>
    <Rating value={averageRating} precision={0.1} readOnly />
  </Box>
);

const RatingBreakdown = ({ ratingData }) => (
  <List sx={{ padding: 0 }}>
    {Object.entries(ratingData).map(([ratingLevel, percentage]) => (
      <ListItem
        key={ratingLevel}
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
          width: '100%',
        }}
      >
        <Typography variant="body1" sx={{ flex: '0 0 20%' }}>{ratingLevel} Stars</Typography>
        <Box
          sx={{
            flex: '1 1 auto',
            position: 'relative',
            marginLeft: '10px',
            height: '20px',
            borderRadius: '10px',
            backgroundColor: '#f5f5f5',
            overflow: 'hidden',
            border: '1px solid #ccc',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${percentage}%`,
              backgroundColor: '#e94560',
              borderRadius: '10px',
              transition: 'width 0.3s ease-in-out',
            }}
          />
          <CircularProgress
            variant="determinate"
            value={percentage}
            size={20}
            thickness={3}
            sx={{ color: '#e94560', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          />
        </Box>
        <Typography variant="body2" sx={{ flex: '0 0 20%', marginLeft: '10px', fontWeight: '600', color: 'black' }}>
          {percentage}%
        </Typography>
      </ListItem>
    ))}
  </List>
);

export default function RatingPanel({ averageRating, totalRatings, ratingData, loading }) {

  
  const scrollToReview = () => {
    const reviewsCntr = document.getElementById('reviews-cntr');
   if(reviewsCntr){
     reviewsCntr.scrollIntoView({ behavior: 'smooth', block: 'start' });

   }
  }

  return (
    <Box
      className="rating-panel"
      sx={{
        position: 'absolute',
        top: '30px',
        left: '20%',
        transform: 'translateX(-50%)',
        width: '80%',
        maxWidth: '600px',
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        transition: 'height 0.3s ease-in-out',
        textAlign: 'center',
        zIndex: 8,
      }}
    >
      {loading ? (
        <CircularProgress sx={{ color: '#e94560' }} />
      ) : (
        <>
          <RatingSummary averageRating={averageRating} totalRatings={totalRatings} />
          <Typography variant="subtitle1" sx={{ marginTop: '20px' }}>Rating Breakdown:</Typography>
          <RatingBreakdown ratingData={ratingData} />
          <button className='Btn' onClick={scrollToReview}>See customer reviews</button>
        </>
      )}
    </Box>
  );
}
