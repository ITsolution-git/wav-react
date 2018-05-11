import { TextInput as Input } from "./InputBase";

export default class TextInput extends TextInput {
    render () {
        return <Input label='Email' type='email' {...this.props } />
    }
}