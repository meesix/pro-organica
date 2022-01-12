import React from "react";
import { Layout, Section, Grid, Links, Image, SEO } from "../components";
import PlaceOrderWidget from "../components/PlaceOrderWidget";

const Certification = ({ pageContext = {} }) => {
  if (!pageContext) return;

  const postData = pageContext.data[0].metadata;

  return (
    <Layout>
      <SEO
        title={postData.header}
        description={postData.content}
      />

      <Section title={postData.header} description={postData.content}>
        <Grid className="grid-tertiary spacing-v-lg">
              {Object.keys(postData.affiliates_list).map((index) => {
                if (postData.affiliates_list[index].pdf) {
                  return (
                    <Links
                    key={index}
                    alt={index}
                    href={postData.affiliates_list[index].pdf}
                    target="_blank"
                    className="DownloadImage"
                  >
                      <Image image={postData.affiliates_list[index].img} />
                    </Links>
                  )
                } else {
                    return (<Image key={index} alt={index} image={postData.affiliates_list[index].img} />);
                }
              }
            )}
        </Grid>
      </Section>
      <PlaceOrderWidget></PlaceOrderWidget>
    </Layout>
  );
};

export default Certification;
