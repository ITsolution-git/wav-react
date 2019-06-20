import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

import ContentLayout from '../layout/ContentLayout';
import { BaseComponent, Typography } from '../shared';
import { ConsultTagList } from './index';

class ConsultManagement extends BaseComponent {
    constructor() {
        super();
        this.state = {
            searchString: ''
        }
    }

    render() {

        return (
            <ContentLayout>
                <Row className='btw-consult-management container'>
                    <Col xs={12}>
                        <Row>
                            <Col xs={12} lg={6}>
                                <Typography className='title'>
                                    Help Center
                                </Typography>
                                <Typography variant='body' className='page-description'>
                                    Communicate with fellow Captains, consult them on their issues,
                                    search answers to frequent questions or ask your own.
                                 </Typography>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} lg={9}>
                                QA list
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={3}>
                                <ConsultTagList />
                            </Col>
                        </Row>
                    </Col>
                </Row >
            </ContentLayout >
        );
    }
}

// TODO: Remain these code for implementing API.
const mapDispatchToProps = (dispatch) => ({
});

export default connect(null, mapDispatchToProps)(withRouter(ConsultManagement));