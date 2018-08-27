import React from 'react';
import { renderLogo } from '../layout/HeaderHelper';

export default class AboutInfo extends React.Component {
    render() {
        return (
            <div className="btw-about-info">
                <div className="logo">{ renderLogo() }</div>
                <div className="text-block">
                    <div className="title-20-white">
                        If you're here, it's because you've agreed to help us with something really important.
                    </div>
                    <div className="text-content">
                        <div className="text-18-white">
                            We need to make 2018 a wave election for progressives, and one of the most important things you can do is make sure all your progressive friends vote.
                        </div>
                        <div className="text-18-white">
                            BeTheWave is an app that makes this easy, and you'are one of the first people to use it. As a captain on BeTheWave, you'll list out the names of the friends you want to help and then we'll take you step by step through the process of getting them registered and to the polls.
                        </div>
                        <div className="text-18-white">
                            This is a prototype, and there might be some bugs and hiccups along the way. Your feedback is going to be crucial to making sure the final product is successful.
                        </div>
                    </div>
                    <div className="title-16-white">
                        Thanks for being part of this!
                    </div>
                </div>
            </div>
        )
    }
}