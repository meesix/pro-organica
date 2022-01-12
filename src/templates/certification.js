import React from "react";
import { Layout, Section, Grid, Links, Image, SEO } from "../components";
import PlaceOrderWidget from "../components/PlaceOrderWidget";

const Certification = ({ pageContext = {} }) => {
  if (!pageContext) return;
  const { data } = pageContext;
  const [
    {
      metadata: { affiliates, affiliates_list, affiliate_header },
    },
  ] = data;

  const {
    logo_organic_food_federation,
    pdf_organic_food_federation,
    logo_bio_suisse,
    pdf_bio_suisse,
    logo_organic_standard,
    pdf_organic_standard,
    logo_organic_eu,
    logo_organic_ukraine,
  } = affiliates_list;

  const federation = [
    logo_organic_food_federation,
    pdf_organic_food_federation,
  ];

  const suisse = [
    logo_bio_suisse,
    pdf_bio_suisse,
  ];
  
  const standard = [logo_organic_standard, pdf_organic_standard];

  const affiliateList = [
    standard,
    federation,
    suisse,
    logo_organic_eu,
    logo_organic_ukraine,
  ];

  return (
    <Layout>
      <SEO
        title={"Certification"}
        description={"Certification page with downloadable pdf certificates"}
      />

      <Section title={affiliate_header} description={affiliates}>
        <Grid className="grid-tertiary spacing-v-lg">
          {affiliateList.map((certs, index) => (
            <>
              {certs.length ? (
                <Links
                  key={index}
                  alt={`ProOrganica certifications`}
                  href={certs[1]?.imgix_url}
                  target="_blank"
                >
                  <Image image={certs[0]?.imgix_url} />
                </Links>
              ) : (
                <Image key={index} image={certs?.imgix_url} />
              )}
            </>
          ))}
        </Grid>
      </Section>
      <PlaceOrderWidget></PlaceOrderWidget>
    </Layout>
  );
};

export default Certification;
