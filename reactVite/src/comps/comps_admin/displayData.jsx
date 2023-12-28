// import React from 'react';
// import { Card, CardContent, Typography, Grid } from '@mui/material';

// const DisplayData = ({ data }) => {
//     return (
//         <Card className='text-center'>
//             <CardContent>
//                 <Typography variant="h6">Details</Typography>
//                 <Grid container spacing={2}>
//                     <Grid item xs={30}>
//                         <Typography variant="body1">
//                             Level: {data.level}
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={30}>
//                         <Typography variant="body1">
//                             Gender: {data.gender ? 'Male' : 'Female'}
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={30}>
//                         <Typography variant="body1">
//                             Age Group: {data.ageGroup}
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={30}>
//                         <Typography variant="body1">
//                             date: {data.dateTime.date}
//                         </Typography>
//                         <Typography variant="body1">
//                             hour: {data.dateTime.hour}
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={30}>
//                         <Typography variant="body1">
//                            Teacher: {data.teacherId.user_id.name.firstName} {data.teacherId.user_id.name.lastName} 
//                         </Typography>
//                     </Grid>
//                 </Grid>
//             </CardContent>
//         </Card>
//     );
// };

// export default DisplayData;

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const MediaCard = ({ data }) => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
            />
            <CardContent>

                <Typography variant="h6">Details</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={30}>
                        <Typography variant="body1">
                            Level: {data.level}
                        </Typography>
                    </Grid>
                    <Grid item xs={30}>
                        <Typography variant="body1">
                            Gender: {data.gender ? 'Male' : 'Female'}
                        </Typography>
                    </Grid>
                    <Grid item xs={30}>
                        <Typography variant="body1">
                            Age Group: {data.ageGroup}
                        </Typography>
                    </Grid>
                    <Grid item xs={30}>
                        <Typography variant="body1">
                            date: {data.dateTime.date}
                        </Typography>
                        <Typography variant="body1">
                            hour: {data.dateTime.hour}
                        </Typography>
                    </Grid>
                    <Grid item xs={30}>
                        <Typography variant="body1">
                            Teacher: {data.teacherId.user_id.name.firstName} {data.teacherId.user_id.name.lastName}
                        </Typography>
                    </Grid>
                </Grid>


            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default MediaCard;