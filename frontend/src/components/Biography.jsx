import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            Diagnosense is an AI-powered lung cancer detection platform
            developed with a mission to revolutionize early diagnosis through
            technology. Born out of a passion for innovation in healthcare,
            Diagnosense combines medical intelligence with machine learning to
            provide fast, accurate, and accessible detection support.
          </p>
          <p>
            Our system leverages trained machine learning models to analyze
            patient data and identify signs of lung cancer at an early
            stage—when treatment is most effective. Diagnosense aims to bridge
            the gap between timely diagnosis and accessible care, making
            advanced diagnostics available to medical professionals, clinics,
            and even patients in remote regions.
          </p>
          <p>
            Whether you're a healthcare provider, researcher, or patient,
            Diagnosense is your partner in smarter detection and healthier
            futures.
          </p>
        </div>
      </div>
    </>
  );
};

export default Biography;
