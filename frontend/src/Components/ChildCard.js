import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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

export default function ChildCard(props) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardHeader
                action={<DialogComponent edit={true} id={props.data._id} />}
                title={props.data.title}
                style={{ backgroundColor: '#c09090' }}
            />
            <CardContent>
                <>{JSON.stringify(props.data.description)}</>
            </CardContent>
        </Card>
    );
}
