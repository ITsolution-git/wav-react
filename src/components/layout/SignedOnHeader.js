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

import BaseComponent from '../../components/shared/BaseComponent';
import routes from '../../constants/Routes';
import roles from '../../constants/Roles';
import { logout } from '../../helpers/AuthHelper';
import authStorage from '../../storage/AuthStorage';
import appDataTypes from "../../constants/AppDataTypes";
import { bindActionCreators } from 'redux';
import { getBtwUserProfile } from '../../actions/SignOnAction';

class SignedOnHeader extends BaseComponent {

    state = {
        showInfoModal: false
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
           // { route: routes.community, title: 'Community' },
           // { route: routes.forum, title: 'Forum' },
            { route: routes.captainsDashboard, title: 'Dashboard' }
        ]
    };

    getAdminLinks = () => {
        return [
            { route: routes.adminDashboard, title: 'Messages' },
            //{ route: routes.adminDashboard, title: 'Manage Captains' },
            //{ route: routes.adminDashboard, title: 'Manage Voters' },
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
        const { pathname } = this.props.history.location;
        if ([ makelist, voterDetail, matchList, voterSuccess, voterError ].includes(pathname)
            && !this.state.showInfoModal) {
            e.preventDefault();
            e.stopPropagation();
            this.setState({ showInfoModal: true });
        }
    };

    onCloseInfoModal = () => {
        this.setState({ showInfoModal: false })
    };

    render() {
        const { profile: { isSuccess, data } } = this.props,
            { showInfoModal } = this.state,
            name = isSuccess && data.firstname || '';

        return (
            <div className='btw-on-header' onClickCapture={this.handleHeaderClick} >
                <Row className='dropdown-div'>
                    <Col md={2} mdOffset={10} className='btw-nav-dropdown'>
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
                                        <NavItem key={i} eventKey={i} onClick={() => this.onLink(link.route)} >
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