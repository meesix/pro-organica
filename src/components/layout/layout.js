import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { StaticQuery, graphql } from "gatsby";
import { buildLink } from "../../utils/helper";
import LanguageSelector from '../LanguageSelector';

import { Navigation, Hero, Section, Grid, Footer, Links } from "..";
import "../../styles/app.css";

const DefaultLayout = ({ children, bodyClass, isHome, data, headContent }) => {
  const [overlay, setOverlay] = useState(false);
  const { pathname } = useLocation();
  let currentPage = pathname.split("/");

  const locale = currentPage.some(i => i === "uk-UA");
  const currentLocale = locale ? "uk-UA" : "en-GB";
  const ukrainian = pathname.includes("uk-UA");

  const localize = obj => {
    return obj.edges.filter(i => i.node.locale.includes(currentLocale));
  };

  const { allPages } = data;
  const pages = localize(allPages);
  
  const filterHomePage = pages.map(i => {
    if (i.node.title === "Home") {
      i.node.slug = "home";
    }

    if (i.node.slug === "why-ukraine") {
      i.node.title = ukrainian ? "Наша команда":"Our team";
      i.node.slug = "about#team";
    }
    return i;
  }).sort( (a,b)=> {
    if (a.node.title === 'Home') {
      return -1;
    }
    return 1;
  })

  return (
    <>
      <Helmet>
        <html lang={ukrainian?'ua':'en-GB'} />
        <body className={bodyClass} />
      </Helmet>

      <header className={`header ${isHome?"headerHome":""}`}>

        <Hero home={isHome} headContent={headContent} opacity={overlay}>
          <Section>
            <div className="HomeHero__Nav flex flex-center flex-space-between">
              <Navigation
                setBackgroundOpacity={() => setOverlay(!overlay)}
                overlay={overlay}
                location={locale}
              />

              <LanguageSelector locale={currentLocale} page={pathname} />

            </div>
          </Section>
        </Hero>

        {headContent}

      </header>

      <main>{children}</main>

      <Footer>
        <Section spacing="v-md">
          <Grid className="grid-footer">
            <div className="flex flex-column">
              {" "}
              {filterHomePage.map((i, key) => (
                <span key={key}>
                  <Links
                    internal
                    styling="a-white"
                    href={buildLink(i.node.slug)}
                  >
                    {i.node.title}
                  </Links>
                </span>
              ))}
              <Links internal styling="a-white" href={`/certification`}>
                {ukrainian ? "Сертифікація" : "Certification"}
              </Links>
              <Links internal styling="a-white" href="/contact">
                {ukrainian ? "Контакти" : "Contact"}
              </Links>

            </div>
            <div className="flex flex-column a-white footer-address">
                <span class="footer-address-header">Ukraine</span>
                <span><a class="a-white" href="mailto:info@proorganica.com">info@proorganica.com</a></span>
                 <span><a class="a-white" href="tel:+380 67 544-93-37">+380 67 544-93-37</a></span>
            </div>
            <div className="flex flex-column a-white footer-address">
                <span class="footer-address-header">UK Distribution</span>
                <span><a class="a-white" href="mailto:info@proorganica.co.uk">info@proorganica.co.uk</a></span>
                <span><a class="a-white" href="tel:+380 67 544-93-37">+ 44 1254 671 41</a></span>
            </div>
            <div className="flex flex-column a-white footer-address">
                <span class="footer-address-header">EU Distribution</span>
                <span>Coming soon</span>
            </div>
          </Grid>
          <div className="flex footer-rights-reserved-container">
            {" "}
            <small className="footer-rights-reserved spacing">
              <span>
                {" "}
                ProOrganica © {new Date().getFullYear()} All rights reserved.
              </span>
            </small>
          </div>
        </Section>
      </Footer>
    </>
  );
};

const DefaultLayoutSettingsQuery = props => (
  <StaticQuery
    query={graphql`
      {
        allPages: allCosmicjsPages {
          edges {
            node {
              slug
              title
              locale
            }
          }
        }
        whiteProOrganicaLogo: file(
          relativePath: { regex: "/proorganica-logo-white.png/" }
        ) {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }

        home: allCosmicjsPages(filter: { slug: { eq: "home" } }) {
          edges {
            node {
              slug
              locale
              content
              title
              metadata {
                contact_button
              }
            }
          }
        }
      }
    `}
    render={data => <DefaultLayout data={data} {...props} />}
  />
);

export default DefaultLayoutSettingsQuery;
