import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { BaseComponent, Button, Typography, VoterAvatar } from '../../shared';

class ConsultItem extends BaseComponent {

    askButtonHandler = () => {
    }

    renderConsultStatus = (count, title) => {
        return (
            <div className='status-item'>
                <Typography lightColor>{count}</Typography>
                <Typography lightColor variant='functional' fontWeight='600'>{title}</Typography>
            </div>
        )
    }

    renderConsultCreator = () => {
        const { consult: { creator, createdAt } } = this.props;
        const { firstName, lastName, avatar } = creator;

        return (
            <div className='consult-creator'>
                <VoterAvatar
                    size={16}
                    firstName={firstName}
                    lastName={lastName}
                    src={avatar}
                    noBorder />
                <Typography variant='body' className='creator-name'>{`${firstName} ${lastName}`}</Typography>
                <Typography variant='body' lightColor>{moment(createdAt).fromNow()}</Typography>
            </div>
        )
    }

    renderConsultTags = () => {
        const { consult: { tags } } = this.props;
        const lastIndex = tags.length - 1;

        return (
            <div className='consult-tags'>
                {tags.map((tag, index) => (
                    <Typography
                        key={index}
                        variant='body'
                        lightColor
                        className='consult-tag-item'>
                        {tag} {lastIndex !== index && '  • '}
                    </Typography>
                ))}
            </div>
        )
    }

    renderConsultButtons = () => {
        return (
            <div className='consult-buttons'>
                <Button size='small' color='blue' className='answer-button'>
                    <i className='fa fa-pencil' />
                    Answer
                </Button>
                <Button size='small' color='white' className='save-button'>
                    Save
                </Button>
            </div>
        )
    }

    render() {
        const { consult } = this.props;

        return (
            <div className='btw-consult-item'>
                <div className='consult-status'>
                    {this.renderConsultStatus(consult.answers, 'answers')}
                    {this.renderConsultStatus(consult.saved, 'saved')}
                </div>
                <div className='consult-content'>
                    <div className='consult-header'>
                        {this.renderConsultCreator()}
                        {this.renderConsultTags()}
                    </div>
                    <Typography className='consult-title'>
                        {consult.title}
                    </Typography>
                    <Typography variant='body' className='consult-description'>
                        {consult.description}
                    </Typography>
                    {this.renderConsultButtons()}
                </div>
            </div>
        );
    }
}

ConsultItem.propTypes = {
    consult: PropTypes.object
};

export default ConsultItem;