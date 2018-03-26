import React from 'react';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../../shared/BaseComponent';

export default class MatchItem extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            moreEnabled: false
        }
    }

    render () {
        const { onClick, person } = this.props;
        const {
            firstname,
            lastname,
            regaddrline1,
            regaddrline2,
            regaddrcity,
            regaddrstate,
            voterstatus,
            gender,
            birthdate,
            mailaddrline1,
            mailaddrline2,
            mailaddrcity,
            mailaddrstate,
            mailaddrzip,
            phone
        } = person;

        const { moreEnabled } = this.state;
        return (
            <Row className='name-row' onClick={onClick}>
                <Col md={4}>
                    <div className='name-info'>
                        { firstname } { lastname }
                    </div>
                </Col>
                <Col md={8}>
                    <div>{ regaddrline1 }, { regaddrline2 }</div>
                    <div>{ regaddrcity }, { regaddrstate }</div>
                    { moreEnabled &&
                        <div className='more-info'>
                            <div>Mail Address: { mailaddrline1 }, { mailaddrline2 }, { mailaddrcity }, { mailaddrstate }, { mailaddrzip } </div>
                            <div>Phone: { phone }</div>
                            <div>Birthday: { birthdate }</div>
                            <div>Mail Address: { }</div>
                            <div>Status: { voterstatus }</div>
                            <div>Gender: { gender }</div>
                        </div> }
                    <div className='link' onClick={e => {
                        e.stopPropagation();
                        this.setState({ moreEnabled: !moreEnabled });
                    }}>{ moreEnabled ? 'Show less' : 'Show more' }</div>
                </Col>
            </Row>
        )
    }
}