import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import DialogComponent from './DialogComponent';
import ChildCard from './ChildCard';

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
            <CardHeader
                action={<DialogComponent edit={false} />}
                title={props.title}
                style={{
                    backgroundColor: '#ededed',
                    borderBottom: '1px solid #f0f0f0',
                }}
            />
            <CardContent style={{ backgroundColor: '#f5f5f5' }}>
                <>
                    {props?.todoCardData?.map((item) => {
                        return (
                            <div className="m-2" key={item._id}>
                                <ChildCard data={item} />
                            </div>
                        );
                    })}
                </>
            </CardContent>
        </Card>
    );
}
