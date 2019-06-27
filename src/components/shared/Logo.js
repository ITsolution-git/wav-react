/**
 * Logo Component
 */
import React from 'react';
import { withRouter } from 'react-router-dom';

import { BaseComponent } from '../shared';
import logo from '../../resources/images/logo.svg';

class Logo extends BaseComponent {

    render() {
        const { width = 65, height = 44, staticContext, ...props } = this.props;
        return (
            <img {...props}
                 src={logo}
                 alt=""
                 width={width} height={height} />
        )
    }
}

export default withRouter(Logo);