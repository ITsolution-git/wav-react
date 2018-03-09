import React, { Component } from 'react';
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

import routes from '../../constants/Routes';
import roles from '../../constants/Roles';
import authStorage from '../../storage/AuthStorage';

class SignedOnHeader extends Component {

    onLink = (route) => {
        this.props.history.push(route)
    };

    getCaptainLinks = () => {
        return [
            { route: routes.register, title: 'Register' },
            { route: routes.invites, title: 'Invites' },
            { route: routes.tasksList, title: 'Tasks' },
            { route: routes.voterList, title: 'Voters' },
            { route: routes.community, title: 'Community' },
            { route: routes.captainsDashboard, title: 'Dashboard' }
        ]
    };

    getAdminLinks = () => {
        return [
            { route: routes.register, title: 'Register' },
            { route: routes.invites, title: 'Invites' },
            { route: routes.community, title: 'Community' },
            { route: routes.adminDashboard, title: 'Dashboard' }
        ]
    };

    resolveLinks = () => {
        return authStorage.getCurrentRole() === roles.captain
            ? this.getCaptainLinks()
            : this.getAdminLinks();
    };

    render() {
        return (
            <div className='btw-on-header'>
                <Row>
                    <Col md={2} mdOffset={10} className='btw-nav-dropdown'>
                        <FontAwesome className='btw-avatar'
                                     name='user-circle'
                                     size='3x' />
                        <NavDropdown eventKey={1} title="" id="nav-dropdown">
                            <MenuItem eventKey={1.1}>Profile</MenuItem>
                            <MenuItem eventKey={1.2}>Settings</MenuItem>
                            <MenuItem eventKey={1.3}>Sign out</MenuItem>
                        </NavDropdown>
                    </Col>
                </Row>
                <Navbar>
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
                </Navbar>
            </div>
        )
    }
}

export default withRouter(SignedOnHeader)