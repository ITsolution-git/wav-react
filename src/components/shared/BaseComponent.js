import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

import { getHomeRoute } from '../../helpers/AuthHelper';
import routes from "../../constants/Routes";


class BaseComponent extends Component {
    constructor(props, context) {
        super(props, context);
    }

    onLink = (route, params) => {
        this.props.history.push(route, params)
    };

    redirectToHome = () => {
        this.onLink( getHomeRoute());
    };

    renderBackToHome = (style) => {
        style = style || {'left': '2%', 'position': 'absolute'};
        return (
            <Button className='btn btn-primary' style={style}
                    onClick={() => this.onLink(routes.login)}>
                Go back
            </Button>
        );
    };
}

export default BaseComponent;