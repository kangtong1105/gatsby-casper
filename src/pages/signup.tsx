import React from 'react';
import { Helmet } from 'react-helmet';
import { lighten, saturate } from 'polished';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';
import config from '../website-config';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

function Register() {

  let input: {
    email: string, 
    password: string,
    username: string
  } = {
    email: "",
    password: "",
    username: ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.name == "email") {
      input.email = e.target.value;
    }
    else if(e.target.name == "password") {
      input.password = e.target.value
    }
    else if(e.target.name == "username") {
      input.username = e.target.value
    }
  }

  const handleClick = (e: React.SyntheticEvent) => {
    
    if( input.email != "" && input.password != "" && input.username != "") {

      fetch(
        config.backendUrl + "/auth/signup", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(input)
        }
      ).then((res) => {
        if(res.ok) {
          window.alert("Success to Sign up!")
          window.location.href = "/"
        }
      })
    }
  }

  return (
    <IndexLayout>
    <Helmet>
      <title>ISMS-P Details</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
        <div css={[outer, SiteNavMain]}>
          <div css={inner}>
            <SiteNav isHome={false} />
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <div css={inner}>
          <article className="post page" css={[PostFull, NoImage]}>
            <PostFullHeader className="post-full-header">
              <PostFullTitle className="post-full-title">Sign up</PostFullTitle>
            </PostFullHeader>
  
            <PostFullContent className="post-full-content">
              <div className="post-content">
              <form >
                <Signup_Input type="email" name="email" placeholder="email" onChange = {handleChange}/>
                <Signup_Input type="username" name="username" placeholder="username" onChange = {handleChange}/>
                <Signup_Input type="password" name="password" placeholder="password" onChange = {handleChange}/>
              </form>
                <Signup_Button id="SubmitButton" onClick = {handleClick}>Sign Up</Signup_Button>
              </div>
            </PostFullContent>
          </article>
        </div>
      </main>
      <Footer />
    </Wrapper>
    </IndexLayout>
  )
}

export default Register;

const Signup_Input = styled.input`
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
  margin: 10px;

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

const Signup_Button = styled.button`
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
