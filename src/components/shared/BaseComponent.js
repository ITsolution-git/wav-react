import React, { Component } from 'react';

class BaseComponent extends Component {
    constructor(props, context) {
        super(props, context);
    }

    onLink = (route) => {
        this.props.history.push(route)
    };
}

export default BaseComponent;