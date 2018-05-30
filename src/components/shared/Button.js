import React from 'react';

export default class Button extends React.Component {

    render() {
        const {
            children,
            size='large',
            style = {},
            onClick = () => {}
        } = this.props;

        return (
            <button className={`btw-button button-${size}`}
                    style={style}
                    onClick={onClick}>
                { children }
            </button>
        )
    }
}