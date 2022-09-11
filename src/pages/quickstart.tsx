import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { lighten, saturate } from 'polished';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
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
import items from '../content/isms-checklist.json';
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

let checklist = {}
items.title.map((titledata) => {
  titledata.field.map((fielddata) => {
    fielddata.category.map((categorydata) => {
      categorydata.item.map((item) => {
        checklist = {
          ...checklist,
          [item.id]: false
        }
      })
    })
  })
})

function quickstart() {

  const [listId, setListId] = useState({
    title: 0,
    field: 0,
    category: 0
  })

  const checkboxes = document.getElementsByName("checkbox");

  const nextClick = (e: React.SyntheticEvent) => {

    console.log("click handler called")

    listId.category = listId.category + 1;

    if(listId.category >= items.title[listId.title].field[listId.field].category.length) {
      listId.category = 0
      listId.field++
    }

    if(listId.field >= items.title[listId.title].field.length) {
      listId.field = 0
      listId.title = listId.title + 1
    }

    if(listId.title >= 3) {
      listId.title = 0
    }

    setListId({...listId})

    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    })
  }

  const submitClick = (e: React.SyntheticEvent) => {

    const jsonbody = {
      items: {
        ...checklist
      }
    }

    console.log(JSON.stringify(jsonbody))

    fetch(
      config.backendUrl + "/ismslist/post", 
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('loginToken')}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(jsonbody)
      }
    ).then((res) => {
      if(res.ok) {
        window.alert("Success to post checklist!")
        window.location.href = "/"
      } else {
        window.alert("failed")
      }
    })
  }

  const onCheck = (e: React.FormEvent<HTMLInputElement>) => {
    checklist = {
      ...checklist,
      [e.currentTarget.id]: e.currentTarget.checked
    }
  }

  return (
    <IndexLayout>
      <Helmet>
        <title>Quick Start</title>
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
                <PostFullTitle className="post-full-title">
                  <h1>{items.title[listId.title].id}. {items.title[listId.title].name}</h1>
                  <h2>{items.title[listId.title].field[listId.field].id}. {items.title[listId.title].field[listId.field].name}</h2>
                  <h3>{items.title[listId.title].field[listId.field].category[listId.category].id}. {items.title[listId.title].field[listId.field].category[listId.category].name}</h3>
                </PostFullTitle>
              </PostFullHeader>

              <PostFullContent className="post-full-content">
                <div className="post-content">
                  <table>
                    <thead>
                      <th>Id</th>
                      <th>detail</th>
                    </thead>
                    <tbody>
                      {items.title[listId.title].field[listId.field].category[listId.category].item.map(item => {
                        return(
                          <tr>
                            <td>{item.id}</td>
                            <td>{item.detail}</td>
                            <td><input type="checkbox" name="checkbox" id={item.id} onChange={onCheck}></input></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  {listId.title == items.title.length - 1 && listId.field == items.title[items.title.length - 1].field.length - 1 && (
                    <FormButton onClick={submitClick}>Submit</FormButton>
                  )}
                  {(listId.title != items.title.length - 1 || listId.field != items.title[items.title.length - 1].field.length - 1) && (
                    <FormButton onClick={nextClick}>Next</FormButton>
                  )}
                  <FormButton onClick={submitClick}>Submit</FormButton>
                </div>
              </PostFullContent>
            </article>
          </div>
        </main>
        <Footer />
      </Wrapper>
    </IndexLayout>
  );
}

export default quickstart;

const FormButton = styled.button`
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
