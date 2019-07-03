import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { BaseComponent, Typography, VoterAvatar } from '../../index';

class CommentItem extends BaseComponent {

    renderImages = () => {
        const { comment: { images } } = this.props;

        if (images.length !== 0) {
            return (
                <div className='image-content'>
                    {images.map((image, index) => (
                        <img key={index} src={image} className='image' />
                    ))}
                </div>
            )
        }
    }

    renderFooter = () => {
        const { comment: { createdAt } } = this.props;

        return (
            <div className='content-footer'>
                <Typography variant='functional' lightColor className='content-button' onClick={() => { }}>
                    Edit
                </Typography>
                <Typography variant='functional' lightColor className='content-button' onClick={() => { }}>
                    Delete
                </Typography>
                <Typography variant='functional' lightColor>{moment(createdAt).fromNow()}</Typography>
            </div>
        )
    }

    renderContent = () => {
        const { comment } = this.props;

        return (
            <div className='comment-content'>
                <Typography variant='body' lightColor>
                    {comment.text}
                </Typography>
                {this.renderImages()}
                {this.renderFooter()}
            </div>
        )
    }

    render() {
        const { voter } = this.props;

        return (
            <div className='btw-comment-item'>
                <div className='comment-avatar'>
                    <VoterAvatar
                        src={voter.src}
                        firstName={voter.firstName}
                        lastName={voter.lastName}
                        size={24}
                        noBorder />
                </div>
                {this.renderContent()}
            </div>
        )
    }
}

CommentItem.propTypes = {
    comment: PropTypes.object,
    voter: PropTypes.object,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func
};

CommentItem.defaultProps = {
    comment: {},
    onDelete: () => { },
    onEdit: () => { },
};

export default CommentItem;