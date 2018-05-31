import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import Typography from 'material-ui/Typography';

import BaseComponent from '../../shared/BaseComponent';
import Button from '../../shared/Button';

export default class PhotoUpload extends BaseComponent {
    state = { image: null };

    handleFiles = files => {
        this.setState({ image: files[0]});
        this.props.onFileChange(files[0]);
    };

    render() {
        const { title ='' } = this.props;
        const { image } = this.state;
        return (
            <div className='registration-by-mail'>
                <Typography>{ title }</Typography>
                <Dropzone className='drop-zone' ref={(node) => { this.dropzoneRef = node; }} onDrop={this.handleFiles} >
                    <div>
                        <div> { image ? 'You have uploaded an image.' : 'Drop photo here.' }</div>
                        { image && <img src={image.preview} />}
                    </div>
                </Dropzone>
                <Row>
                    <Col md={3} xs={6}>
                        <Button size='medium'
                                onClick={() => { this.dropzoneRef.open() }}>Upload</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}
