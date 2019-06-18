import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '../shared';

const AlreadyRegistered = () => {
    return (
        <div id="registered-text-div">
            <Typography id='registered-text' variant='body' displayInline lightColor>
                Already have an account?
            </Typography>
            <Link to='/'> Log in </Link>
        </div>
    )
};

export default AlreadyRegistered;