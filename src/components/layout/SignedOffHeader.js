import React from 'react';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

import BaseComponent from '../../components/shared/BaseComponent';
import wave from '../../resources/images/wave.png';

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
            </Col>
        )
    }
}

export default withRouter(SignedOffHeader);