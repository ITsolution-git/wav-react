import React from 'react';

import tileTypes from './TileTypes';
import TipsForFriends from './content/TipsForFriends';
import TalkingPoints from './content/TalkingPoints';
import RegistrationInfo from './content/RegistrationInfo';
import EarlyVotingInfo from './content/EarlyVotingInfo';
import IdLaws from './content/IdLaws';
import BallotGuides from './content/BallotGuides';
import VotingFaqs from './content/VotingFaqs';

const Tile = ({ type, title }) => {
  function resolveHtml() {
    switch (type) {
        case tileTypes.tipsForFriends: {
            return <TipsForFriends />
        }
        case tileTypes.talkingPoints: {
            return <TalkingPoints />
        }
        case tileTypes.registrationInfo: {
            return <RegistrationInfo />
        }
        case tileTypes.earlyVotingInfo: {
            return <EarlyVotingInfo />
        }
        case tileTypes.idLaws: {
            return <IdLaws />
        }
        case tileTypes.ballotGuides: {
            return <BallotGuides />
        }
        case tileTypes.votingFaqs: {
            return <VotingFaqs />
        }
        default: {
            return '';
        }
    }
  }

  const htmlContent = resolveHtml();

  return (
    <div className="tile-details">
        <div id="title" className="title-24-light-blue">{ title }</div>
        <div>{ htmlContent }</div>
    </div>
  );
};

export default Tile;