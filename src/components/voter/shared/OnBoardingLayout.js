import React from 'react';
import { Row, Col } from 'react-bootstrap';

import BaseComponent from '../../shared/BaseComponent';
import Logo from '../../layout/Logo';
import colors from '../../../constants/ColorConstants';

export default class OnBoardingLayout extends  BaseComponent {
    resolveDefaultColor = () => {
        return this.isMobile() ? colors.white : colors.blue;
    };

    render() {
        const { color = this.resolveDefaultColor() } = this.props;
        return (
            <div>
                <Row>
                    <Col mdOffset={1} className='' >
                        <Logo />
                    </Col>
                </Row>
                { this.renderBackground(color) }
                { this.props.children }
            </div>
        )
    }
}
