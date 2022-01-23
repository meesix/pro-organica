import React from "react";
import { Layout, SEO } from "../components";


const Index = ({ pageContext }) => {

const selector = (      
    <div class="CountryPicker__Selector">
              <a href="/home/">Ukraine</a>
              <a href="https://proorganica.co.uk">United Kindgom</a>
    </div>)

  return (
    <Layout isHome={true} headContent = {selector}>
      <SEO title="Home" description="Homepage for proOrganica" />

    </Layout>
  );
};

export default Index;
