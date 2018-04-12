import React from 'react';

import BaseComponent from '../../shared/BaseComponent';

export default class TaskBase extends BaseComponent {
    constructor(props, context) {
        super(props, context);
    }

    handleChange = (name, value) => {
        this.setState({ [name]: value });
    };

    validateField = (name) => {
        return !!this.state[name];
    }
}