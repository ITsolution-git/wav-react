import React, { Component } from 'react';

import { getHomeRoute } from '../../helpers/AuthHelper';


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
}

export default BaseComponent;