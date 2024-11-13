import * as React from 'react';  
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

const MediaCard = (props) => {
    const temp = props.presentation ? Object.entries(props.presentation) : [];

    if (temp.length === 0) {
        return null;
    }

    const navigate=useNavigate()
    const gotosingle=(id)=>{
      navigate(`/presentation/${id}`)
    }
    return (
      <Box 
        sx={{ 
            display: 'flex', 
            gap: '15px', 
            flexWrap: 'wrap', 
            justifyContent: 'center', // Center content
        }}
      >
          {temp.map(([id, presentation]) => (
              <Card 
                key={id} 
                sx={{ 
                    width: '200px', // Set width as twice the height for 2:1 ratio
                    height: '100px', // Set height to half the width
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: 3,
                    '@media (min-width: 768px)': {
                        width: '250px', // Adjust for larger screens
                        height: '125px',
                    },
                    '@media (min-width: 1200px)': {
                        width: '300px', // Adjust for very large screens
                        height: '150px',
                    },
                }}
              >
                  {/* Thumbnail */}
                  <CardMedia
                      sx={{ 
                          height: '50%', 
                          bgcolor: presentation.thumbnail ? 'transparent' : 'grey.300', // Grey if empty
                      }}
                      image={presentation.thumbnail || ""}
                      title={presentation.title || "No Image"}
                  />
                  
                  {/* Card Content */}
                  <CardContent sx={{ padding: '8px', textAlign: 'left' }}>
                      {/* Title */}
                      <Typography variant="h6" component="div">
                          {presentation.title}
                      </Typography>

                      {/* Description (show only if available) */}
                      {presentation.description && (
                          <Typography variant="body2" color="text.secondary">
                              {presentation.description}
                          </Typography>
                      )}

                      {/* Slide Count */}
                      <Typography variant="body2" color="text.secondary">
                          Slides: {presentation.slides ? presentation.slides.length : 0}
                      </Typography>
                  </CardContent>

                  {/* Actions */}
                  <CardActions>
                      <Button size="small" onClick={() => gotosingle(id)}>Edit</Button>
                  </CardActions>
              </Card>
          ))}
      </Box>
  );
};

export default MediaCard;
