import React from 'react';

import BaseComponent from '../../../shared/BaseComponent';
import routes from '../../../../constants/Routes';

export default class TalkingPoints extends  BaseComponent {
    render () {
        return (
            <div>
                The following are sample dialogues and assume that you are a college student talking to your friends at
                your college.
                <br/><br/>
                <br/><br/>
                <b>If your friend is already registered…</b>
                <br/><br/>
                <b><i>You:</i></b> Hey! Have you registered to vote yet?<br/>
                <b><i>Friend:</i></b> Yes!<br/>
                <b><i>You:</i></b> Great! Are you registered here? Are back in your hometown?<br/>
                <b><i>Friend:</i></b> I’m registered back home.<br/>
                <b><i>You:</i></b> Cool! You’ll need an absentee ballot, which is easy to get. It’ll take about 5
                minutes. Let me walk you through it! (here’s the link to share: https://www.vote.org/absentee-ballot/)
                <br/><br/>
                <b>If your friend is not registered but wants to be…</b>
                <br/><br/>
                <b><i>You:</i></b> Hey! Have you registered to vote yet?<br/>
                <b><i>Friend:</i></b> Not yet.<br/>
                <b><i>You:</i></b> Cool, you still have time! Do you want to register in here? Or back in your hometown?
                Either one takes about 2 minutes. [Note: ask them where they want to register, not whether they want to
                register. That way, the expectation is that they do indeed register!]<br/>
                <b><i>Friend:</i></b> If I register back home, will I need an absentee ballot? Isn’t that annoying to
                get?<br/>
                <b><i>You:</i></b> No, it’s really easy! If you want to register back home, I can walk you through how
                to get an absentee ballot! That’ll take about 5 minutes. (here’s the link to share:
                https://www.vote.org/absentee-ballot/)
                <br/><br/>
                <b>If your friend is not registered and doesn’t want to be…</b>
                <br/><br/>
                <b><i>You:</i></b> Hey! Have you registered to vote yet?<br/>
                <b><i>Friend:</i></b> No.<br/>
                <b><i>You:</i></b> Cool, you still have time! Do you want to register in here? Or back in your hometown?
                Either one takes about 2 minutes<br/>
                <b><i>Friend:</i></b> I don’t really care about voting, actually! I don’t think I want to register.<br/>
                <b><i>You:</i></b> Oh my! How come?<br/>
                <br/><br/>
                <i>[This can be tricky. Don’t put undue pressure on a friend to do something they don’t want to do. But
                    it is useful to get to the heart of why they are indifferent or hostile towards voting, so that you
                    might be able to change their minds!]</i>
                <br/><br/>
                (a)<br/>
                Friend: One vote isn’t going to change anything.<br/>
                You: That’s not true, actually! Just in 2018, one vote tipped an election in Virginia which determined
                who had control over the entire state legislature! Plus, even if your vote isn’t the deciding vote,
                voting with a group of likeminded people does change things!
                <br/><br/>
                (b)<br/>
                Friend: Voting seems like a hassle. I think my state has really burdensome laws.<br/>
                You: That gives you more reason to register. Making voting difficult to do is exactly how
                disenfranchisement is designed to work. Plus, registering usually only takes 2 minutes! 2 minutes!
                <br/><br/>
                (c)<br/>
                Friend: Voting doesn’t matter to me.<br/>
                You: That might be true right now. But voting really matters to me! Consider it a personal favor to me
                that you register to vote. I can help you do it right now!
                <br/><br/>
                (d)<br/>
                Friend: I don’t live in a competitive state or district.<br/>
                You: Well, since it’s not very competitive here/back in your hometown, you can register back in your
                hometown/here where it is more competitive! But also, competitive races come up all the time wherever
                you live. New York City always leans democratic in the general election, for instance, but the primary
                elections this year were very competitive! Also, even though it’s not very competitive here nationally,
                the local political races do tend to be more competitive!
                <br/><br/>
                <b>Alternatively in these situations, you can take the lead by asking your friend about which issues
                    really matter to them</b>
                <br/><br/>
                You: Well what issues matter to you?<br/>
                Friend: I only really care about...<br/>
                <br/><br/>
                <b>For more information about different scenarios and questions, check out our</b>
                <span onClick={() => this.onLink(routes.faq)}> Voting FAQs.</span>
            </div>
        )
    }
};
