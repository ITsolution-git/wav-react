import React from 'react';

import BaseComponent from '../../shared/BaseComponent';

export default class ProgressBar extends BaseComponent {
    render() {
        const { width = '0%' } = this.props;
        return (
            <div className="btw-progress-bar">
                <div className="inner-bar" style={{ width }}></div>
            </div>
        )
    }
}