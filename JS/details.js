const endpoint = "https://jsolutions.no/wp-json/wc/store/products";

const minusBtn = document.querySelector("#minus");
const plusBtn = document.querySelector("#plus");
const amount = document.querySelector("#amount");
const cartBtn = document.querySelector("#add-to-cart");
const image = document.querySelector("#product-image");
const name = document.querySelector("#product-name");
const description = document.querySelector("#product-desc");
const price = document.querySelector("#product-price");

const maxAmount = 15;

let product = null;

fetch(endpoint+"/"+findID())
  .then((res) => {
    return res.json();
  })
  .then((product) => {
    image.src = product.images[0].src;
    name.innerHTML = product.name;
    description.innerHTML = product.description;
    price.innerHTML = product.prices.price + product.prices.currency_prefix;
    cartBtn.href = `cart.html?id=${findID()}&amount=1&unit-price=150.00`;
  })
  .catch((err) => {
    console.log(err);
  });

minusBtn.addEventListener("click", function () {
  const currentAmount = parseInt(amount.innerHTML);

  if (currentAmount !== 1) {
    amount.innerHTML = currentAmount - 1;
    cartBtn.href = `cart.html?id=${findID()}&amount=${currentAmount + 1}&unit-price=150.00`;
  }
});

plusBtn.addEventListener("click", function () {
  const currentAmount = parseInt(amount.innerHTML);

  if (currentAmount < maxAmount) {
    amount.innerHTML = currentAmount + 1;
    cartBtn.href = `cart.html?id=${findID()}&amount=${currentAmount + 1}&unit-price=150.00`;
  }
});
