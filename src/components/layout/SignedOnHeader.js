import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavItem,
    Col,
    Row,
    NavDropdown,
    MenuItem
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import classNames from 'classnames';

import BaseComponent from '../../components/shared/BaseComponent';
import routes from '../../constants/Routes';
import roles from '../../constants/Roles';
import { logout } from '../../helpers/AuthHelper';
import authStorage from '../../storage/AuthStorage';
import appDataTypes from "../../constants/AppDataTypes";
import { bindActionCreators } from 'redux';
import { getBtwUserProfile } from '../../actions/SignOnAction';
import { getLevel, isEmpty } from './HeaderHelper';
import pubsubConstants from "../../constants/PubSubConstants";
import PubSub from "pubsub-js";

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
        const { makelist, voterDetail, matchList, voterSuccess, voterError } = routes;
        const { pathname } = this.props.history.location,
            boardingRoutes = [ makelist, voterDetail, matchList, voterSuccess, voterError ]
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
        const { profile: { isSuccess, data } } = this.props;
        const name = isSuccess && data.firstname || '';
        return (
            <div>
                <FontAwesome className='btw-avatar'
                             name='user-circle'
                             size='3x' />
                <NavDropdown eventKey={1}
                             title={name}
                             id="nav-dropdown">
                    <MenuItem eventKey={1.1}>Profile</MenuItem>
                    <MenuItem eventKey={1.2}>Settings</MenuItem>
                    <MenuItem eventKey={1.3} onClick={() => logout()}>Sign out</MenuItem>
                </NavDropdown>
            </div>
        )
    };

    renderHeaderLevel = () => {
        const { profile: { data } } = this.props;
        return (
            <div>{ !isEmpty(data) && data.role !== 'admin' && this.renderLevel()}</div>
        )
    };

    render() {
        const {
            showInfoModal,
            activeItem
        } = this.state;

        return (
            <div className='btw-on-header' onClickCapture={this.handleHeaderClick} >
                { this.isDesktop() && <Row className='dropdown-div'>
                    <Col md={2} mdOffset={8}>
                        { this.renderHeaderLevel() }
                    </Col>
                    <Col md={2} className='btw-nav-dropdown'>
                        { this.renderProfileDropdown() }
                    </Col>
                </Row> }
                <Navbar>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav>
                            { this.isMobile() && <NavItem>
                                                    <div className='mobile-star-level'>{ this.renderHeaderLevel() } </div>
                                                 </NavItem> }
                            { this.isMobile() && <div className='mobile-dropdown'> { this.renderProfileDropdown() }</div> }
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
                <Dialog open={showInfoModal}
                        onClose={this.onCloseInfoModal}>
                    <DialogContent>
                        <Typography gutterBottom>Please complete the onboarding process before you can access these secured features</Typography>
                        <Button color='primary'
                                variant='raised'
                                onClick={this.onCloseInfoModal}>Ok</Button>
                    </DialogContent>
                </Dialog>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const profile = state.app[appDataTypes.profile];
    return { profile };
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ getBtwUserProfile }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignedOnHeader));