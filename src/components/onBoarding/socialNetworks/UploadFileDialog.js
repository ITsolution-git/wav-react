import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import { BaseComponent, Button, Dialog, SvgIcon, Typography } from '../../shared';

class UploadFileDialog extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            files: [],
            isLoading: false,
        }
    }

    uploadFilesHandler = files => {
        this.setState({ isLoading: true });

        // TODO: remove setTimeout after implement api
        setTimeout(
            function () {
                this.setState({ files, isLoading: false });
            }
                .bind(this),
            3000
        );
    }

    removeFileHandler = (index) => () => {
        const { files } = this.state;
        this.setState({ files: [...files.slice(0, index), ...files.slice(index + 1)] })
    }

    onSuccessHandler = () => {
        const { files } = this.state;

        this.props.onSuccess(files);
        this.setState({ files: [] });
    }

    onCloseHandler = () => {
        this.setState({ files: [] });
        this.props.onClose();
    }

    renderImageUpload = () => {
        const { isLoading, files } = this.state;

        if (files.length === 0) {
            return isLoading ?
                <div className='content'>
                    <Typography lightColor variant='body'>Uploading...</Typography>
                </div> :
                <Dropzone
                    className='content'
                    ref={(node) => { this.dropzoneRef = node; }}
                    onDrop={this.uploadFilesHandler}>
                    <div className='upload-files'>
                        <SvgIcon name='files-upload' />
                        <Typography variant='body' lightColor className='upload-text'>
                            Drag files here or <span>browse</span> for files to upload
                        </Typography>
                    </div>
                </Dropzone>
        }
    }

    renderFileItem = (file, index) => {
        return (
            <div key={index} className='file-item'>
                <div className='file-info'>
                    <SvgIcon name='uploaded-file' />
                    <Typography variant='body' lightColor className='file-name'>{file.name}</Typography>
                </div>
                <SvgIcon
                    name='upload-photo-remove'
                    className='remove-button'
                    onClick={this.removeFileHandler(index)} />
            </div>
        )
    }

    renderFileList = () => {
        const { files } = this.state;

        if (files.length !== 0) {
            return (
                <div className='content file-list'>
                    {files.map((file, index) => (
                        this.renderFileItem(file, index)
                    ))}
                </div>
            )
        }
    }

    renderActionButton = () => {
        const { files } = this.state;

        return (
            <div className='button-list'>
                <Button
                    color='white'
                    onClick={this.onCloseHandler}
                    className='upload-button'>
                    Cancel
                </Button>
                <Button
                    disabled={files.length === 0}
                    onClick={this.onSuccessHandler}
                    className='upload-button'>
                    Upload
                </Button>
            </div>
        );
    }

    render() {
        const { show } = this.props;

        return (
            <Dialog className='bsc-upload-dialog'
                show={show}
                closeButton
                onClose={this.onCloseHandler}
                title='Import your own voters list'>

                <Typography variant='body' lightColor>
                    Make sure you're using an accepted file format: .csv, Excel (.xls, .xlsx)
                </Typography>

                {this.renderImageUpload()}
                {this.renderFileList()}
                {this.renderActionButton()}
            </Dialog>
        )
    }
}

UploadFileDialog.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    onSuccess: PropTypes.func
};

UploadFileDialog.defaultProps = {
    show: true,
    onClose: () => { },
    onSuccess: () => { }
};

export default UploadFileDialog;