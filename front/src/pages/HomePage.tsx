import React from "react";
import { useState } from "react";

const HomePage: React.FC = () => {
    const [getInformation, setGetInformation] = useState(false);

    const giveInformation = () => {
        setGetInformation(true);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="text-center">
                        <h1 className="display-4">Hello, I'm Vitrum</h1>
                        <p className="lead">Java Backend Developer</p>
                    </div>
                    <div className="mt-4">
                        <p>Welcome to my personal website! I specialize in Java backend development and I'm passionate about creating efficient and robust applications.</p>
                    </div>
                    <div className="mt-4 text-center">
                        <button className="btn btn-primary" onClick={giveInformation}>Learn More About Me</button>
                    </div>
                </div>
            </div>
            {getInformation && (
                <div className="row mt-5" id="about">
                    <div className="col-md-6 mx-auto">
                        <div className="text-center">
                            <h2>About Me</h2>
                        </div>
                        <div className="mt-4">
                            <p></p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
