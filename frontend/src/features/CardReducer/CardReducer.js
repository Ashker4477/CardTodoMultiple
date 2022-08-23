import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getError } from '../../Utils/getError';

const initialState = {
    error: '',
    loading: false,
    cardData: {
        todoData: [],
        doingData: [],
        doneData: [],
    },
};

export const CardSlice = createSlice({
    name: 'cardFetch',
    initialState,
    reducers: {
        start: (state) => {
            state.loading = true;
        },
        success: (state, action) => {
            state.loading = false;
            state.cardData.todoData =
                action.payload.length > 0
                    ? action.payload.filter((item) => item.colomn == 1)
                    : [];
            state.cardData.doingData =
                action.payload.length > 0
                    ? action.payload.filter((item) => item.colomn == 2)
                    : [];
            state.cardData.doneData =
                action.payload.length > 0
                    ? action.payload.filter((item) => item.colomn == 3)
                    : [];
        },
        fail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { start, success, fail } = CardSlice.actions;

export const fetchInitialCardData = () => async (dispatch, getState) => {
    dispatch(start());
    try {
        const { data } = await axios.get('http://localhost:8000/card');
        dispatch(success(data));
    } catch (err) {
        toast.error(getError(err));
        dispatch(fail(getError(err)));
    }
};
export const AddCardData = (data) => async (dispatch) => {};

export default CardSlice.reducer;
