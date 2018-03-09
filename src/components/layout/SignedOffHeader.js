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
                    <Col mdOffset={4} md={8}>
                        <Image src={logo} className='btw-logo' onClick={redirectToHome} />
                    </Col>
                </Row>
                <Navbar>
                    <Nav>
                        <NavItem eventKey={1} onClick={() => this.onLink(routes.whyBetheWave)} >
                           Why Bethewave
                        </NavItem>
                        <NavItem eventKey={2} onClick={() => this.onLink(routes.howContribute)} >
                            How you can contribute
                        </NavItem>
                    </Nav>
                </Navbar>
            </Col>
        )
    }
}