import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { ColomnData } from '../Utils/DropDownData';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function DialogComponent({ openButton }) {
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        colomn: 1,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setFormData({
            title: '',
            description: '',
            colomn: 1,
        });
        setOpen(false);
    };

    function handleChange(e) {
        e.preventDefault();
        setFormData((prev) => {
            let newData = {
                ...prev,
                [e.target.name]: e.target.value,
            };
            return newData;
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // todo save api
    };

    return (
        <div>
            <IconButton aria-label="settings" onClick={handleClickOpen}>
                <AddIcon />
            </IconButton>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <form
                    className="w-100"
                    style={{ minWidth: '500px' }}
                    onSubmit={handleSubmit}
                >
                    <BootstrapDialogTitle
                        id="customized-dialog-title"
                        onClose={handleClose}
                    >
                        Add Card
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <>
                            <label className="">Title</label>
                            <input
                                type={'text'}
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-100"
                                required
                            />
                        </>
                        <>
                            <label className="">Desccription</label>
                            <input
                                type={'text'}
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-100"
                                required
                            />
                        </>
                        <>
                            <label className="">Colomn</label>
                            <select
                                className="w-100"
                                name="colomn"
                                value={formData.colomn}
                                onChange={handleChange}
                                required
                            >
                                {ColomnData?.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                        </>
                    </DialogContent>
                    <DialogActions>
                        <button
                            className="btn btn-secondary"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                        <button
                            autoFocus
                            className="btn btn-primary"
                            onClick={onsubmit}
                        >
                            Save changes
                        </button>
                    </DialogActions>
                </form>
            </BootstrapDialog>
        </div>
    );
}
