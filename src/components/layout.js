import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { Link, StaticQuery, graphql } from "gatsby";
import { Navigation, Hero, Image, Header } from ".";
import "../styles/app.css";

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 **/

const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
  const { pathname } = useLocation();
  const currentPage = pathname.split("/");
  const location = currentPage[1];

  return (
    <>
      <Helmet>
        <html lang="en" />
        <body className={bodyClass} />
      </Helmet>

      <div className="viewport">
        <div className="viewport-top">
          {/* The main header section on top of the screen */}
          <header className="site-head">
            <Hero home={isHome}>
              <div className="container">
                <div className="site-mast">
                  <div className="site-mast-left">
                    <Navigation navClass={"site-nav-item"} />
                  </div>
                  <div className="site-mast-right">
                    <Image loading="eager" />
                  </div>
                </div>
                {isHome ? (
                  <div className="site-banner">
                    <Header siteTitle="PROactive PROfessional PROgressive"></Header>
                    <Link
                      className="site-nav-button"
                      to={`${location === "" ? "" : location}/#contact`}
                    >
                      Contact us
                    </Link>
                  </div>
                ) : null}
                <nav className="site-nav">
                  <div className="site-nav-left">
                    <div className="site-foot-nav-left"> </div>
                    {isHome ? <div className="site-nav-item"></div> : ""}
                  </div>
                  <div className="site-nav-right">
                    {" "}
                    <Link
                      className="site-nav-item"
                      to={`/uk-UA/${currentPage[1]}`}
                    >
                      Українська
                    </Link>
                    <Link className="site-nav-item" to={`/`}>
                      English
                    </Link>
                  </div>
                </nav>
              </div>{" "}
            </Hero>
          </header>

          <main className="site-main">
            {/* All the main content gets inserted here, index.js, page.js */}
            {children}
          </main>
        </div>

        <div className="viewport-bottom">
          {/* The footer at the very bottom of the screen */}
          <footer className="site-foot">
            <div className="site-foot-nav container">
              <div className="site-foot-nav-right">
                {/* <Navigation navClass="site-foot-nav-item" /> */}

                <div className="site-foot-row">
                  <div className="site-foot-col">
                    {" "}
                    <strong>About</strong>
                    <p>
                      Formed in 2018, ProOrganica is the latest addition to
                      Chemex's growing portfolio of business ventures focussed
                      on the sourcing, handling, and supplying of organic
                      produce from Ukraine to the.
                    </p>
                  </div>

                  <div className="site-foot-col">
                    <Image fixed />
                    Copyright © 2020 All right reserved by ProOrganica{" "}
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

const DefaultLayoutSettingsQuery = props => (
  <StaticQuery
    query={graphql`
      {
        allCosmicjsPages(filter: { slug: { eq: "home" } }) {
          edges {
            node {
              slug
              locale
              content

              title
              created_by
              created
              metafields {
                imgix_url
              }
              metadata {
                products
                products_table
                excerpt
                who_are_we
                certification
                certification_header
                certification_eu {
                  url
                  imgix_url
                }
                certification_cor {
                  url
                  imgix_url
                }
                certification_uk {
                  imgix_url
                  url
                }
                main_image {
                  url
                  imgix_url
                }
                home_banner_image {
                  url
                  imgix_url
                }
                home_banner_description
                contact_us
                get_in_touch

                contact_details {
                  contact {
                    address {
                      address
                      building
                      city
                      country
                      postcode
                      street
                    }
                    contacts {
                      email
                      name
                      position
                      telephone
                    }
                    country
                    email
                    telephone
                    name
                  }
                }
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
