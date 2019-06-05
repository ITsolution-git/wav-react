import BaseComponent from '../BaseComponent';

export default class InputBase extends BaseComponent {

    mapItem = (item) => {
        if (typeof item === 'string') {
            return {
                label: item,
                value: item
            }
        }
        return item;
    };

    handleChange = event => {
        const { onChange } = this.props;
        onChange(event.target.value);
    };
}