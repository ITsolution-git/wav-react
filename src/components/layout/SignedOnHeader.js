import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Navbar,
    Nav,
    Container
} from 'react-bootstrap';
import classNames from 'classnames';
import PubSub from 'pubsub-js';

import {
    BaseComponent,
    ProfileDropdown,
    Logo,
    Icon
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
            { route: routes.tasksList, title: 'Actions' },
            { route: routes.voterList, title: 'Voters' },
            { route: routes.consult, title: 'Consult' }
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
        const { actions, profile: { data } } = this.props
        const props = { ...actions, ...this, ...data }
        return <ProfileDropdown {...props} />
    };

    render() {
        const {
            activeItem
        } = this.state;

        return (
            <Container className='btw-on-header' >
                <Navbar expand='lg' collapseOnSelect sticky='top'>
                    <Navbar.Brand href='/home'><Logo /></Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse className='justify-content-between'>
                        {this.isMobile() &&
                            <Nav id='close-icon'>
                                <Nav.Item>
                                    <Icon name='close-white' width='30px' height='30px' />
                                </Nav.Item>
                            </Nav>}
                        <Nav>
                            {this.resolveLinks().map((link, i) => {
                                return (
                                    <Nav.Item key={i}
                                        className={classNames({ 'active-menu': link.route === activeItem })}
                                        eventkey={i}
                                        onClick={() => {
                                            this.setState({ activeItem: link.route });
                                            this.onLink(link.route)
                                        }} >
                                        {link.title}
                                    </Nav.Item>
                                );
                            })
                            }
                        </Nav>
                        {this.renderProfileDropdown()}
                    </Navbar.Collapse>
                </Navbar>
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
