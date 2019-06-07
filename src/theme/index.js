import { createMuiTheme } from '@material-ui/core/styles';
import palette from './palette';

const theme = createMuiTheme({
    background: 'red',
    palette,
    overrides: {
        MuiAppBar: {
            root: {
                background: '#fff'
            }
        }
    }
});

export default theme;