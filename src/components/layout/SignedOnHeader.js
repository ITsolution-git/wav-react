import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
    Container
} from 'react-bootstrap';
import classNames from 'classnames';
import PubSub from 'pubsub-js';

import {
    BaseComponent,
    ProfileDropdown,
    Logo
} from '../../components/shared';
import routes from '../../constants/Routes';
import roles from '../../constants/Roles';
import authStorage from '../../storage/AuthStorage';
import appDataTypes from '../../constants/AppDataTypes';
import { getBtwUserProfile, btwLogout } from '../../actions/AuthActions';
import pubsubConstants from '../../constants/PubSubConstants';

class SignedOnHeader extends BaseComponent {

    state = {
        activeItem: this.props.location.pathname
    };

    componentWillUnmount() {
        PubSub.unsubscribe(this.locationChangeSubscription);
    }

    componentDidMount() {
        this.locationChangeSubscription = PubSub.subscribe(pubsubConstants.onLocationChange, (type, value) => {
            this.setState({ activeItem: value });
        });
    }

    componentWillMount() {
        this.checkForLoadingProfile(this.props);
    }

    checkForLoadingProfile(props) {
        const { profile:
            {
                isSuccess,
                error
            },
            actions } = props;
        if (!isSuccess && !error && this.getCurrentRoute() !== routes.pageDown) {
            actions.getBtwUserProfile();
        }
    }

    getCurrentRoute = () => {
        return this.props.location.pathname;
    };

    getCaptainLinks = () => {
        return [
            { route: routes.captainsDashboard, title: 'Home' },
            { route: routes.tasksList, title: 'Actions' },
            { route: routes.voterList, title: 'Voters' },
        ]
    };

    getAdminLinks = () => {
        return [
            { route: routes.adminDashboard, title: 'Home' },
            { route: routes.voterFilter, title: 'Search Voters' },
            { route: routes.captainFilter, title: 'Search Captains' },
            { route: routes.loglist, title: 'Transaction Logs' }
        ]
    };

    resolveLinks = () => {
        return authStorage.getCurrentRole() === roles.captain
            ? this.getCaptainLinks()
            : this.getAdminLinks();
    };

    renderProfileDropdown = () => {
        const { actions, profile: {data} } = this.props
        const props={...actions, ...this, ...data}
        return <ProfileDropdown {...props} />
    };

    render() {
        const {
            activeItem
        } = this.state;

        return (
            <Container className='btw-on-header' >
                <div className='d-flex align-items-center py-2'>
                    <div className='btw-header-logo'>
                        <Link to="/home"><Logo /></Link>
                    </div>
                    <div className={'btw-header-menus px-4'}>
                        { this.resolveLinks().map((link, i) => (
                                <span
                                    key={i}
                                    className={classNames({ 'active-menu': link.route === activeItem }, 'mx-3 nav-item')}
                                    eventkey={i}
                                    onClick={() => {
                                        this.setState({ activeItem: link.route });
                                        this.onLink(link.route)
                                    }} >
                                    { link.title }
                                </span>
                            ))
                        }
                    </div>
                    <div className='btw-header-dropdown'>
                        { this.renderProfileDropdown() }
                    </div>
                </div>
            </Container>
        )
    }
}


const mapStateToProps = (state) => {
    const profile = state.app[appDataTypes.profile];
    return {
        profile,
        voter: state.voter
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ getBtwUserProfile, btwLogout }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignedOnHeader));