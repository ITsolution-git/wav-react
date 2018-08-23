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
import FontAwesome from 'react-fontawesome';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

import BaseComponent from '../../components/shared/BaseComponent';
import routes from '../../constants/Routes';
import roles from '../../constants/Roles';
import authStorage from '../../storage/AuthStorage';
import appDataTypes from "../../constants/AppDataTypes";
import { bindActionCreators } from 'redux';
import { getBtwUserProfile, btwLogout } from '../../actions/SignOnAction';
import { getLevel, isEmpty } from './HeaderHelper';
import pubsubConstants from "../../constants/PubSubConstants";
import PubSub from "pubsub-js";
import boardingTypes from "../../constants/VoterBoardingType";

import Dialog from '../shared/Dialog';
import Button from '../shared/Button';
import { renderLogo } from './HeaderHelper';

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
           // { route: routes.invites, title: 'Invites' },
            { route: routes.tasksList, title: 'Tasks' },
            { route: routes.voterList, title: 'Voters' },
            { route: routes.messageList, title: 'Messages' },
           // { route: routes.forum, title: 'Forum' },
            { route: routes.captainsDashboard, title: 'Dashboard' },
            { route: routes.faq, title: 'Voter Registration FAQs' }
        ]
    };

    getAdminLinks = () => {
        return [
            { route: routes.adminDashboard, title: 'Messages' },
            { route: routes.voterFilter, title: 'Search Voters' },
            { route: routes.captainFilter, title: 'Search Captains' },
            { route: routes.loglist, title: 'Transaction Logs' },
            //{ route: routes.adminDashboard, title: 'Forum' }
        ]
    };

    resolveLinks = () => {
        return authStorage.getCurrentRole() === roles.captain
            ? this.getCaptainLinks()
            : this.getAdminLinks();
    };

    handleHeaderClick = (e) => {
        const { makelist, voterDetail, matchList, voterSuccess, voterNotRegisteredError, voterNotFoundError } = routes;
        const { pathname } = this.props.history.location,
            boardingRoutes = [ makelist, voterDetail, matchList, voterSuccess, voterNotRegisteredError, voterNotFoundError ]
                .map(route => route.toLowerCase());
        if (boardingRoutes.includes(pathname.toLowerCase())
            && !this.state.showInfoModal) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({ showInfoModal: true });
        }
    };

    onCloseInfoModal = () => {
        this.setState({ showInfoModal: false })
    };

    renderLevel = () => {
        const {
            profile: {
                data
            }
        } = this.props;
        return getLevel(data);
    };

    renderProfileDropdown = () => {
        const { profile: { isSuccess, data }, actions } = this.props;
        const name = isSuccess && data.firstname || '';
        return (
            <Nav pullRight>
                <NavItem className='header-icon'>{ this.renderHeaderLevel() }</NavItem>
                <NavItem className='header-icon'>
                    <FontAwesome className='btw-avatar'
                                 name='user-circle' />
                </NavItem>
                <NavDropdown eventKey={1}
                             title={name}
                             className='btw-nav-dropdown'
                             id="nav-dropdown">
                    {/*<MenuItem eventKey={1.1}>Profile</MenuItem>*/}
                    {/*<MenuItem eventKey={1.2}>Settings</MenuItem>*/}
                    <MenuItem eventKey={1.3} onClick={() => actions.btwLogout()}>Sign out</MenuItem>
                </NavDropdown>
            </Nav>
        )
    };

    renderHeaderLevel = () => {
        const { profile: { data } } = this.props;
        return (
            <div>{ !isEmpty(data) && data.role !== 'admin' && this.renderLevel()}</div>
        )
    };

    resolveModalMessage = () => {
        const { pathname } = this.props.history.location;
        const { boardingType } = this.props.voter;
        if (pathname === routes.matchList && boardingType === boardingTypes.voterList) {
            return 'Please select a record from the list before proceeding';
        }
        return 'Please complete the onboarding process before you can access these secured features';
    };

    render() {
        const {
            showInfoModal,
            activeItem
        } = this.state;

        return (
            <div className='btw-on-header' onClickCapture={this.handleHeaderClick} >
                <Navbar>
                    <Navbar.Header className='header-icon'>
                        <Navbar.Brand pullLeft>
                            { renderLogo() }
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
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
                        { this.renderProfileDropdown() }
                    </Navbar.Collapse>
                </Navbar>
                <Dialog show={showInfoModal}
                        actionButtons={ <Button size='medium'
                                                onClick={this.onCloseInfoModal}>Ok</Button> }
                        onClose={this.onCloseInfoModal}>
                    <Typography gutterBottom>{ this.resolveModalMessage() }</Typography>
                </Dialog>
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