import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect } from 'react';
import CardComponent from './Components/CardComponent';
import { fetchInitialCardData } from './features/CardReducer/CardReducer';

function App() {
    const dispatch = useDispatch();

    const { cardData } = useSelector((state) => state.card);

    useEffect(() => {
        dispatch(fetchInitialCardData);
        return () => dispatch(fetchInitialCardData());
    }, []);

    return (
        <div className="App">
            <ToastContainer position="top-center" autoClose={3000} />
            <div className="row m-0 mt-5 justify-content-center">
                <div className="col-3">
                    <CardComponent
                        title={'Todo'}
                        todoCardData={cardData.todoData}
                    />
                </div>
                <div className="col-3">
                    <CardComponent
                        title={'Doing'}
                        todoCardData={cardData.doingData}
                    />
                </div>
                <div className="col-3">
                    <CardComponent
                        title={'Done'}
                        todoCardData={cardData.doneData}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
