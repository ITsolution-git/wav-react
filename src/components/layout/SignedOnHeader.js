import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    NavDropdown,
    MenuItem
} from 'react-bootstrap';
import classNames from 'classnames';
import PubSub from "pubsub-js";
import FontAwesome from 'react-fontawesome';

import BaseComponent from '../../components/shared/BaseComponent';
import routes from '../../constants/Routes';
import roles from '../../constants/Roles';
import authStorage from '../../storage/AuthStorage';
import appDataTypes from "../../constants/AppDataTypes";
import { bindActionCreators } from 'redux';
import { getBtwUserProfile, btwLogout } from '../../actions/SignOnAction';
import pubsubConstants from "../../constants/PubSubConstants";
import Logo from './Logo';
import Icon from '../shared/Icon';

class SignedOnHeader extends BaseComponent {

    state = {
        showInfoModal: false,
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
            { route: routes.tasksList, title: 'My Actions' },
            { route: routes.voterList, title: 'My Voters' },
            { route: routes.resourceCenter, title: 'Resource Center' },
            { route: routes.faq, title: 'FAQ' }
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

    onProfile = () => {
        this.props.history.push(routes.profile)
    };

    renderProfileDropdown = () => {
        const { actions } = this.props;
        const size = this.isMobile() ? '50px' : '40px';
        return (
            <Nav pullRight>
                <NavDropdown eventKey={1}
                             title={<Icon name="profile" width={size} height={size} />}
                             className='btw-nav-dropdown'
                             id="nav-dropdown">
                    <MenuItem eventKey={1.1} onClick={this.onProfile}>Manage account</MenuItem>
                    <MenuItem eventKey={1.3} onClick={() => actions.btwLogout()}>Sign out</MenuItem>
                </NavDropdown>
            </Nav>
        )
    };

    render() {
        const {
            activeItem
        } = this.state;

        return (
            <div className='btw-on-header' >
                <Navbar fluid collapseOnSelect staticTop>
                    <Navbar.Header className='header-icon'>
                        <Navbar.Brand pullLeft>
                            <div id="logo">
                                <Logo width={80} height={65} />
                            </div>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        { this.isMobile() &&
                        <Nav id="close-icon">
                            <NavItem>
                                <Icon name='close-white' width='30px' height='30px' />
                            </NavItem>
                        </Nav> }
                        { this.renderProfileDropdown() }
                        <Nav pullRight>
                            { this.resolveLinks().map((link, i) => {
                                    return (
                                        <NavItem key={i}
                                                 className={classNames({ 'active-menu': link.route === activeItem })}
                                                 eventKey={i}
                                                 onClick={() => {
                                                     this.setState({ activeItem: link.route });
                                                     this.onLink(link.route)
                                                 }} >
                                            { link.title }
                                        </NavItem>
                                    );
                                })
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
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
