import React from 'react';
import Logo from '../layout/Logo';

export default class AboutInfo extends React.Component {
    render() {
        return (
            <div className="btw-about-info">
                <div className="logo">
                    <Logo />
                </div>
                <div className="text-block">
                    <div>
                        Friends don’t let friends stay home on election day
                    </div>
                    <div>
                        <div>
                            The most impactful thing you can do in this election is make sure your friends vote. Most of them are interested, but they don’t. They’re busy and they forget. Or they don’t know where to go. Most often, they don’t know what’s on the ballot and why it’s important.
                            <br /><br />
                        </div>
                        <div>
                            That’s where you come in. Help your friends register and vote using the BeTheWave platform. We provide customized information and step-by-step guides for you to help your friends. Your friends are 7 times more likely to vote if they hear from you.
                        </div>
                    </div>
                    <div>
                        This election is too important to let your friends sit this one out!
                    </div>
                </div>
            </div>
        )
    }
}