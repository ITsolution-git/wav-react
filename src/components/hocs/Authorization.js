import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import authStorage from '../../storage/AuthStorage';
import { checkCurrentUserStatus, authorizeRoute } from '../../actions'
import Routes from '../../constants/Routes'
import Role from '../../constants/Roles'

const Authentication = (RouteComponent, roles) => {
    class WithAuthentication extends Component {
        constructor(props, context) {
            super(props, context);
            this.state = {};
        }

        componentWillMount() {
            this.props.checkCurrentUserStatus()
        }

        render() {
            const { history } = this.props
            const user = authStorage.getLoggedUser()
            if (!user) history.push(Routes.signIn)
            const currentRole = authStorage.getCurrentRole();
            const route = authorizeRoute(user)
            
            if (currentRole === Role.captain && route && history.location.pathname !== route ) {
                console.log('route', route)
                history.push(route)
            }
            if (roles.indexOf(currentRole) !== -1) {
                console.log('role', RouteComponent)
                return <RouteComponent {...this.props} />
            }
            // redirectToHome();
            return null;
        }
    };
    const mapStateToProps = state => ({})
    return connect(mapStateToProps, { checkCurrentUserStatus })(withRouter(WithAuthentication))
};

export default Authentication;
