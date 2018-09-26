import VotingInfoConstants from '../constants/reducerConstants/VotingInfoConstants';
import InitialState from '../constants/InitialState';

export default function votingInfoReducer(state = InitialState.votingInfo, action) {

    const updateState = (data) => {
      const { email, dataType } = action;

      return { ...state,
                  ...{ [`${email}`]: {
                      ...state[`${email}`],
                          ...{ [`${dataType}`]: data
                      }
                  }
            }};
    };

    switch (action.type) {
        case VotingInfoConstants.VOTING_INFO_REQUEST: {
            return updateState({
                isFetching: true
            });
        }
        case VotingInfoConstants.VOTING_INFO_SUCCESS: {
            const { data } = action;
            return updateState({
                isSuccess: true,
                isFetching: false,
                data
            });
        }
        case VotingInfoConstants.VOTING_INFO_ERROR: {
            const { error } = action;
            return updateState({
                isSuccess: false,
                isFetching: false,
                error
            });
        }
        default:
            return state
    }
}