import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const DisplayData = ({ data }) => {
    return (
        <Card className='text-center'>
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
        </Card>
    );
};

export default DisplayData;
