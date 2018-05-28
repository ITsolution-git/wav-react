import React from 'react';

import BaseComponent from '../../shared/BaseComponent';
import Paginator from '../../shared/Paginator';
import Spinner from '../../shared/Spinner';
import UserItem from './UserItem';
import VoterItem from './VoterItem';

export default class UsersList extends BaseComponent {
    state = {
      currentUsers: []
    };
    render() {
        const { currentUsers } = this.state;
        const {
            users = [],
            isVoter,
            isFetching
        } = this.props;
        return (
            <div>
                <Spinner height={300} loading={isFetching} />
                <div className='user-list'>
                    { isVoter ? 
                        currentUsers.map((user, index) =>   <VoterItem key={index}
                                                                isVoter={isVoter}
                                                                user={user} />)
                        : currentUsers.map((user, index) => <UserItem key={index}
                                                                isVoter={isVoter}
                                                                user={user} />)
                                                                   }
                </div>
                <Paginator items={users}
                           onItemsChange={items => this.setState({ currentUsers: items })}/>
            </div>
        )
    }
}