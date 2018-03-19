import React from 'react';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import NavImage from '../layout/NavImage';
import routes from '../../constants/Routes';
import BaseComponent from '../shared/BaseComponent';

class AdminDashboard extends BaseComponent {
    render() {
        return (
            <div>
                <NavImage />
                <div className='container btw-admin-dashboard'>
                    <Row>
                        <Col md={8}>
                            <div className='left-content'>
                                <div className='reports' onClick={() => this.onLink(routes.reports)}>
                                    <FontAwesome name='list' size='3x'/>
                                    <span className='label-text'>Your Reports</span>
                                </div>
                                <div className='analytics'>Analytics info</div>
                            </div>
                        </Col>
                        <Col md={4} className='community' >

                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;