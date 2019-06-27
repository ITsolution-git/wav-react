import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import { Helmet } from 'react-helmet';

import history from '../../utility/History';
import { getHomeRoute } from '../../helpers/AuthHelper';
import pubsubConstants from "../../constants/PubSubConstants";
import routes from '../../constants/Routes';
import { isMobile, isTablet } from '../../helpers/DeviceHelper';

class BaseComponent extends Component {

    onLink = (route, params) => {
        PubSub.publish(pubsubConstants.onLocationChange, route);
        history.push(route, params);
    };

    redirectToHome = () => {
        this.onLink( getHomeRoute());
    };

    renderRequiredFieldMsg = () => {
        return (
            <div className="text-18-dark-blue-bold" style={{ marginBottom: 20 }}>
                Fields marked with <span style={{ color: 'red'}}>*</span> are required
            </div>
        )
    };

    isMobile = () => {
        return isMobile;
    };

    isTablet = () => {
        return isTablet;
    };
    
    isDesktop = () => {
        return !isMobile;
    };

    renderBackground = (color) => {
      return (
          <Helmet bodyAttributes={{style: `background-color : ${color}`}}>
          </Helmet>
      )
    };

    isOnBoarding = () => {
        const { pathname = ''} = this.props.history.location,
            { welcome, socialConnect, selectDistrict, selectVoters } = routes,
            boardingRoutes = [ welcome,  socialConnect, selectDistrict, selectVoters ]
            .map(route => route.toLowerCase());

        return boardingRoutes.includes(pathname.toLowerCase());
    };
}

export default BaseComponent;
