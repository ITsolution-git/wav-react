import React from 'react';

export default class Button extends React.Component {

    render() {
        const {
            children,
            size='large',
            style = {},
            disabled,
            color = 'blue',
            onClick = () => {}
        } = this.props;

        return (
            <button className={`btw-button button-${size} button-${color}`}
                    style={style}
                    disabled={disabled}
                    onClick={onClick}>
                { children }
            </button>
        )
    }
}