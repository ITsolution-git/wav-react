import React from 'react';

export default class Button extends React.Component {

    render() {
        const {
            children,
            size='large',
            style = {},
            disabled,
            id,
            color = 'blue',
            onClick = () => {}
        } = this.props;

        return (
            <button className={`btw-button button-${size} button-${color}`}
                    id={id}
                    style={style}
                    disabled={disabled}
                    onClick={onClick}>
                { children }
            </button>
        )
    }
}