import React from 'react';
import './App.css';
import CardComponent from './Components/CardComponent';

function App() {
    return (
        <div className="App">
            <div className="row m-0 mt-5 justify-content-center">
                <div className="col-3">
                    <CardComponent title={'Todo'} />
                </div>
                <div className="col-3">
                    <CardComponent title={'Doing'} />
                </div>
                <div className="col-3">
                    <CardComponent title={'Done'} />
                </div>
            </div>
        </div>
    );
}

export default App;
