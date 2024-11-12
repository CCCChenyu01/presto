import * as React from 'react'; 
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MediaCard = (props) => {
    const temp = props.presentation ? Object.entries(props.presentation) : [];

    if (temp.length === 0) {
        return null;
    }

    return (
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {temp.map(([id, presentation]) => (
                <Card
                    key={id}
                    sx={{
                        width: '200px',
                        height: '100px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: '10px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    }}
                >
                    <CardMedia
                        sx={{ height: 60, backgroundColor: presentation.thumbnail ? 'transparent' : '#e0e0e0' }}
                        image={presentation.thumbnail || ''}
                        title={presentation.title || 'Thumbnail'}
                        component="img"
                        style={{
                            width: '100%',
                            aspectRatio: '2 / 1',
                            objectFit: 'cover',
                            display: presentation.thumbnail ? 'block' : 'none',
                        }}
                    />
                    {!presentation.thumbnail && (
                        <div style={{
                            width: '100%',
                            height: '60px',
                            backgroundColor: '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Typography variant="subtitle2" color="textSecondary">
                                No Image
                            </Typography>
                        </div>
                    )}
                    <CardContent sx={{ padding: '5px 0' }}>
                        <Typography variant="h6" component="div" noWrap>
                            {presentation.title || 'Untitled'}
                        </Typography>
                        {presentation.description && (
                            <Typography variant="body2" color="textSecondary" noWrap>
                                {presentation.description}
                            </Typography>
                        )}
                        <Typography variant="caption" color="textSecondary">
                            Slides: {presentation.slidesCount || 0}
                        </Typography>
                    </CardContent>
                    <CardActions sx={{ padding: '5px 5px', justifyContent: 'flex-end' }}>
                        <Button size="small" onClick={() => gotosingle(id)}>Edit</Button>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
};

export default MediaCard;
