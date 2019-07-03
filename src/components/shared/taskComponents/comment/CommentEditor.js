import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import { BaseComponent, Button, VoterAvatar, SvgIcon } from '../../index';

class CommentEditor extends BaseComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            text: '',
            images: []
        }
    }

    componentDidMount() {
        const { comment: { text, images } } = this.props;
        this.setState({ text, images });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.comment !== this.props.comment) {
            const { comment: { text, images } } = this.props;
            this.setState({ text, images });
        }
    }

    inputChangeHandler = (event) => {
        this.setState({ text: event.target.value });
    }

    onCancelHandler = () => {
        this.setState({ text: '', images: [] });
        this.props.onCancel();
    }

    onAddHandler = () => {
        const comment = this.state;
        this.props.onAdd(comment)
    }

    renderFooter = () => {
        return (
            <div className='content-footer'>
                <Button color='white' size='small' onClick={this.onCancelHandler}
                    className='content-button'>
                    Cancel
                </Button>
                <Button size='small' onClick={this.onAddHandler}
                    className='content-button'>
                    Add Comment
                </Button>
            </div>
        )
    }

    inputImageHandler = files => {
        const file = files[0].preview;
        this.setState((prevState) => ({
            images: [
                ...prevState.images,
                file
            ]
        }));
    }

    removeImageHandler = (index) => () => {
        const { images } = this.state;
        this.setState({ images: [...images.slice(0, index), ...images.slice(index + 1)] })
    }

    renderImageList = () => {
        const { images } = this.state;

        return (
            <div className='image-list'>
                {images.map((image, index) => (
                    <div key={index} className='image-item'>
                        <img src={image} className='image' alt='' />
                        <SvgIcon name='remove-icon' className='remove-button' onClick={this.removeImageHandler(index)} />
                    </div>
                ))}
                {this.renderUploadImage()}
            </div>
        )
    }

    renderUploadImage = () => {
        return (
            <Dropzone
                className='drop-zone'
                ref={(node) => { this.dropzoneRef = node; }}
                onDrop={this.inputImageHandler}>
                <SvgIcon name='add-photo-to-upload' />
            </Dropzone>
        )
    }

    renderEditor = () => {
        const { text } = this.state;

        return (
            <div className='content-editor'>
                <textarea
                    placeholder='Add updates or attach a photo...'
                    value={text}
                    rows='2'
                    onChange={this.inputChangeHandler} />
                {this.renderImageList()}
            </div>
        )
    }

    render() {
        const { voter } = this.props;

        return (
            <div className='btw-comment-editor'>
                <div className='comment-avatar'>
                    <VoterAvatar
                        src={voter.src}
                        firstName={voter.firstName}
                        lastName={voter.lastName}
                        size={24}
                        noBorder />
                </div>
                <div className='comment-content'>
                    {this.renderEditor()}
                    {this.renderFooter()}
                </div>
            </div>
        )
    }
}

CommentEditor.propTypes = {
    comment: PropTypes.object,
    voter: PropTypes.object,
    onCancel: PropTypes.func,
    onAdd: PropTypes.func
};

CommentEditor.defaultProps = {
    comment: {},
    onCancel: () => { },
    onAdd: () => { },
};

export default CommentEditor;