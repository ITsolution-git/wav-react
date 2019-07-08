import React from 'react';
import { Switch, Route } from 'react-router-dom';

import SignIn from './auth/signIn';
import SignUp from './auth/signUp';
import GeneralErrorPage from './errorPages/GeneralErrorPage';
import ChangePassword from './auth/changePassword/changePassword';
import ForgotPassword from './auth/changePassword/forgotPassword';
import VerifyEmail from './verifyEmail/VerifyEmail';

import TasksManagement from './tasksList';
import VotersManagement from './voterList';
import AddVoterManagement from './addVoter';
import { Profile } from './setting';

import WelcomePage from './onBoarding/WelcomePage';
import SocialConnect from './onBoarding/socialNetworks/SocialConnect';
import SelectDistrict from './onBoarding/selectDistrict/SelectDistrict';
import SelectVoterManagement from './onBoarding/selectVoter';

import { CaptainsDashboard, Leaderboard } from './dashboard';
import HelpCenter from './helpCenter';

import TermsAndConditions from './static/termsAndConditions/TermsAndConditions';

import Authorization from './hocs/Authorization';
import routes from '../constants/Routes';
import roles from '../constants/Roles';

const { captain, guest } = roles;

const router = () => (
    <Switch>
        {/* auth */}
        <Route exact path={routes.signIn} component={Authorization(SignIn, [guest])} />
        <Route exact path={routes.signUp} component={Authorization(SignUp, [guest])} />
        <Route exact path={routes.pageDown} component={GeneralErrorPage} />
        <Route exact path={routes.changePassword} component={ChangePassword} />
        <Route exact path={routes.forgotPassword} component={ForgotPassword} />
        <Route exact path={routes.verifyEmail} component={Authorization(VerifyEmail, [captain])} />

        {/* on boarding */}
        <Route exact path={routes.selectVoters} component={Authorization(SelectVoterManagement, [captain])} />
        <Route exact path={routes.welcome} component={Authorization(WelcomePage, [captain])} />
        <Route exact path={routes.selectDistrict} component={Authorization(SelectDistrict, [captain])} />
        <Route exact path={routes.socialConnect} component={Authorization(SocialConnect, [captain])} />

        <Route exact path={routes.tasksList} component={Authorization(TasksManagement, [captain])} />
        <Route exact path={routes.voterList} component={Authorization(VotersManagement, [captain])} />
        <Route exact path={routes.addVoter} component={Authorization(AddVoterManagement, [captain])} />
        <Route exact path={routes.helpCenter} component={Authorization(HelpCenter, [captain])} />
        <Route exact path={routes.captainsDashboard} component={Authorization(CaptainsDashboard, [captain])} />
        <Route exact path={routes.leaderboard} component={Authorization(Leaderboard, [captain])} />
        <Route exact path={routes.profile} component={Authorization(Profile, [captain])} />

        {/* static pages */}
        <Route exact path={routes.termsAndConditions} component={TermsAndConditions} />
    </Switch>
);

export default router;