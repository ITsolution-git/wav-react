import React from 'react';
import { Link } from 'react-router-dom';
import { Row } from 'react-bootstrap';

import { Typography } from '../shared';

const AlreadyRegistered = () => {
    return (
        <Row className='no-margin' id='registered-text-div'>
            <Typography className='btw-registered-text' variant='body' displayInline lightColor>
                Already have an account?
            </Typography>
            <Link to='/'> Log in </Link>
        </Row>
    )
};

export default AlreadyRegistered;