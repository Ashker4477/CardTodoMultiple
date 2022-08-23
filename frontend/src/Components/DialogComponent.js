import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ColomnData } from '../Utils/DropDownData';
import { fetchInitialCardData } from '../features/CardReducer/CardReducer';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../Utils/getError';

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

export default function DialogComponent({ edit, id }) {
    const [open, setOpen] = useState(false);
    const [header, setHeader] = useState('');
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        colomn: 1,
    });

    const [formError, setFormError] = useState({
        title_error: '',
        description_error: '',
    });

    const getData = async (id) => {
        if (edit && id && open) {
            try {
                const { data } = await axios.get(
                    `http://localhost:8000/card/${id}`
                );
                setFormData(data);
            } catch (err) {
                console.log(err);
            }
        }
    };

    useEffect(() => {
        setHeader(() => (edit ? 'Edit Card Data' : 'Add Card Data'));
        if (open) getData(id);
        // return () => getData(id);
    }, [open]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // todo save api
        let title_validation = formData.title.match(
            formData.title.toUpperCase()
        );
        if (!title_validation) return;
        if (formData.description.length < 25) return;
        if (edit) {
            try {
                const res = await axios.put(
                    `http://localhost:8000/card/${id}`,
                    formData
                );
                if (res.error) {
                    toast.error(res.error);
                }
                toast.success('Card Updated Successfully');
                dispatch(fetchInitialCardData());
            } catch (err) {
                toast.error(getError(err));
                console.log(err);
            }
        } else {
            try {
                const res = await axios.post(
                    'http://localhost:8000/card',
                    formData
                );
                if (res.error) {
                    toast.error(res.error);
                }
                toast.success('Card Added Successfully');
                dispatch(fetchInitialCardData());
            } catch (err) {
                toast.error(getError(err));
                console.log(err);
            }
        }
        handleClose();
    };

    return (
        <div>
            <IconButton aria-label="settings" onClick={handleClickOpen}>
                {edit ? <MoreVertIcon /> : <AddIcon />}
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
                        {header}
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
