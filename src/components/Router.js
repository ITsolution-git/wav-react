import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginBySocial from './auth/LoginBySocial';
import LoginByMail from './auth/LoginByMail';
import GeneralErrorPage from './errorPages/GeneralErrorPage';
import NoTaskErrorPage from './errorPages/NoTaskErrorPage';
import SendInvite from './invites/SendInvite';
import RegisterByMail from './auth/RegisterByMail';
import RegisterBySocial from './auth/RegisterBySocial';
import Profile from './captainProfile/Profile';
import MakeList from './voter/MakeList';
import TasksList from './tasksList/TasksList';
import VotersManagement from './voterList';
import Community from './community/Community';
import CaptainsDashboard from './captainsDashboard/CaptainsDashboard';
import AdminDashBoard from './adminDashboard/AdminDashboard';
import VoterDetail from './voter/VoterDetail';
import MatchList from './voter/MatchList';
import VoterSuccess from './voter/shared/VoterSuccess';
import NotFoundError from './voter/shared/VoterError';
import Forum from './community/Forum';
import Reports from './reports/Reports';
import AddVoterTask from './tasks/AddVoterTask';
import LiteratureTextTask from './tasks/LiteratureTextTask';
import LiteratureVideoTask from './tasks/LiteratureVideoTask';
import RecruitingCaptainTask from './tasks/RecruitingCaptainTask';
import RegisterVoterTask from './tasks/RegisterVoterTask';
import UpdateProfileTask from './tasks/UpdateProfileTask';
import PreferenceTask from './tasks/PreferenceTask';
import RegularVoteTask from './tasks/RegularVoteTask';
import WelcomePage from './voter/WelcomePage';
import SocialConnect from './socialNetworks/SocialConnect';
import SelectDistrict from './selectDistrict/SelectDistrict';
import SelectVoters from './selectVoters/SelectVoters';
import ConsultManagement from './consult/ConsultManagement';

import MailRegistrationTask from './tasks/MailRegistrationTask';
import ReminderVoteTask from './tasks/ReminderVoteTask';
import MessageList from './messages/MessageList';
import VoterFilter from './filters/VoterFilter';
import CaptainFilter from './filters/CaptainFilter';

import ChangePassword from './changePassword/changePassword';
import ForgotPassword from './changePassword/forgotPassword';

import LogList from './transactionLogs/LogList';
import LogDetail from './transactionLogs/LogDetail';

// static pages
import WhyBethewave from './static/WhyBethewave';
import HowContribute from './static/HowContribute';
import TermsOfUse from './static/TermsOfUse';
import PrivacyPolicy from './static/PrivacyPolicy';
import Faq from './static/Faq';
import ResourceCenter from './static/ResourceCenter';
import StepsToHelpFriendVote from './static/StepsToHelpFriendVote';

import Authorization from './hocs/Authorization';
import routes from '../constants/Routes';
import roles from '../constants/Roles';

// unsubscribe
import Unsubscribe from './unsubscribe/unsubscribe';

//verify email
import VerifyEmail from './verifyEmail/VerifyEmail';

const { captain, admin, guest } = roles;

const router = () => (
    <Switch>
        <Route exact path={routes.loginBySocial}
            component={Authorization(LoginBySocial, [guest])} />
        <Route exact path={routes.loginByMail}
            component={Authorization(LoginByMail, [guest])} />
        <Route exact path={routes.registerByMail}
            component={Authorization(RegisterByMail, [guest, captain, admin])} />
        <Route exact path={routes.registerBySocial}
            component={Authorization(RegisterBySocial, [guest, captain, admin])} />
        <Route exact path={routes.profile}
            component={Profile} />
        <Route exact path={routes.pageDown}
            component={GeneralErrorPage} />
        <Route exact path={routes.noTaskErr}
            component={NoTaskErrorPage} />
        <Route exact path={routes.invites}
            component={Authorization(SendInvite, [captain])} />
        <Route exact path={routes.socialConnect}
            component={Authorization(SocialConnect, [captain])} />
        <Route exact path={routes.tasksList}
            component={Authorization(TasksList, [captain])} />
        <Route exact path={routes.voterList}
            component={Authorization(VotersManagement, [captain])} />
        <Route exact path={routes.community}
            component={Authorization(Community, [captain])} />
        <Route exact path={routes.forum}
            component={Authorization(Forum, [captain])} />
        <Route exact path={routes.captainsDashboard}
            component={Authorization(CaptainsDashboard, [captain])} />
        <Route exact path={routes.messageList}
            component={Authorization(MessageList, [captain, admin])} />
        <Route exact path={routes.adminDashboard}
            component={Authorization(AdminDashBoard, [admin])} />
        <Route exact path={routes.reports}
            component={Authorization(Reports, [admin])} />
        <Route exact path={routes.consultManagement}
            component={Authorization(ConsultManagement, [captain])} />

        {/* select voters onboarding */}
        <Route exact path={routes.selectVoters}
            component={Authorization(SelectVoters, [captain])} />

        {/* voter onboarding */}
        <Route exact path={routes.makelist}
            component={Authorization(MakeList, [captain])} />
        <Route exact path={routes.voterDetail}
            component={Authorization(VoterDetail, [captain])} />
        <Route exact path={routes.matchList}
            component={Authorization(MatchList, [captain])} />
        <Route exact path={routes.voterSuccess}
            component={Authorization(VoterSuccess, [captain])} />
        <Route exact path={routes.voterNotFoundError}
            component={Authorization(NotFoundError, [captain])} />
        <Route exact path={routes.welcome}
            component={Authorization(WelcomePage, [captain])} />

        {/* select voting district */}
        <Route exact path={routes.selectDistrict}
            component={Authorization(SelectDistrict, [captain])} />

        {/* tasks */}
        <Route exact path={routes.addVoterTask}
            component={Authorization(AddVoterTask, [captain])} />
        <Route exact path={routes.addVoterTask}
            component={Authorization(AddVoterTask, [captain])} />
        <Route exact path={routes.literatureTextTask}
            component={Authorization(LiteratureTextTask, [captain])} />
        <Route exact path={routes.literatureVideoTask}
            component={Authorization(LiteratureVideoTask, [captain])} />
        <Route exact path={routes.recruitingCaptainTask}
            component={Authorization(RecruitingCaptainTask, [captain])} />
        <Route exact path={routes.registerVoterTask}
            component={Authorization(RegisterVoterTask, [captain])} />
        <Route exact path={routes.updateProfileTask}
            component={Authorization(UpdateProfileTask, [captain])} />
        <Route exact path={routes.preferenceTask}
            component={Authorization(PreferenceTask, [captain])} />
        <Route exact path={routes.mailRegistrationTask}
            component={Authorization(MailRegistrationTask, [captain])} />
        <Route exact path={routes.reminderVoteTask}
            component={Authorization(ReminderVoteTask, [captain])} />
        <Route exact path={routes.regularVoteTask}
            component={Authorization(RegularVoteTask, [captain])} />

        {/* filters */}
        <Route exact path={routes.voterFilter}
            component={Authorization(VoterFilter, [admin])} />
        <Route exact path={routes.captainFilter}
            component={Authorization(CaptainFilter, [admin])} />

        {/* static route pages */}
        <Route exact path={routes.whyBetheWave} component={WhyBethewave} />
        <Route exact path={routes.howContribute} component={HowContribute} />
        <Route exact path={routes.termsOfUse} component={TermsOfUse} />
        <Route exact path={routes.privacyPolicy} component={PrivacyPolicy} />
        <Route exact path={routes.faq} component={Faq} />
        <Route exact path={routes.stepsToHelpFriendVote} component={StepsToHelpFriendVote} />
        <Route exact path={routes.resourceCenter} component={ResourceCenter} />

        {/* change changePassword */}
        <Route exact path={routes.changePassword} component={ChangePassword} />
        <Route exact path={routes.forgotPassword} component={ForgotPassword} />

        {/* transaction logs */}
        <Route exact path={routes.loglist} component={LogList} />
        <Route exact path={routes.logdetail} component={LogDetail} />

        {/* unsubscribe */}
        <Route exact path={routes.unsubscribe} component={Unsubscribe} />

        {/* verify email*/}
        <Route exact path={routes.verifyEmail}
            component={Authorization(VerifyEmail, [captain])} />
    </Switch>
);

export default router;