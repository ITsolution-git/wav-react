import React, { Component } from 'react';

import authStorage from '../../storage/AuthStorage';
import { redirectToHome } from '../../helpers/AuthHelper';

const Authorization = (RouteComponent, roles) => {
    return class WithAuthorization extends Component {
        constructor(props, context) {
            super(props, context);
            this.state = {};
        }

        render() {
            const currentRole = authStorage.getCurrentRole();
            if (roles.indexOf(currentRole) !== -1) {
                return <RouteComponent {...this.props} />
            }
            redirectToHome();

        }
    };
};

export default Authorization;
