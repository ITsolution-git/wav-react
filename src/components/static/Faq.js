import React from 'react';
import { Col } from 'react-bootstrap';

import BaseComponent from '../shared/BaseComponent';
import ContentLayout from '../layout/ContentLayout';

class Faq extends BaseComponent {
    render() {
        return (
            <ContentLayout>
                <div className="btw-terms container">
                    <Col id="title">
                        <div className="title-24-blue">Frequently Asked Questions</div>
                    </Col>
                    <h4><b>What does my friend need to register to vote?</b></h4>

                    <p>
                        In most states, you must provide: 1) an address where you reside (this could be a permanent or temporary residence) and 2) an ID number (this could be either a current and valid driver’s license number or your social security number).
                    </p><br />

                    <h4><b>Is it too late to register?</b></h4>

                    <p>
                        Every state has different registration deadlines.  Check out your states page on vote.org for your deadlines.
                    </p><br />

                    <h4><b>Do I need to re-register when if I’ve moved?</b></h4>

                    <p>
                        Yes, you need to re-register each time you move.  You can register at your current address regardless of what address is on your license.  However, you could be blocked from voting if your state requires ID at the polling station (check if your state requires ID <a target="_blank" rel="noopener noreferrer" href="https://www.headcount.org/voter-id">https://www.headcount.org/voter-id</a>) and you do not bring an acceptable document with your current address to the polls that meets the requirements in your state.  Most states accept a paycheck, utility bill or bank statement, but some have stricter requirements.
                    </p><br />

                    <h4><b>Does my driver’s license need to match my voter registration address?</b></h4>

                    <p>
                        If you have re-registered and have an ID with an address that does not match, please check the ID and proof of residency requirements here: <a target="_blank" rel="noopener noreferrer" href="https://www.headcount.org/voter-id">https://www.headcount.org/voter-id</a>
                    </p><br />

                    <h4><b>Can my friend vote at their student address?</b></h4>

                    <p>
                        Yes, you are allowed to register to vote at your school address, but you should provide your campus mailing address as well as the physical address of your residence.  You may need to present some proof of residency at your polling place.  See this student voting guide for more information <a target="_blank" rel="noopener noreferrer" href="http://www.brennancenter.org/how-vote-2016">http://www.brennancenter.org/how-vote-2016</a>                </p><br />

                    <h4><b>My friend isn’t 18 yet. Can they still register?</b></h4>

                    <p>
                        In all but a few states, you can register to vote if you will be 18 by election day.  For more information, please see this young voter guide <a target="_blank" rel="noopener noreferrer" href="http://www.ncsl.org/research/elections-and-campaigns/preregistration-for-young-voters.aspx">http://www.ncsl.org/research/elections-and-campaigns/preregistration-for-young-voters.aspx</a>
                    </p><br />

                    <h4><b>Do I need to pick a party when I register?</b></h4>

                    <p>
                        No, you do not.  Some states, however, require you be enrolled with a party to vote in that party’s primary election.  To find out more, check your state election website or visit Headcount’s voter info hub <a target="_blank" rel="noopener noreferrer" href="https://www.headcount.org/voter-info/">https://www.headcount.org/voter-info</a>
                    </p><br />

                    <h4><b>How can I check to see if my friend is registered already?</b></h4>

                    <p>
                        When you sign someone up on BeTheWave, it will automatically check their voter registration status.  You can also check here: <a target="_blank" rel="noopener noreferrer" href="https://www.vote.org/am-i-registered-to-vote/">https://www.vote.org/am-i-registered-to-vote</a>
                    </p><br />

                    <h4><b>Can a convicted felon vote?</b></h4>

                    <p>
                        Laws vary by state.  In some, you must petition to have voting rights restored, and they are restored automatically once your sentence or parole ends. You should not register to vote if you are not aware of the status of your civil rights.  For more detailed information on state by state felon restrictions, please visit ProCon’s Felon Voter Information website <a target="_blank" rel="noopener noreferrer" href="https://felonvoting.procon.org/view.resource.php?resourceID=000286">https://felonvoting.procon.org/view.resource.php?resourceID=000286</a>
                    </p><br />

                    <h4><b>How long does it take to process my voter registration?</b></h4>

                    <p>
                        It can take several weeks; most states send out voter registration cards within seven weeks from receiving your registration.  You can verify your registration status here: <a target="_blank" rel="noopener noreferrer" href="https://www.vote.org/am-i-registered-to-vote/">https://www.vote.org/am-i-registered-to-vote</a> and we recommend doing so at least a week before the registration deadline in case you need to fill out a new registration form.
                    </p><br />

                    <h4><b>My friend is studying abroad, can they register if they are a US citizen but are living abroad and don’t have a permanent address in the US?</b></h4>

                    <p>
                        Yes!  In this situation, you must register at the last address you lived in before leaving the USA or the address where you will return to (there must be some indication you plan to live there like vehicle registration, property ownership, drivers license, family, etc.)
                        You can find more information on the Overseas Vote Foundation <a target="_blank" rel="noopener noreferrer" href="https://www.overseasvotefoundation.org/vote/home.htm">https://www.overseasvotefoundation.org/vote/home.htm</a>
                    </p><br />

                    <h4><b>My friend is in the army and is currently deployed, can they register?</b></h4>

                    <p>
                        These rules vary state by state, for the latest information, check out the Overseas Vote Foundation <a target="_blank" rel="noopener noreferrer" href="https://www.overseasvotefoundation.org/vote/home.htm">https://www.overseasvotefoundation.org/vote/home.htm</a>
                    </p><br />

                    <h4><b>My friend just moved here, can they register?</b></h4>

                    <p>
                        Rules around residency vary by state.  In some, you are eligible immediately, others you need to wait a certain number of days.  No state can require you to live there for more than 30 days to be eligible to vote.
                    </p><br />
                </div>
            </ContentLayout>
        );
    }
}

export default Faq;