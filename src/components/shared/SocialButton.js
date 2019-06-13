import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import SvgIcon from '../shared/SvgIcon';

const SocialButton = ({ iconName, onClick, children  }) => {
    return (
        <Row onClick={onClick}>
            <Col>
                <SvgIcon name={iconName} />
            </Col>
            <Col>
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
