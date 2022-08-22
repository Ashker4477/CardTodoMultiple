import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { CardHeader } from '@mui/material';
import DialogComponent from './DialogComponent';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function CardComponent(props) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardHeader action={<DialogComponent />} title={props.title} />
            <CardContent>
                <></>
            </CardContent>
        </Card>
    );
}
