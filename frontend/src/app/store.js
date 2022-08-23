import { configureStore } from '@reduxjs/toolkit';
import CardReducer from '../features/CardReducer/CardReducer';

export const store = configureStore({
    reducer: {
        card: CardReducer,
    },
});
