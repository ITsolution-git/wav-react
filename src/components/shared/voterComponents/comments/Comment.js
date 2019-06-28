import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';

import colors from '../../../../constants/Colors';
import { BaseComponent, VoterAvatar, Typography } from '../../';

const GreyText = props => {
    return (
      <Typography color={colors.secondary} variant='functional' style={{ opacity: 0.6 }} {...props} />
    );
};

class Comment extends BaseComponent {

    onEdit = id => () => {
        this.props.onEdit(id);
    };

    onDelete = id => () => {
      this.props.onDelete(id);
    };

    render() {
        const { comment: {
            id, avatar,text, date
        } } = this.props;

        return (
            <Row>
                <Col sm={2} md={1}>
                    <VoterAvatar src={avatar} size={24} noBorder />
                </Col>
                <Col sm={10} md={11}>
                    <Typography color={colors.secondary} variant='body'>{ text }</Typography>
                    <div className='d-flex flex-row'>
                        <div className='p-2'>
                            <GreyText onClick={this.onEdit(id)}>Edit</GreyText>
                        </div>
                        <div className='p-2'>
                            <GreyText onClick={this.onDelete(id)}>Delete</GreyText>
                        </div>
                        <div className='p-2'>
                            <GreyText>{moment(date).format("MMM DD") }</GreyText>
                        </div>
                    </div>
                </Col>
            </Row>
        )
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Comment;