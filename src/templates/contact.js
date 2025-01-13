import React from "react";
import {
  Layout, 
  Section,
  SEO,
} from "../components";
import Form from "../components/Form";


const Contact = ({ pageContext }) => {
  const { data } = pageContext;

  const [
    {
      metadata: { get_in_touch, get_in_touch_header },
    },
  ] = data;

  
  return (
    <Layout>
      <SEO
        title={"Contact"}
        description={"Contact page for ProOrganica UK and Ukraine"}
      />
      <Section
        id="contact"
        description={get_in_touch}
        title={get_in_touch_header}
        className="flex-center-horizontal flex-center-vertical"
      >
<div class="grid-contacts">
<div className="flex flex-column">
  <span class="footer-address-header">Ukraine</span>
  <span>ProOrganica</span>
  <span>LIMITED LIABILITY COMPANY "CHEMEX LIMITED"</span>
  <span>Naberezhno-Luhova Str. 12</span>
  <span>Kyiv 04071, Ukraine</span>
  <br/>
  <span><a href="mailto:info@proorganica.com">info@proorganica.com</a></span>
  <span><a href="tel:+380 67 544-93-37">+380 67 544-93-37</a></span>
  <br/>
</div>

<div className="flex flex-column">
  <span class="footer-address-header">UK Distribution</span>
  <span>ProOrganica Limited</span>
  <span>10 Buncer Lane</span>
  <span>Blackburn, BB2 6SE</span>
  <span>United Kingdom</span>
  <br/>
  <span><a href="mailto:info@proorganica.co.uk">info@proorganica.co.uk</a></span>
  <span><a href="tel:+44 1254 671417">+ 44 1254 671417</a></span>
</div>

<div className="flex flex-column">
  <span class="footer-address-header">EU Distribution</span>
  <span>Coming soon</span>
</div>
</div>

      <Form></Form>

      </Section>
    </Layout>
  );
};

export default Contact;
