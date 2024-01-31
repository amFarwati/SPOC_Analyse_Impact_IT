import React from 'react';
import Caroussel from '../components/Caroussel';
import Navbar from '../components/Navbar';
import Graph from '../components/Graph';

function Home() {
    return (
        <div>
            <Navbar />
            <Caroussel />
            <Graph />
        </div>
    );
}

export default Home