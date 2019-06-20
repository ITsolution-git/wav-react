/**
 * usage: <VoterAvatar size={100} initials='SG' src='https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584_960_720.png' color='error' />
 * created at: 2019/06/14
 */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import _ from 'lodash'

import { getColorByStatus } from '../../../constants/Colors';

const VoterAvatar = (props) => {
    const { src, size, status, firstName, lastName } =  props
    const avatarName = _.toUpper(`${firstName.charAt(0)}${lastName.charAt(0)}`)
    return(
        <div className={cn('btw-voter-avatar')} style={{width: size, height: size, borderColor: getColorByStatus(status) }}>
            {
                src ? <img className={cn('btw-voter-img')} src={src} alt=""/>
                : <span className={cn('btw-voter-avatar-initials')}>{avatarName}</span>
            }
        </div>
    )
}

VoterAvatar.defaultProps = {
    src: '',
    size: 40,
    status: 'Infrequent',
    initials: '',
    firstName: 'f',
    lastName: 'l'
};

VoterAvatar.propTypes = {
    // avatar URL
    src: PropTypes.string,
    // avatar width and height pixel
    size: PropTypes.number,
    //avatar color : error, alert, success
    status: PropTypes.string,
    // user's first name
    firstName: PropTypes.string.isRequired,
    // user's last name
    lastName: PropTypes.string.isRequired
};

export default VoterAvatar;