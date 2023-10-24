const products = document.querySelector(".products");

const url_ = "https://fakestoreapi.com/products";
let response;

async function fetchProducts(url) {
  try {
    let data = await fetch(url);
    let response = await data.json();

    response.forEach((product) => {
      let description = product.description;
      let title = product.title;
      products.innerHTML += `
          <div class="card">

            <img src="${product.image}" style="width: 18rem"  alt="...">
            <div class="card-body">

            <h5 class="card-title">${
              title.length > 20
                ? description.substring(0, 20).concat("...")
                : title
            }</h5>

              <div class="product-price-container">
                <h3 class="product-price">$${product.price.toFixed(2)}</h3>
              </div>
              <div class = "btns">
              <input type="submit" value="Add To Cart" dataId="${product.id}">
              </div>
          </div>
        `;
    });
    const addToCartButtons = document.querySelectorAll('input[type="submit"]');
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  } catch (err) {
    console.log(err);
  }
}
function addToCart(event) {
  const productId = event.target.getAttribute("dataId");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const exists = cart.find((item) => item.id === productId);

  if (exists) {
    console.log("item in cart");
  } else {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        cart.push(product);
        console.log("added");

        localStorage.setItem("cart", JSON.stringify(cart));
      })

      .catch((error) => {
        console.error(error);
      });
  }
}

fetchProducts(url_);
