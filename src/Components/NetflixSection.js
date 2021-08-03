import React from "react";
import "./mainComponents.css";
import { data } from "./data";
import { NetflixContainer } from "./components";

const NetflixSection = () => {
  return (
    <div className="netflix-containers">
      {data.map((item, index) => (
        <NetflixContainer
          key={index}
          className="netflix-container"
          number={index}
        >
          <div className="neflix-container-data">
            <h1>{item.title}</h1>
            <h2>{item.description}</h2>
          </div>
          <div className="netflix-container-animations">
            <img src={item.image} alt={item.title} />
            { item.hasOwnProperty('srcs') ?
              <div className='netflix-srcs'>
                <img src={item.srcs[0]} alt={item.title} />
                <div className='netflix-srcs-child'>
                  <p>Stranger Things</p>
                  <p>Downloading...</p>
                </div>
              </div>
             :
            <div className={`netflix-animation netflix-animation-${index}`} >
              <video muted autoPlay playsInline loop>
                <source src={item.src} alt={item.title} />
              </video>
            </div>
          }
          </div>
        </NetflixContainer>
      ))}
    </div>
  );
};

export default NetflixSection;
