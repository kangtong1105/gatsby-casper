import React from 'react';
import { Helmet } from 'react-helmet';

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

function About() {
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
                <PostFullTitle className="post-full-title">ISMS</PostFullTitle>
              </PostFullHeader>

              <PostFullContent className="post-full-content">
                <div className="post-content">
                  <h5>
                  ISMS-P 인증기준안내서 <br /> Link:{' '}
                    <a href="https://isms.kisa.or.kr/main/ispims/notice/">ISMS-P 인증기준안내서</a>
                  </h5>
                  <h2>ISMS-P란? </h2> 
                  <h6>'정보보호 및 개인정보보호 관리체계 인증'으로 정보보호 및 개인정보보호를 위한 일련의 조치와 활동이 인증기준에 적합함을 인터넷진흥원 또는 인증기관이 증명하는 제도이다.</h6>
          
                  <p>
                  정보보호 및 개인정보보호 관리체계 인증기준은 크게 <br/>
                  '1. 관리체계 수립 및 운영'<br/>
                  '2. 보호대책 요구사항'<br/>
                  '3. 개인정보 처리 단계별 요구사항' <br/>
                  3개 영역에서 총 102개의 인증기준으로 구성되어 있다.<br/> 정보보호 관리체계(ISMS) 인증을 
받고자 하는 신청기관은 '1. 관리체계 수립 및 운영', '2. 보호대책 요구사항' 2개 영역에서 80개의 인증기준을 적용받게 
되며, 정보보호 및 개인정보보호 관리체계(ISMS-P) 인증을 받고자 하는 신청기관은 '3. 개인정보 처리 단계별 요구사항'을 
포함하여 102개의 인증기준을 적용받게 된다.
 <img src="img\testimg1.jpg" alt="My Image"></img>

<h6>정보보호 및 개인정보보호 관리체계 인증기준 구성</h6>
1. 관리체계 수립 및 운영 (16개)<br/>
&ensp;1. 관리체계 기반 마련<br/>
&ensp;2. 위험 관리<br/>
&ensp;3. 관리체계 운영<br/>
&ensp;4. 관리체계 점검 및 계선<br/>
2. 보호대책 요구사항 (64개)<br/>
&ensp;1. 정책, 조직, 자산 관리<br/>
&ensp;2. 인적 보안<br/>
&ensp;3. 외부자 <br/>
&ensp;4. 물리 보안<br/>
&ensp;5. 인증 및 권한관리<br/>
&ensp;6. 접근통제<br/>
&ensp;7. 암호화 적용<br/>
&ensp;8. 정보시스템 도입 및 개발 보안<br/>
&ensp;9. 시스템 및 서비스 운영관리<br/>
&ensp;10. 시스템 및 서비스 보안관리<br/>
&ensp;11.  사고 예방 및 대응<br/>
&ensp;12. 재해 복구<br/>
3. 개인정보 처리 단계별 요구사항(22개)<br/>
&ensp;1. 개인정보 수집 시 보호조치<br/>
&ensp;2. 개인정보 보유 및 이용 시 보호조치<br/>
&ensp;3. 개인정보 제공 시 보호조치<br/>
&ensp;4. 개인정보 파기 시 보호조치<br/>
&ensp;5. 정보주체 권리보호
                  </p>
                  
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

export default About;
