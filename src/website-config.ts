export interface WebsiteConfig {
  title: string;
  description: string;
  coverImage?: string;
  logo: string;
  /**
   * Specifying a valid BCP 47 language helps screen readers announce text properly.
   * See: https://dequeuniversity.com/rules/axe/2.2/valid-lang
   */
  lang: string;
  /**
   * blog full path, no ending slash!
   */
  siteUrl: string;
  /**
   * full url, no username
   */

  linkedin?: string;
  showSubscribe: boolean;
  /**
   * create a list on mailchimp and then create an embeddable signup form. this is the form action
   */
  mailchimpAction?: string;
  /**
   * this is the hidden input field name
   */
  mailchimpName?: string;
  /**
   * name and id of the mailchimp email field
   */
  mailchimpEmailFieldName?: string;
  /**
  /**
   * Meta tag for Google Webmaster Tools
   */
  googleSiteVerification?: string;
  /**
  /**
   * Appears alongside the footer, after the credits
   */
  footer?: string;
  /**
   * Shows all post tags in main index view and post view if true
   * Otherwise only shows first (primary) tag
   */
  showAllTags: boolean;

  /*
   * backend url입니다.
   */
  backendUrl: string;

  /*
   * bearer token
   */
  bearerToken: string;
}

const config: WebsiteConfig = {
  title: 'ISMS-P',
  description: '정보보안관리시스템',
  coverImage: 'img/blog-cover.png',
  logo: 'img/ISMS-P.png',
  lang: 'en',
  backendUrl: 'https://kangtong1105.codns.com:8000',
  bearerToken: '',
  siteUrl: 'http://localhost:3000',
  linkedin: 'https://isms.kisa.or.kr/main/ispims/notice/',
  showSubscribe: true,
  mailchimpAction: 'https://kangtong1105.codns.com:8000',
  mailchimpName: 'b_a89b6987ac248c81b0b7f3a0f_7d777b7d75',
  mailchimpEmailFieldName: 'MERGE0',
  googleSiteVerification: 'GoogleCode',
  footer: 'is based on Gatsby Casper',
  showAllTags: true,
};

export default config;
