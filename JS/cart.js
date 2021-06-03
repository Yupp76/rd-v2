const endpoint = "https://jsolutions.no/wp-json/wc/store/products"

const productTotal = document.querySelector("#total");
const productAmount = document.querySelector("#amount");
const productAmountTxt = document.querySelector("#amount-text");
const minusBtn = document.querySelector("#minus");
const plusBtn = document.querySelector("#plus");
const cartItemWrapper = document.querySelector("#cart-table-wrapper");
const productImg = document.querySelector("#prod-img");
const productName = document.querySelector("#prod-name");

const checkoutProducts = document.querySelector("#products-total");
const checkoutDelivery = document.querySelector("#delivery-total");
const checkoutTotal = document.querySelector("#pricing-total");

const maxAmount = 15;
const deliveryPrice = 25.0;

fetch(endpoint+"/"+findID())
  .then((res) => {
    return res.json();
  })
  .then((product) => {
    console.log(product)
    productImg.src = product.images[0].src;
    productName.innerHTML = product.name;
  })
  .catch((err) => {
    console.log(err);
  });

function getQueryData() {
  const queryString = window.location.search;
  const params = new URLSearchParams(queryString);
  const queryAmount = params.get("amount");
  const queryUnitPrice = params.get("unit-price");

  if (queryAmount !== null && queryUnitPrice !== null) {
    productAmount.innerHTML = queryAmount;

    const amount = parseInt(queryAmount);
    const price = parseInt(queryUnitPrice).toFixed(2);

    pricesCalculator(amount, price, deliveryPrice);

    const result = { amount, price };

    return result;
  } else {
    cartItemWrapper.innerHTML =
      '<p class="empty-cart">Empty cart, no products added yet</p>';

    pricesCalculator(0, 0, 0);
  }
}

document.addEventListener("DOMContentLoaded", () => getQueryData());

minusBtn.addEventListener("click", function () {
  const currentAmount = parseInt(productAmount.innerHTML);

  if (currentAmount !== 1) {
    const newAmount = currentAmount - 1;
    const unitePrice = getQueryData().price;

    productAmount.innerHTML = newAmount;
    pricesCalculator(newAmount, unitePrice, deliveryPrice);
  }
});

plusBtn.addEventListener("click", function () {
  const currentAmount = parseInt(productAmount.innerHTML);

  if (currentAmount < maxAmount) {
    const newAmount = currentAmount + 1;
    const unitePrice = getQueryData().price;

    productAmount.innerHTML = newAmount;
    pricesCalculator(newAmount, unitePrice, deliveryPrice);
  }
});

function pricesCalculator(currAmount, unitPrice, deliveryPrice) {
  let totalPrice = unitPrice * currAmount;

  productTotal.innerHTML = totalPrice.toFixed(2);
  checkoutProducts.innerHTML = totalPrice.toFixed(2);

  checkoutDelivery.innerHTML = deliveryPrice.toFixed(2);
  checkoutTotal.innerHTML = (totalPrice + deliveryPrice).toFixed(2);

  if (currAmount === 1 && productAmountTxt.innerHTML !== "unit") {
    productAmountTxt.innerHTML = "unit";
  }
  if (currAmount > 1 && productAmountTxt.innerHTML !== "units") {
    productAmountTxt.innerHTML = "units";
  }
}
