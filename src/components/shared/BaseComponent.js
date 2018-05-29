import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import PubSub from "pubsub-js";
import Typography from 'material-ui/Typography';

import history from '../../utility/History';
import { getHomeRoute } from '../../helpers/AuthHelper';
import pubsubConstants from "../../constants/PubSubConstants";


class BaseComponent extends Component {
    constructor(props, context) {
        super(props, context);
    }

    onLink = (route, params) => {
        PubSub.publish(pubsubConstants.onLocationChange, route);
        history.push(route, params);
    };

    redirectToHome = () => {
        this.onLink( getHomeRoute());
    };

    renderRequiredFieldMsg = () => {
        return (
            <Typography gutterBottom>
                Fields marked with <span style={{ color: 'red'}}>*</span> are required
            </Typography>
        )
    };

    isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    isDesktop = () => {
        return !this.isMobile();
    };

    renderBackToHome = (style) => {
        style = this.isDesktop() ? style || {'left': '1%', 'position': 'absolute'} : null;
        return (
            <Button className='btn btn-primary' style={style}
                    onClick={this.redirectToHome}>
                Go back

            </Button>
        );
    };
}

export default BaseComponent;