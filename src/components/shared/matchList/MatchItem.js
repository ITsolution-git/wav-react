import React from 'react';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../BaseComponent';

export default class MatchItem extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            moreEnabled: false
        }
    }

    replaceNumbersWithX = (str) => {
        str = str || '';
        return str.replace(new RegExp("[0-9]", "g"), "X");
    };

    render () {
        const { onClick, person, id } = this.props;
        const {
            firstname,
            lastname,
            regaddrline1,
            regaddrline2,
            regaddrcity,
            regaddrstate,
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
            <Row className='name-row' onClick={onClick} id={id}>
                <Col md={4}>
                    <div className='name-info'>
                        { firstname } { lastname }
                    </div>
                </Col>
                <Col md={8}>
                    <div>{ this.replaceNumbersWithX(regaddrline1) }, { this.replaceNumbersWithX(regaddrline2) }</div>
                    <div>{ regaddrcity }, { regaddrstate }</div>
                    { moreEnabled &&
                        <div className='more-info'>
                            <div>Mail Address: { this.replaceNumbersWithX(mailaddrline1) }, { this.replaceNumbersWithX(mailaddrline2) }, { mailaddrcity }, { mailaddrstate }, { mailaddrzip } </div>
                            <div>Phone: { phone }</div>
                            <div>Birthday: { birthdate }</div>
                            <div>Mail Address: { }</div>
                            <div>Gender: { gender }</div>
                        </div> }
                    <span className='link' onClick={e => {
                        e.stopPropagation();
                        this.setState({ moreEnabled: !moreEnabled });
                    }}>{ moreEnabled ? 'Show less' : 'Show more' }</span>
                </Col>
            </Row>
        )
    }
}