import React from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Row, Image, Navbar, Nav, NavItem } from 'react-bootstrap';

import BaseComponent from '../../components/shared/BaseComponent';
import logo  from '../../resources/images/logo.png';
import wave from '../../resources/images/wave.png';
import { getHomeRoute } from '../../helpers/AuthHelper';

class SignedOffHeader extends BaseComponent {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <Col className="btw-off-header">
                <Row className="mb-1 nav">
                    <Col mdOffset={1} md={8}>
                        <span>BeTheWave</span><br/>
                        <img src={wave} alt="" width={160} height={30}/>
                    </Col>
                </Row>
                {/* <Navbar>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav>
                            <div style={{position:'absolute', left:"220px", top:"0px"}}>
                                BeTheWave <br />
                            </div>
                            <NavItem eventKey={1} onClick={() => this.onLink(routes.whyBetheWave)} >
                               Why Bethewave
                            </NavItem>
                            <NavItem eventKey={2} onClick={() => this.onLink(routes.howContribute)} >
                                How you can contribute
                            </NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar> */}
            </Col>
        )
    }
}

export default withRouter(SignedOffHeader);