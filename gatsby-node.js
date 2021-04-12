const langs = ["en-GB", "uk-UA"];
const defaultLanguage = "en-GB";

const path = require(`path`);
const {
  localizeUrl,
} = require("./src/utils/localization");

const pages = [
  {id:'home', slug:'/', component : path.resolve(`./src/templates/index.js`), data: require(`./src/content/home/home.json`)},
  {id:'contact', slug:'contact', component : path.resolve(`./src/templates/contact.js`), data: require(`./src/content/contacts/contacts.json`)},
  {id:'certification', slug:'certification', component : path.resolve(`./src/templates/certification.js`), data: require(`./src/content/certification/certification.json`)},
  {id:'team', slug:'our_team', component : path.resolve(`./src/templates/team.js`), data: require(`./src/content/contacts/team.json`)},
];

const contentPage = path.resolve(`./src/templates/page.js`);
const productsPage = path.resolve(`./src/templates/products.js`);
const singleProductPage = path.resolve(`./src/templates/single_product.js`);
const productsLocalized = require(`./src/content/products/products.json`);
const contentLocalized =  require(`./src/content/content.json`);


exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  langs.forEach(language => {
    // Create localized data for the home page

    pages.forEach( page => {
        createPage({
          path: localizeUrl(language, defaultLanguage, page.slug),
          component: page.component,
          context: {
            'data' : page.data[language],
          },
        });
    })

  contentLocalized[language].forEach(page => {

    createPage({
      path: localizeUrl(language, defaultLanguage, `/${page.slug}`),
      component: contentPage,
      context: {
        page,
      },
    });
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
