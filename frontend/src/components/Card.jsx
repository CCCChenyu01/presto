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

    const navigate = useNavigate();
    const gotosingle = (id) => {
        navigate(`/presentation/${id}/${1}`);
    };

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                gap: '15px', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                padding: '10px',
            }}
        >
            {temp.map(([id, presentation]) => (
                <Card 
                    key={id} 
                    sx={{ 
                        flexBasis: 'calc(25% - 15px)', 
                        maxWidth: '300px', // maxwidth limit
                        height: 'auto', 
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        boxShadow: 3,
                        '@media (max-width: 768px)': {
                            flexBasis: 'calc(50% - 15px)', // two card
                        },
                        '@media (max-width: 500px)': {
                            flexBasis: '100%', // one card
                        },
                    }}
                >
                    {/* Thumbnail */}
                    <CardMedia
                        component="img"
                        sx={{ 
                            height: '100px', 
                            bgcolor: presentation.thumbnail ? 'transparent' : 'grey.300',
                            objectFit: 'cover',
                        }}
                        image={presentation.thumbnail || ""}
                        alt={presentation.title || "No Image"}
                        onError={(e) => { 
                            e.target.src = ''; 
                            e.target.style.backgroundColor = '#e0e0e0'; 
                        }}
                    />
                    
                    {/* Card Content */}
                    <CardContent sx={{ padding: '8px', textAlign: 'left', maxHeight: '60px', overflow: 'hidden' }}>
                        <Typography variant="h6" component="div" noWrap>
                            {presentation.title}
                        </Typography>

                        {presentation.description && (
                            <Typography variant="body2" color="text.secondary" noWrap>
                                {presentation.description}
                            </Typography>
                        )}

                        <Typography variant="body2" color="text.secondary">
                            Slides: {Object.keys(presentation).length - 1}
                        </Typography>
                    </CardContent>

                    {/* Actions */}
                    <CardActions sx={{ justifyContent: 'center', padding: '8px' }}>
                        <Button size="small" onClick={() => gotosingle(id)}>Edit</Button>
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
};

export default MediaCard;