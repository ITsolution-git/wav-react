import React from 'react';
import Pagination from 'rc-pagination';

import BaseComponent from './BaseComponent';

export default class Paginator extends BaseComponent {
    state = {
        current: 1
    };

    onPageChange = page => {
        this.setState({ current: page }, this.onParentItemsChange);
    };

    onParentItemsChange = (props = this.props) => {
       this.props.onItemsChange(this.resolvePageItems(props));
    };

    resolvePageItems = (props = this.props) => {
        const { current } = this.state,
            { items } = props,
            start = (current - 1) * this.getPageSize();
        return items.slice(start, start + this.getPageSize());
    };

    getPageSize = () => {
      const { pageSize = this.isMobile() ? 5 : 10 } = this.props;
      return pageSize;
    };

    componentWillReceiveProps(props) {
        if (this.props.items.length !== props.items.length) {
            this.onParentItemsChange(props);
        }
    }

    componentWillMount() {
        this.onParentItemsChange();
    }

    render () {
        const { current } = this.state;
        const { items = [] } = this.props;
        return (
            <div className='btw-paginator'>
                <Pagination onChange={this.onPageChange}
                            pageSize={this.getPageSize()}
                            current={current}
                            total={items.length} />
            </div>
        )
    }
}
