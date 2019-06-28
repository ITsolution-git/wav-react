import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import { BaseComponent, Typography, Button, VoterAvatar, TextArea } from '../../';
import Comment from './Comment';

class CommentsList extends BaseComponent {
    state = {
        comment: ''
    };

    hanldeCommentChange = comment => {
        this.setState({ comment });
    };

    onAddClick = () => {
      this.props.onAdd(this.state.comment);
      this.setState({ comment: ''});
    };

    render() {
        const { comments, onDelete, onEdit} = this.props;
        const { comment } = this.state;

        return (
            <div className='btw-comments-list'>
                <Typography className='title'
                            variant='body'
                            fontWeight='600'>
                    Comments ({comments.length})
                </Typography>
                { comments.map(( comment, index) =>
                    <Comment key={index}
                             comment={comment}
                             onDelete={onDelete}
                             onEdit={onEdit} />
                )}
                <Row>
                    <Col xs={1} md={1} lg={1}>
                        <VoterAvatar size={24}
                                     noBorder src='https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg-1024x683.jpg' />
                    </Col>
                    <Col xs={11} md={11} lg={11}>
                        <TextArea row={3}
                                  placeholder='Add updates...'
                                  defaultValue={comment}
                                  onChange={this.hanldeCommentChange} />
                        <div className='d-flex flex-row-reverse add-comment-button'>
                            <Button size='small'
                                    onClick={this.onAddClick}
                                    style={{ width: 93 }}
                                    disabled={!comment}>
                                Add Comment
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

CommentsList.propTypes = {
  comments: PropTypes.array,
  onAdd: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default CommentsList;
