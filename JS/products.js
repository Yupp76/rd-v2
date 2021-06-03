const endpoint = "https://jsolutions.no/wp-json/wc/store/products";

const featuredList = document.querySelector("#products-list-3");
const productsList = document.querySelector("#products-list");

let pathname = window.location.pathname;
let products = [];

fetch(endpoint)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    products = data;
    renderPipeline(products);
  })
  .catch((err) => {
    console.log(err);
  });

/**
 * finds products that have 'Featured' tag and returns them
 */

function findFeatured(products) {
  let featuredProducts = [];

  products.forEach((prod) => {
    if (prod.tags.length > 0) {
      for (let tag of prod.tags) {
        let tagExists = Object.values(tag).includes("Featured");
        tagExists ? featuredProducts.push(prod) : null;
      }
    }
  });

  return featuredProducts;
}

/**
 * Outputs UI for HOME PAGE
 */

function homePageUI(product, node) {
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "product-cards-wrapper";

  const cardCover = document.createElement("img");
  cardCover.setAttribute("alt", "rain-jacket");
  cardCover.setAttribute("width", "250px");
  cardCover.setAttribute("src", product.images[0].src);

  const cardText = document.createElement("div");
  const cardTextPara = document.createElement("p");
  cardText.className = "product-card-text";
  cardTextPara.className = "paragraph";
  cardTextPara.innerHTML = product.short_description;

  const cardTextAnchor = document.createElement("a");
  cardTextAnchor.innerHTML = "See product <span>&#8594;</span>";
  cardTextAnchor.setAttribute("href", `/product-details.html?id=${product.id}`);

  cardText.appendChild(cardTextPara);
  cardText.appendChild(cardTextAnchor);

  cardWrapper.appendChild(cardCover);
  cardWrapper.appendChild(cardText);

  node.appendChild(cardWrapper);
}

/**
 * Output UI for PRODUCTS PAGE
 */

function productsPageUI(product, node) {
  let cardWrapper = document.createElement("a");
  cardWrapper.setAttribute("href", `/product-details.html?id=${product.id}`);

  let cardInfoWrapper = document.createElement("div");
  cardInfoWrapper.className = "product-card";

  let cardProductImage = document.createElement("img");
  cardProductImage.className = "card-image-cover";
  cardProductImage.setAttribute("src", product.images[0].src);

  let cardProductName = document.createElement("h2");
  cardProductName.innerHTML = product.name;

  let cardProductDesc = document.createElement("p");
  cardProductDesc.innerHTML = product.short_description;

  let cardFooter = document.createElement("div");
  cardFooter.className = "product-card-footer";

  let cardProductPrice = document.createElement("span");
  cardProductPrice.innerHTML =
    product.prices.price + product.prices.currency_prefix;

  let cardProductRatings = document.createElement("ul");
  cardProductRatings.innerHTML =
    '<li><img src="/IMG/Icon_5.png"></li><li><img src="/IMG/Icon_5.png"></li><li><img src="/IMG/Icon_5.png"></li><li><img src="/IMG/Icon_6.png"></li><li><img src="/IMG/Icon_6.png"></li>';

  cardFooter.appendChild(cardProductPrice);
  cardFooter.appendChild(cardProductRatings);

  cardInfoWrapper.appendChild(cardProductImage);
  cardInfoWrapper.appendChild(cardProductName);
  cardInfoWrapper.appendChild(cardProductDesc);
  cardInfoWrapper.appendChild(cardFooter);

  cardWrapper.appendChild(cardInfoWrapper);

  node.appendChild(cardWrapper);
}

/**
 * conditionally outputs UI for the right page
 */
function renderPipeline(products) {
  const featuredProds = findFeatured(products);

  if (pathname.includes("index.html")) {
    featuredProds.forEach((product) => {
      homePageUI(product, featuredList);
    });
  } else if (pathname.includes("product.html")) {
    products.forEach((product) => {
      productsPageUI(product, productsList);
    });
  }
}
