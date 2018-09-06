import React from 'react';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../BaseComponent';
import Icon from '../Icon';
import Arrow from '../Arrow';

export default class MatchItem extends BaseComponent {

    replaceNumbersWithX = (str) => {
        str = str || '';
        return str.replace(new RegExp("[0-9]", "g"), "X");
    };

    getViewProps = () => {
        if (this.isDesktop()) {
            return {
                checkName: 'check-white'
            };
        }
        return {
            checkName: 'check-blue'
        };
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

        const { expanded } = this.props;
        const viewProps = this.getViewProps();

        return (
            <Row className='match-item' onClick={onClick} id={id}>
                <Col md={10}>
                    <Row className='info-row'>
                        <Col md={8}>
                            <div>{ firstname }, { lastname } (born {new Date(birthdate).getFullYear()})</div>
                            { true &&
                                <div>
                                    <div>{ this.replaceNumbersWithX(mailaddrline1) }, { this.replaceNumbersWithX(mailaddrline2) }</div>
                                    <div>{ mailaddrcity }, { mailaddrstate }</div>
                                    <div>{ birthdate } </div>
                                </div>
                            }
                        </Col>
                        <Col md={2} className="pull-right">
                            <Arrow expanded={expanded} />
                        </Col>
                    </Row>
                </Col>
                <Col md={2}>
                    <Icon name={viewProps.checkName} width={40} height={40} />
                </Col>

                {/*<Col md={8}>*/}
                    {/*<div>{ this.replaceNumbersWithX(regaddrline1) }, { this.replaceNumbersWithX(regaddrline2) }</div>*/}
                    {/*<div>{ regaddrcity }, { regaddrstate }</div>*/}
                    {/*{ moreEnabled &&*/}
                        {/*<div className='more-info'>*/}
                            {/*<div>Mail Address: { this.replaceNumbersWithX(mailaddrline1) }, { this.replaceNumbersWithX(mailaddrline2) }, { mailaddrcity }, { mailaddrstate }, { mailaddrzip } </div>*/}
                            {/*<div>Phone: { phone }</div>*/}
                            {/*<div>Birthday: { birthdate }</div>*/}
                            {/*<div>Mail Address: { }</div>*/}
                            {/*<div>Gender: { gender }</div>*/}
                        {/*</div> }*/}
                    {/*<span className='link' onClick={e => {*/}
                        {/*e.stopPropagation();*/}
                        {/*this.setState({ moreEnabled: !moreEnabled });*/}
                    {/*}}>{ moreEnabled ? 'Show less' : 'Show more' }</span>*/}
                {/*</Col>*/}
            </Row>
        )
    }
}