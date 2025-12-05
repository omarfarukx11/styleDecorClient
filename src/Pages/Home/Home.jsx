import React from 'react';
import Service from '../../../../../Milestone 11/zap-shift-client/src/pages/Home/Service/Service';
import TopDecorators from './TopDecorators';
import ServiceMap from './ServiceMap';
import Hero from './Hero';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Service></Service>
            <TopDecorators></TopDecorators>
            {/* <ServiceMap></ServiceMap> */}

        </div>
    );
};

export default Home;