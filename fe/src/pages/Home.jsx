import React from 'react';
import api from '../api/api';

const Home = () => {
    const getAPI = api.getDataStock()
    console.log(getAPI)
    return (
        <div>
            
        </div>
    );
};

export default Home;