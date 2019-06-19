import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import SvgIcon from '../shared/SvgIcon';

const SocialButton = ({ iconName, onClick, children  }) => {
    return (
        <Row onClick={onClick} className='btw-social-button no-margin'>
            <Col xs={4} md={4} lg={4}>
                <SvgIcon name={iconName} className='icon' />
            </Col>
            <Col xs={8} md={8} lg={8}>
                { children }
            </Col>
        </Row>
    );
};

SocialButton.propTypes = {
    iconName: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default SocialButton;
