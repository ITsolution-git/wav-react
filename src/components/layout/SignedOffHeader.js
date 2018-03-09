import React, { Component } from 'react';
import { Col, Row, Image, Navbar, Nav, NavItem } from 'react-bootstrap';
import History from '../../utility/History';

import logo  from '../../resources/images/logo.png';
import { redirectToHome } from '../../helpers/AuthHelper';
import routes from '../../constants/Routes';

export default class SignedOffHeader extends Component {
    onLink = (route) => {
        History.push(route);
        History.go()
    };

    render() {
        return (
            <Col className="btw-off-header">
                <Row>
                    <Col md={12}>
                        <Image src={logo} className='btw-logo' onClick={redirectToHome} />
                    </Col>
                </Row>
                <Navbar>
                    <Nav>
                        <NavItem eventKey={1} onClick={() => this.onLink(routes.whyKp)} >
                           Why KP
                        </NavItem>
                        <NavItem eventKey={2} onClick={() => this.onLink(routes.shopPlans)} >
                            Shop Plans
                        </NavItem>
                        <NavItem eventKey={3} onClick={() => this.onLink(routes.doctorsLocations)} >
                            Doctors & Locations
                        </NavItem>
                        <NavItem eventKey={4} onClick={() => this.onLink(routes.healthWellness)} >
                            Health & Wellness
                        </NavItem>
                    </Nav>
                </Navbar>;
            </Col>
        )
    }
}