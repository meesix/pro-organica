import React from "react";
import { Layout, SEO, Grid, Section, Image, Card, Links } from "../components";
import findImageOwner from "../utils/helper";
import PlaceOrderWidget from '../components/PlaceOrderWidget';
import { useLocation } from "@reach/router";

const Index = ({ pageContext }) => {

  const { pathname } = useLocation();
  const ukrainian = pathname.includes("uk-UA");

  const [
    {
      metadata: {
        home_banner_description,
        products,
        what_do_we_do_header,
        product_header,
        products_list,
      },
    },
  ] = pageContext.data;
   
  const productList = products_list?.product_list_details.sort((a, b) => {
    return a.order < b.order ? -1 : a.order > b.order ? 1 : 0;
  });

  return (
    <Layout isHome={true}>

      <SEO title="Home" description="Homepage for proOrganica" />
      <Section
        description={home_banner_description}
        title={what_do_we_do_header}
      > 
        <Grid className="grid-primary">
          {pageContext.data[0].pages.map(({ title, locale, slug, image }, index) => {

            return slug !== 'products' && (
              <Links 
                internal
                styling="a-black"
                href={`/${locale}/${slug}`.replace("/en-GB", "")}
                key={`${index}-${title}`}
              >
                <Card
                  styling="text-align-center"
                  title={title}
                  className={"animate-hover"}
                  arrow
                  href={`/${locale}/${slug}`.replace("/en-GB", "")}
                >
                  <Image
                    image={image}
                    alt="Links to content pages"
                    styles="border-radius-top"
                  />
                </Card>{" "}
              </Links>
            );
          })}
        </Grid>
      </Section>

      <div className="PlaceOrderWidget">
      <hr/>
        <p>{!ukrainian?"Subscribe to newsletter":"Підписатися на розсилку"}</p>
        <a target="_blank" href="https://3059a940.sibforms.com/serve/MUIEAJoFQAu6EO3PTKVpV_obQCNVcSUYmEAG-7eAU9ldBXLvyO9sP9PdHGedcwm94mI7mj47Iy1UyKFxl0Ha0pHc9Jx8cqcY6_93MANp9h8-m85jnET-oWLRG4Uob9UoJBfKcpZDCu7J-zJYLagE0ReuK6x0IraKdtIt8Xb7SJHLHOo35e2ZqsKJsXDcG-GH4z2haRTkrFsmS4Mc" className="PlaceOrder max-width"><h1>{!ukrainian?"Subscribe":"Підписатися"}</h1></a>
      </div>

      <Section description={products} title={product_header}>

        <Grid className="grid-primary" id="products" >
          {products_list &&
            productList &&
            findImageOwner(productList, products_list).map(
              ({ name, image, description, action }, index) => {

                if (index === 0) {
                  return (
                    <Links
                    internal
                    styling="a-black"
                    href={`products/`.replace("/en-GB", "")}
                    key='products'
                     >
                      <Card
                        href="contact"
                        button={action}
                        label={description}
                        key={`${index}-${name}`}
                        description={action ? "" : description}
                        title={name}
                      >
                        <Image
                          label={`${name} image`}
                          styles="border-radius-top"
                          image={image && image?.imgix_url}
                        />
                      </Card>
                    </Links>
                  );
                } else {
                  return (
                    <Card
                      button={action}
                      href={pageContext.data[0].locale === 'en-GB' ? '/contact' : 'https://proorganica.prom.ua/ua/'}
                      label={description}
                      key={`${index}-${name}`}
                      description={action ? "" : description}
                      title={name}
                    >
                      <Image
                        label={`${name} image`}
                        styles="border-radius-top"
                        image={image && image?.imgix_url}
                      />
                    </Card>
                  );
                }
              }
            )}
        </Grid>
      </Section>

      <PlaceOrderWidget></PlaceOrderWidget>

    </Layout>
  );
};

export default Index;
