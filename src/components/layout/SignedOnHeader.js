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

import gold from '../../resources/images/gold.png'
import silver from '../../resources/images/silver.png'
import bronze from '../../resources/images/bronze.png'

class SignedOnHeader extends BaseComponent {

    state = {
        showInfoModal: false,
        activeItem: this.props.location.pathname
    };

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
        } = this.props

        let score = (data && data.points ? data.points : 0)
        let arr = [], level = 1;

        if (score < 50) {
            arr = [null, null, bronze];
        } else if (score < 100) {
            level = 2;
            arr = [null, null, silver];
        } else if (score < 200) {
            level = 3;
            arr = [null, null, gold];
        } else if (score < 500) {
            level = 4;
            arr = [null, gold, bronze];
        } else if (score < 1000) {
            level = 5;
            arr = [null, gold, silver];
        } else if (score < 2000) {
            level = 6;
            arr = [null, gold, gold];
        } else if (score < 5000) {
            level = 7;
            arr = [gold, gold, bronze];
        } else if (score < 10000) {
            level = 8;
            arr = [gold, gold, silver];
        } else {
            level = 9;
            arr = [gold, gold, gold];
        }

        return (
            <div className="success-level tooltip">
                { arr[0] && <img src={arr[0]} width={30} height={30} alt="" /> }
                { arr[1] && <img src={arr[1]} width={30} height={30} alt="" /> }
                { arr[2] && <img src={arr[2]} width={30} height={30} alt="" /> }
                <span class="tooltiptext">Level {level}</span>
            </div>
        )
    }

    render() {
        const {
            profile: {
                isSuccess,
                data
            },
            location: {
                pathname
            }
        } = this.props,
            {
                showInfoModal,
                activeItem
            } = this.state,
            name = isSuccess && data.firstname || '';

        return (
            <div className='btw-on-header' onClickCapture={this.handleHeaderClick} >
                <Row className='dropdown-div'>
                    <Col md={2} mdOffset={8}>
                        <div>{this.renderLevel()}</div>
                    </Col>
                    <Col md={2} className='btw-nav-dropdown'>
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
                    </Col>
                </Row>
                <Navbar>
                    <Navbar.Toggle />
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
                    </Navbar.Collapse>
                </Navbar>
                <Dialog open={showInfoModal}
                        onClose={this.onCloseInfoModal}>
                    <DialogContent>
                        <Typography gutterBottom>Please complete the flow first and then you can access these features</Typography>
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