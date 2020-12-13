import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

const Header = () => {
  const data = useStaticQuery(graphql`
    query getWhiteLogoForHeader {
      file(relativePath: { regex: "/proorganica-logo-white.png/" }) {
        childImageSharp {
          fluid(maxWidth: 700) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  return <Img fluid={data.file.childImageSharp.fluid} />;
};

export default Header;
