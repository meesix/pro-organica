import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import { window } from "browser-monads";
import { buildLink } from "../../utils/helper";

const NavItem = styled(Link)`
  text-decoration: none;
  color: #ffffff;
  display: inline-block;
  white-space: nowrap;
  margin: 0 1vw;
  transition: all 200ms ease-in;
  position: relative;
  font-weight: 600;
  font-size: 3.7rem;
  padding-top: 20px;

  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0%;
    content: ".";
    color: transparent;
    background: #ffffff;
    height: 2px;
    transition: all 0.4s ease-in;
  }

  @media (max-width: 1300px) {
    font-size: 2.5rem;
    z-index: 6;
  }
`;

const NavbarLinks = ({ pages }) => {
  const ukrainian = window.location.pathname.includes("uk-UA");
  return (
    <>
      <NavItem to={buildLink('')}>{ukrainian ? "Головна" : "Home"}</NavItem>
      <NavItem to={buildLink('contact')}>{ukrainian ? "Контакти" : "Contact"}</NavItem>
      <NavItem to={buildLink('certification')}>
        {ukrainian ? "Органічні сертифікати" : "Certification"}
      </NavItem>
      <NavItem to={buildLink('about#team')}>{ukrainian ? "Наша команда" : "Our team"}</NavItem>

      {pages
        .filter(i => i.slug !== "home")
        .map((navItem, i) => {
          return (
            <NavItem
              // HACKY: check to see whether Ukrainan in the url and then append uk-UA / leave empty for GB
              to={buildLink(`${navItem.slug}`)}
              key={i}
              aria-current={navItem.title}
            >
              {navItem.title}
            </NavItem>
          );
        })}
    </>
  );
};

export default NavbarLinks;
