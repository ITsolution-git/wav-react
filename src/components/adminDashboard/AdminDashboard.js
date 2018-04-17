import React from 'react';
import { Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import routes from '../../constants/Routes';
import BaseComponent from '../shared/BaseComponent';

class AdminDashboard extends BaseComponent {
    render() {
        return (
            <div>
                <div className='container btw-admin-dashboard'>
                    <Row>
                        <Col md={8}>
                            <Row>
                                <Col md={6} xs={6} className='block-padding'>
                                    <div className='icon-div messages' onClick={() => this.onLink(routes.adminDashboard)}>
                                        <FontAwesome name='tasks' size='3x'/>
                                        <span className='button-text'>Messages</span>
                                        <span className='ml-2 count'>7</span>
                                    </div>
                                </Col>
                                <Col md={6} xs={6} className='block-padding'>
                                    <div className='icon-div manage-captains' onClick={() => this.onLink(routes.adminDashboard)}>
                                        <FontAwesome name='thumbs-up' size='3x'/>
                                        <span className='button-text'>Manage Captains</span>
                                        <span className='ml-2 count'>3</span>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} xs={6} className='block-padding'>
                                    <div className='icon-div manage-voters' onClick={() => this.onLink(routes.adminDashboard)}>
                                        <FontAwesome name='envelope-open'  size='3x' />
                                        <span className='button-text'>Manage Voters</span>
                                        <span className='ml-2 count'>99</span>
                                    </div>
                                </Col>
                                <Col md={6} xs={6} className='block-padding'>
                                    <div className='icon-div forum' onClick={() => this.onLink(routes.adminDashboard)}>
                                        <FontAwesome name='comments' size='3x'/>
                                        <span className='button-text'>Forum</span>
                                        <span className='count'>12</span>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={4} className='block-padding' >
                            <div className="right-column">
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default AdminDashboard;