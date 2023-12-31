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
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
// import { Grid } from '@mui/material';
import { Card, Col } from 'antd';
const levels = ['Beginners', 'advanced', 'experts']
const DisplayData = ({ data }) => {
    return (
        <>
            <Col span={8} className='mt-3 text-center'>
                <Card title={`${levels[data.level-1]} - ${data.gender ? 'Male' : 'Female'} - ${data.ageGroup}`} className='shadow'>  
                    <p>date: {data.dateTime.date}</p>
                    <p>hour: {data.dateTime.hour}</p>
                    <p>Teacher: {data.teacherId.user_id.name.firstName} {data.teacherId.user_id.name.lastName}</p>
                </Card>
            </Col>
        </>
    );
}

export default DisplayData;