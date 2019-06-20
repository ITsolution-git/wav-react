import React  from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { 
    BaseComponent,
    Dialog,
    SvgIcon,
    Typography
} from '../shared';
import colors from '../../constants/Colors';

class CongratsDialog extends BaseComponent {

    onClose = () => {
        this.props.onClose()
    }

    render() {
        const { showCongratDlg } = this.props

        return (
            <Dialog className={cn('congrate-dlg')} 
                show={showCongratDlg} 
                onClose={this.onClose}>
                
                <Typography color={colors['white']} className={cn('cong-title')}>Congratulations!</Typography>
                <Typography color={colors['white']} variant='body'>Here are your 4 points. Well deserved, my friend. Well deserved!</Typography>

                <div className={cn('points-icon')}>
                    <SvgIcon name="points-icon" />

                    <div className={cn('points')}>
                        <SvgIcon name="medal" />
                        <Typography variant="body"> +4</Typography>
                    </div>
                </div>

                <Typography color={colors['white']} variant='body'>Share your result:</Typography>

                <div className={cn('share-icons')}>
                    <SvgIcon name="social-twitter" className={cn('tw-icon')}/>
                    <SvgIcon name="social-fb" />
                </div>

                <SvgIcon name="ellipse-solid" className={cn('ellipse-solid')}/>
                <SvgIcon name="plus-solid" className={cn('plus-solid')}/>
            </Dialog>
        )
    }

}

CongratsDialog.defaultProps = {
    showCongratDlg: true,
    onClose: () => {}
 };
 
 CongratsDialog.propTypes = {
    showCongratDlg: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
 };

export default CongratsDialog;