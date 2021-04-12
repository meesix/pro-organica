const langs = ["en-GB", "uk-UA"];
const defaultLanguage = "en-GB";

const path = require(`path`);
const {
  localizeUrl,
} = require("./src/utils/localization");


const homePage = path.resolve(`./src/templates/index.js`);
const contentPage = path.resolve(`./src/templates/page.js`);
const contactPage = path.resolve(`./src/templates/contact.js`);
const teamPage = path.resolve(`./src/templates/team.js`);
const certificationPage = path.resolve(`./src/templates/certification.js`);
const productsPage = path.resolve(`./src/templates/products.js`);
const singleProductPage = path.resolve(`./src/templates/single_product.js`);

const teamLocalized = require(`./src/content/contacts/team.json`);
const contactsLocalized = require(`./src/content/contacts/contacts.json`);

const homeLocalized = require(`./src/content/home/home.json`);
const certificationLocalized = require(`./src/content/certification/certification.json`)
const contentLocalized = require(`./src/content/content.json`);
const productsLocalized = require(`./src/content/products/products.json`);

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  langs.forEach(language => {
    // Create localized data for the home page
    createPage({
      path: localizeUrl(language, defaultLanguage, `/`),
      component: homePage,
      context: {
        home: homeLocalized[language],
        pages: contentLocalized[language],
      },
    });
    // Create certificiation page
    createPage({
      path: localizeUrl(language, defaultLanguage, `/certification`),
      component: certificationPage,
      context: {
        certification: certificationLocalized[language],
      },
    });
    // Create contact page
    createPage({
      path: localizeUrl(language, defaultLanguage, `/contact`),
      component: contactPage,
      context: {
        contact: contactsLocalized[language],
      },
    });


    createPage({
      path: localizeUrl(language, defaultLanguage, `/our-team`),
      component: teamPage,
      context: {
        contact: teamsLocalized[language],
      },
    });

    // Create content pages (dynamically produced based on cosmic pages)
    [contentLocalized].forEach(pageData => {
      let parse = JSON.parse(JSON.stringify(pageData));
      // get lang specific page slug out of page data object
      for (const [key, value] of Object.entries(parse)) {
        value
          .filter(i => i.locale === language)
          .forEach(i => {
            if (i.slug === 'products') return;
            createPage({
              path: localizeUrl(language, defaultLanguage, `/${i.slug}`),
              component: contentPage,
              context: {
                page: i,
              },
            });
          });
      }
    });

    // Create products page
    createPage({
      path: localizeUrl(language, defaultLanguage, `/products`),
      component: productsPage,
      context: {
        products: productsLocalized[language],
      },
    });
    
    [productsLocalized].forEach(productsData => {
      let parse = JSON.parse(JSON.stringify(productsData));
      // get lang specific page slug out of page data object
      for (const [key, value] of Object.entries(parse)) {
        value
          .filter(i => i.locale === language)
          .forEach(i => {
            if (i.metadata === null || i.metadata.products_shop === null) return;
            i.metadata.products_shop.forEach( e => {
              createPage({
                path: localizeUrl(i.locale, defaultLanguage, `/products/${e.id}`),
                component: singleProductPage,
                context: {
                  product: e,
                  parent: i,
                },
              });
            });
 
          });
      }
    });

  });
};
