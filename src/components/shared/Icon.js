import React from 'react';

import BaseComponent from './BaseComponent';

export default class Icon extends BaseComponent {
    render() {
        const { name, width, height } = this.props;
        return (
            <img src={require(`../../resources/icons/${name}.png`)}
                 width={width}
                 height={height} />
        )
    }
}