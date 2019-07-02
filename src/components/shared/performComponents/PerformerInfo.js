
import React from 'react'
import PropTypes from 'prop-types';
import { Typography } from '../index';

const VoterInfo = (props) => {
    const { name, level } = props

    return (
        <div className='btw-performer-info'>
            <Typography variant='body'>
                {name}
            </Typography>
            <Typography variant='body' lightColor>
                Level: {level}
            </Typography>
        </div>
    )
}

VoterInfo.propTypes = {
    name: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
}
VoterInfo.defaultProps = {
    name: '',
    level: ''
}

export default VoterInfo;