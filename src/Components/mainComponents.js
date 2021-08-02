import React from "react";
import styled from "styled-components";
import { NetflixButton } from "./components";
import TextField from '@material-ui/core/TextField' ;
import './mainComponents.css' ;

export const MainPage = () => {
  return (
    <MainPageContainer>
      <h1>Unlimited movies, TV shows, and more.</h1>
      <h2>Watch anywhere. Cancel anytime.</h2>
      <p>Ready to watch? Enter your email to create or restart your membership.</p>
      <form className='main-page-form' onSubmit={(e) => e.preventDefault() } >
        <input autoFocus required id='email' placeholder='Email Address' type='email' />
        <NetflixButton>Get Started</NetflixButton>
      </form>

    </MainPageContainer>
  );
};

const MainPageContainer = styled.section`
  height: calc(100vh - 120px);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  color: white;
  text-align: center;
  & > form {
    display: flex ;
    min-width: 50vw ;
    margin: 0 auto ;
  }
  & > form > input {
    background-color: white ;
    flex: 100 ;
    outline: none ;
    border: none ;
    height: 80px ;
    padding: 20px ;
    font-size: 1.2rem ;
    font-weight: 700 ;
    position: relative ;
  }
  & > h1 {
    font-size: 3.7rem;
    font-weight: 500;
    max-width: 50vw;
    line-height: 4rem;
  }
  & > h2 {
    font-size: 2rem;
    font-weight: 400;
    margin: 20px 0;
  }
  & > p {
    font-size: 1.2rem ;
    font-weight: bold ;
  }
  @media screen and (max-width: 1000px) {
    & > h1 {
      max-width: 100vw;
      font-size: 2.8rem;
      line-height: 3rem;
    }
    & > h2 {
      font-size: 1.5rem;
    }
  }
  @media screen and (max-width: 400px) {
    & > h1 {
      font-size: 1.8rem;
      line-height: 2.8rem;
    }
  }
`;
