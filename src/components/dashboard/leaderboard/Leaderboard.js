import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Container } from 'react-bootstrap';

import { BaseComponent } from '../../shared';

class Leaderboard extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Container className='btw-captains-dashboard'>
                <Row className='user-info-content'>
                    <Col md={5} lg={6} className='main-title'>
                        Leaderboard
                    </Col>
                    <Col md={7} lg={6} className='p-0'>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default connect()(withRouter(Leaderboard));
