import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { NetflixButton } from "./components";
import TextField from "@material-ui/core/TextField";
import "./mainComponents.css";
import Fade from "react-reveal/Fade";

export const MainPage = () => {
  const [focus, setFocus] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  useEffect(() => {
    if ( input.trim() ) {
      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      setError(!emailRegex.test(input));
    } else {
      setError(false) ;
    }

  }, [input]);
  console.log(error);
  return (
    <MainPageContainer>
      <h1>Unlimited movies, TV shows, and more.</h1>
      <h2>Watch anywhere. Cancel anytime.</h2>
      <p>
        Ready to watch? Enter your email to create or restart your membership.
      </p>
      <div>
        <form className="main-page-form" onSubmit={(e) => e.preventDefault()}>
          <label
            className={focus || input.trim() ? "focused" : ""}
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            required
            id="email"
            type="email"
            name="email"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <span className={focus ? "focused" : ""}></span>
          <NetflixButton>Get Started</NetflixButton>
        </form>
        <Fade when={error} left>
          <div>
            <FormErrorMessage>Please enter a valid email address</FormErrorMessage>
          </div>
        </Fade>
        <NetflixButton>Get Started</NetflixButton>
      </div>
    </MainPageContainer>
  );
};

const FormErrorMessage = styled.p`
  color: #efa00a;
  margin-top: 4px;
  font-size: 17px;
  font-weight: 400;
  text-align: left;
  align-self: flex-start;
`;

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
  & > div > button {
    display: none ;
  }
  & form {
    display: flex;
    min-width: 50vw;
    margin: 0 auto;
    position: relative;
  }
  & form > input {
    background-color: white;
    flex: 100;
    outline: none;
    border: none;
    height: 80px;
    padding: 20px;
    font-size: 1.2rem;
    font-weight: 700;
    position: relative;
    border-radius: 3px ;
  }
  & > h1 {
    font-size: 3.7rem;
    font-weight: 500;
    max-width: 50vw;
    line-height: 4rem;
  }
  & > h2 {
    font-size: 1.8rem;
    font-weight: 400;
    margin: 15px 0;
  }
  & > p {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 1200px) {
    & > h1 {
      max-width: 95vw;
      font-size: 2.8rem;
      line-height: 3rem;
    }
    & > h2 {
      font-size: 1.5rem;
    }
    & > p {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 600px) {
    & {
      padding: 0 7px ;
    }
    & > div > button {
      display: flex ;
      margin: 0 auto ;
    }
    & form {
      min-width: 70vw ;
    }
    & form > input {
      height: 60px ;
    }
    & form > button {
      display: none ;
    }
    & > h1 {
      font-size: 1.8rem;
      line-height: 2.8rem;
    }
    & > p {
      max-width: 90vw ;
    }
    & > h2 {
      font-size: 1.1rem ;
    }
  }
`;
