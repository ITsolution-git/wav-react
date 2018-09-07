import React from 'react';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../BaseComponent';
import Icon from '../Icon';
import Arrow from '../Arrow';

export default class MatchItem extends BaseComponent {

    replaceNumbersWithX = (str) => {
        str = str || '';
        return str.replace(new RegExp("[0-9]", "g"), "*");
    };

    getViewProps = () => {
        if (this.isDesktop()) {
            return {
                checkName: 'check-white',
                arrowName: 'light'
            };
        }
        return {
            checkName: 'check-blue',
            arrowName: 'black'
        };
    };

    formatAddress = (addr1, addr2) => {
        addr1 = addr1 ? `${addr1}, ` : '';
        return this.replaceNumbersWithX(`${addr1}${addr2}`);
    };

    resolveAddress = () => {
        let {
            mailaddrline1, mailaddrline2,
            regaddrline1 = mailaddrline1,
            regaddrline2 = mailaddrline2
        } = this.props.person;

        return this.formatAddress(regaddrline1, regaddrline2);
    };

    resolveCityState = () => {
        let {
            mailaddrcity, mailaddrstate,
            regaddrcity = mailaddrcity,
            regaddrstate = mailaddrstate
        } = this.props.person;

        return this.formatAddress(regaddrcity, regaddrstate);
    };

    getFullInfo = () => {
        const { birthdate } = this.props.person;
        return (
            <div>
                <div>{ this.resolveAddress() }</div>
                <div>{ this.resolveCityState() }</div>
                <div>{ birthdate } </div>
            </div>
        )
    };

    render () {
        const { onClick, person, id } = this.props;
        const {
            dwid,
            firstname,
            lastname,
            birthdate
        } = person;

        const { expanded, onChange } = this.props;
        const viewProps = this.getViewProps();

        return (
            <Row className='match-item' id={id}>
                <Col md={10} xs={10} onClick={() =>  onChange(expanded ? null : dwid)}>
                    <Row className='info-row'>
                        <Col md={10} xs={10}>
                            <div id="text-content" className="text-15-dark-blue-bold">
                                <div>{ firstname }, { lastname } (born {new Date(birthdate).getFullYear()})</div>
                                { expanded && <div id="full-info">{ this.getFullInfo() }</div> }
                            </div>
                        </Col>
                        <Col id="arrow" md={2} xs={2} className="pull-right">
                            <Arrow name={viewProps.arrowName} expanded={expanded} />
                        </Col>
                    </Row>
                </Col>
                <Col id="check" md={2} xs={2} onClick={() => onClick(this.getFullInfo())}>
                    <Icon name={viewProps.checkName} width={40} height={40} />
                </Col>
            </Row>
        )
    }
}
