import React from 'react';

import BaseComponent from '../shared/BaseComponent';
import colors from '../../constants/Colors';

export default class ContentLayout extends BaseComponent {
    render() {
        const { color = colors.lightGrey} = this.props;
        return (
            <div className="btw-content-layout">
                { this.renderBackground(color) }
                { this.props.children }
            </div>
        )
    }
}