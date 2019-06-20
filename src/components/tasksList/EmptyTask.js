import React  from 'react';
import cn from 'classnames';

import { 
    BaseComponent,
    SvgIcon,
    Typography,
} from '../shared';

class EmptyTask extends BaseComponent {

    render() {
        return (
            <div className={cn('empty-task')}>
                        
                <SvgIcon name="task-empty" />
                <Typography lightColor >Hey! It's empty here.</Typography>
                <Typography lightColor variant="body">Looks like you don’t have any actions available for now.</Typography>
            
            </div>
        )
    }

}

export default EmptyTask;