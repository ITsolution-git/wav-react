import React, { Component } from 'react';

import { getHomeRoute } from '../../helpers/AuthHelper';


class BaseComponent extends Component {
    constructor(props, context) {
        super(props, context);
    }

    onLink = (route) => {
        this.props.history.push(route)
    };

    redirectToHome = () => {
        this.onLink( getHomeRoute());
    };
}

export default BaseComponent;