import { lighten, saturate } from 'polished';
import React from 'react';
import styled from '@emotion/styled';

import { css } from '@emotion/react';

import { colors } from '../../styles/colors';
import config from '../../website-config';


export function SubscribeForm() {

  let input: {
    email: string, 
    password: string
  } = {
    email: "",
    password: ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name == "email") {
      input.email = e.target.value;
    }
    else if(e.target.name == "password") {
      input.password = e.target.value
    }
  }

  const handleClick = (e: React.SyntheticEvent) => {
    if(input.email != "" && input.password != "") {
      fetch(
        config.backendUrl + "/auth/signin", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(input)
        }
      ).then((res) => {
        if(res.ok) {
          return res.json()
        } else {
          localStorage.removeItem('loginToken')
        }
      }).then((body) => {
        config.bearerToken = body.token
        localStorage.setItem('loginToken', body.token)
        console.log(localStorage.getItem('loginToken'))
        window.alert("Success to Sign in!")
        window.location.href = "/"
      }).catch(console.error)
    }
  }

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <div css={SubscribeFormStyles}>
      <FormGroup className="form-group">
        <SubscribeEmail
          className="subscribe-email"
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Email"
        /><br></br>
        <SubscribeEmail
          className="subscribe-email"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
      </FormGroup><br></br>
      <SubscribeFormButton 
          onClick={handleClick}
          id = "SubmitButton">
        Sign in
      </SubscribeFormButton>
    </div>
  );
}

const SubscribeFormStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  max-width: 460px;

  @media (max-width: 500px) {
    flex-direction: column;

    .form-group {
      flex-direction: column;
      width: 100%;
    }
  }
`;

const SubscribeEmail = styled.input`
  display: block;
  padding: 10px;
  width: 100%;
  /* border: color(var(--lightgrey) l(+7%)) 1px solid; */
  border: ${lighten('0.07', colors.lightgrey)} 1px solid;
  /* color: var(--midgrey); */
  color: ${colors.midgrey};
  font-size: 1.8rem;
  line-height: 1em;
  font-weight: normal;
  user-select: text;
  border-radius: 5px;
  transition: border-color 0.15s linear;

  -webkit-appearance: none;

  :focus {
    outline: 0;
    /* border-color: color(var(--lightgrey) l(-2%)); */
    border-color: ${lighten('-0.02', colors.lightgrey)};
  }

  @media (prefers-color-scheme: dark) {
    /* border-color: color(var(--darkmode) l(+6%)); */
    border-color: ${lighten('0.06', colors.darkmode)};
    color: rgba(255, 255, 255, 0.9);
    /* background: color(var(--darkmode) l(+3%)); */
    background: ${lighten('0.03', colors.darkmode)};

    :focus {
      /* border-color: color(var(--darkmode) l(+25%)); */
      border-color: ${lighten('0.25', colors.darkmode)};
    }
  }
`;

const SubscribeFormButton = styled.button`
  position: relative;
  display: inline-block;
  margin: 0 0 0 10px;
  padding: 0 20px;
  height: 43px;
  outline: none;
  color: #fff;
  font-size: 1.5rem;
  line-height: 39px;
  font-weight: 400;
  text-align: center;
  /* background: linear-gradient(
    color(var(--blue) whiteness(+7%)),
    color(var(--blue) lightness(-7%) saturation(-10%)) 60%,
    color(var(--blue) lightness(-7%) saturation(-10%)) 90%,
    color(var(--blue) lightness(-4%) saturation(-10%))
  ); */
  /* background: linear-gradient(
    ${lighten('0.07', colors.blue)},
    ${saturate('-0.1', lighten('-0.07', colors.blue))} 60%,
    ${saturate('-0.1', lighten('-0.07', colors.blue))} 90%,
    ${saturate('-0.1', lighten('-0.04', colors.blue))}
  ); */
  background: linear-gradient(#4fb7f0, #29a0e0 60%, #29a0e0 90%, #36a6e2);
  border-radius: 5px;

  -webkit-font-smoothing: subpixel-antialiased;

  :active,
  :focus {
    /* background: color(var(--blue) lightness(-9%) saturation(-10%)); */
    background: ${saturate('-0.1', lighten('-0.09', colors.blue))};
  }
  @media (max-width: 500px) {
    margin: 10px 0 0 0;
    width: 100%;
  }

  @media (prefers-color-scheme: dark) {
    opacity: 0.9;
  }
`;

const FormGroup = styled.div`
  @media (max-width: 500px) {
    width: 100%;
  }
`;
