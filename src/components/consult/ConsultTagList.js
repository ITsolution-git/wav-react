import React from 'react';
import PropTypes from 'prop-types';

import { BaseComponent, Typography } from '../shared';

class ConsultTagList extends BaseComponent {

    constructor() {
        super();
        this.state = {
            isShowAll: false
        }
    }

    viewAllHandler = () => {
        this.setState((prevState) => ({
            isShowAll: !prevState.isShowAll
        }));
    }

    renderViewAllButton = () => {
        const { isShowAll } = this.state;

        return (
            <span
                className='view-all'
                onClick={this.viewAllHandler}>
                {isShowAll ? 'Close' : 'View All'}
            </span>
        );
    }

    renderTagItem = (tag, i) => {
        const { onTagSelect } = this.props;

        return (
            <Typography key={i} variant='functional' className='tag-item' onClick={() => onTagSelect(tag)} >
                {tag}
            </Typography>
        );
    }

    renderTagList = () => {
        const { isShowAll } = this.state;
        const { tagList, minTags } = this.props;

        return (
            <div className='tag-list'>
                {[...Array(isShowAll ? tagList.length : minTags)].map((e, i) => (
                    this.renderTagItem(tagList[i], i)
                ))}
            </div>
        )
    }

    render() {

        return (
            <div className='btw-consult-tag-list btw-paper'>
                <Typography className='title'>
                    Popular Tags:
                </Typography>
                {this.renderTagList()}
                {this.renderViewAllButton()}
            </div>
        );
    }
}

ConsultTagList.propTypes = {
    tagList: PropTypes.array,
    minTags: PropTypes.number,
    onTagSelect: PropTypes.func
};

ConsultTagList.defaultProps = {
    minTags: 10
}

export default ConsultTagList;