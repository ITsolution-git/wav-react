/**
 * usage: <VoterAvatar size={100} initials='SG' src='https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png' color='error' />
 * created at: 2019/06/14
 */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { BaseComponent, Typography } from './index';
import colors from '../../constants/Colors';

class VoterAvatar extends BaseComponent {

    render() {
        const { src, size, color, initials, className } = this.props

        return (
            <div className={cn('btw-voter-avatar', className)} style={{ width: size, height: size, borderColor: colors[color] }}>
                {
                    src ?
                        <img className='btw-voter-img' src={src} alt="" /> :
                        <Typography
                            displayInline
                            variant='functional'
                            className='btw-voter-avatar-initials'>
                            {initials}
                        </Typography>
                }
            </div>
        )
    }
}

VoterAvatar.defaultProps = {
    src: '',
    size: 40,
    color: 'success',
    initials: ''
};

VoterAvatar.propTypes = {
    // avatar URL
    src: PropTypes.string,
    // avatar width and height pixel
    size: PropTypes.number,
    //avatar color : error, alert, success
    color: PropTypes.string,
    //avatar initials
    initials: PropTypes.string.isRequired
};

export default VoterAvatar;