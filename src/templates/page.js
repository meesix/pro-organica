import React from "react";
import PropTypes from "prop-types";
import { SEO, Layout, Image, Section, Grid, Contact as Profile, Card } from "../components";
import PlaceOrderWidget from '../components/PlaceOrderWidget';
import contact_data from '../content/contacts/team.json';

const Page = data => {
  const { content, title, metadata, slug, locale} =
    data.pageContext && data.pageContext.page;

  const contact_list = contact_data[locale][0].metadata.contact_list.contact_list_details;

  return (
    <Layout>
      <SEO title={title} description={metadata.excerpt && metadata.excerpt} />
      <Section>
        <article className="spacing-v-sm">

          <h1 className="page-title">{title && title}</h1>
          <blockquote>{metadata.excerpt && metadata.excerpt}</blockquote>
          { slug === 'about' ? (<div className="videoWrapper mt-1"><iframe title="About ProOrganica" src="https://www.youtube.com/embed/ZRItBquIwQA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div> ) :(<span></span>)}
          {metadata.main_image && slug !== 'about' && (
            <figure className="page-feature-image spacing-v-md">
              <Image
                label={title}
                image={metadata.main_image && metadata.main_image.imgix_url}
              />
            </figure>
          )}
          <section className="page-full-content">
            <section
              className="oad-external-scripts"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </section>
        </article>
      </Section>

      {slug === "about" && 
      (
        <Section id="team" title={contact_data[locale][0].metadata.team_header}>
          <Grid className="grid-secondary spacing-v-lg">
              {contact_list &&
                contact_list.map(
                  ({ card, name, imgix_url, position, email, telephone }, index) => {
                    return (
                      <Card key={`${index}-${name}`}>
                        <>
                          {card ? (
                            // <div>
                            <Image
                              label={`Image of ${name}, ${position} at ProOrganica`}
                              image={imgix_url}
                              styles="border-radius-top"
                            />
                          ) : (
                            // </div>
                            ""
                          )}
                          <Profile
                            name={name}
                            position={position}
                            email={email}
                            telephone={telephone}
                          ></Profile>
                        </>
                      </Card>
                    );
                  }
                )}
            </Grid>
        </Section>

      )}

      <PlaceOrderWidget></PlaceOrderWidget>
    </Layout>
  );
}; 

Page.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
    main_image: PropTypes.string,
  }),
};

export default Page;
