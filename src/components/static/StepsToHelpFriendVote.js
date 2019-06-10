/**
 *  Created by KennethObikwelu on 10/9/18.
 */



import React from 'react';
import { Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import ContentLayout from '../layout/ContentLayout';
import routes from '../../constants/Routes';


class StepsToHelpFriendVote extends BaseComponent {

	render() {
		return (
			<ContentLayout>
				<div className="btw-terms container">
					<Col id="title">
						<div>Steps to Helping Your Friends Vote</div>
					</Col>
					<h4><b>What does my friend need to register to vote?</b></h4>

					<p>
						Don’t worry, you don’t have to remember all of the details below.
						You’ll receive notifications about “Actions” for you to take to make sure all of your friends are ready to vote.
						<span onClick={() => this.onLink(routes.tasksList)}> Go to My Actions to get started. </span>
					</p><br/>

					<h4><b>1.    Register to Vote</b></h4>

					<p>
						Depending on your age, many of your friends may not be registered to vote!
						You can verify whether or not they are using BeTheWave.
						For those friends who aren’t registered, you’ll send them a link to register online.
					</p><br/>

					<p>
						Even if your friends are registered, they may need to re-register if they have moved.
					</p><br/>

					<p>
						A lot of people think that registering to vote will take a long time or is difficult.
						In fact,  it only takes 2 minutes to register online! (in some states, you may have to print out the form and send it in but it’s still pretty easy).
					</p><br/>



					<h4><b>2.    Decide Method of Voting</b></h4>

					<p>
						Now that your friend is registered, you’ll let them know what their options are for how they cast their ballot -- in person on Election Day or early,
						either by mail or in person. The options available to your friend depend on their county and state.
						You can find out which options are available by going to <span onClick={() => this.onLink(routes.voterList)}> My Voters  </span>  and clicking on your friend’s name.
					</p><br/>

					<p>
						Usually voting by mail makes the most sense, if it’s an option for your friend.
						It’s convenient and gives your friend more time to look over their ballot and research the candidates and ballot measures.
					</p><br/>

					<p>
						If your friend wants to vote by mail, you’ll need to remind them of the deadline to sign up to receive their ballot by mail.
						Deadlines vary by state. Go to My Voters and click on your friend’s name to find out their state’s deadline.
					</p><br/>


					<h4><b>3.   Understand the Ballot</b></h4>

					<p>
						State and local races often don’t receive a lot of attention and it’s likely that your friends will not know who is running or what’s at stake.
						You can help them out by explaining the candidates and issues or by pointing them to WeVote
						where they can get customized recommendations on who to support based on their political views and the organizations they support.
					</p><br/>

					<p>
						If you’re feeling particularly enterprising, you can host a ballot party. Invite some friends over to discuss what’s on the ballot and share research.
						But it should be a party, so make it fun! Have snacks and some music.  <a target="_blank" rel="noopener noreferrer" href="https://ballotparty.ballotready.org"> Learn more here.</a>
					</p><br/>



					<h4><b>4.   Cast their Ballot</b></h4>

					<p>
						By now, your friends should feel ready to cast their ballot but they still need a reminder from you!
					</p><br/>

					<p>
						People get busy and sometimes forget.
						The best way to ensure your friend votes is to ask them in advance what their plan is.
						How are they going to vote? When? How are they getting to the polls?
					</p><br/>

					<p>
						After the election, don’t forget to thank your friend for voting!
					</p><br/>

					<p>
						Ready to help your friends vote? <span onClick={() => this.onLink(routes.tasksList)}> Get started now</span>
					</p><br/>

				</div>
			</ContentLayout>
		);
	}

}

export default StepsToHelpFriendVote;