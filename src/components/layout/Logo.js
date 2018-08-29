import React from 'react';

import BaseComponent from '../shared/BaseComponent';
import logo from '../../resources/images/logo.png';

export default class extends BaseComponent {

    render() {
        return (
            <img onClick={this.redirectToHome}
                 src={logo}
                 alt=""
                 width={100} height={80} />
        )
    }
}