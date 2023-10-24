// cart.js
const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total-price");

const cart = {
  items: [],
  total: 0,
};
//display products on cart.html
function updateCartDisplay() {
  // Retrieve the cart from localStorage
  const savedCart = JSON.parse(localStorage.getItem("cart"));

  if (savedCart === null || savedCart.length === 0) {
    cartItems.innerHTML = "Your cart is empty";
  } else {
    cart.items = savedCart; // Set cart items from the saved cart
    cartItems.innerHTML = ""; // Clear the cart display
    cart.total = 0;

    cart.items.forEach((item) => {
      //  response.forEach((product) => {
      //   let description = product.description;
      //   let title = product.title;
      const listItem = document.createElement("li");
      listItem.innerHTML = `
          <div class="card">
            <img src="${item.image}"  alt="...">
            <div class="card-body">

            <h5 class="card-title">${
              item.title.length > 20
                ? item.title.substring(0, 20).concat("...")
                : item.title
            }</h5>

              <div class="product-price-container">
                <h3 class="product-price">$${item.price.toFixed(2)}</h3>
              </div>
              </div>
          </div>
        `;
      cartItems.appendChild(listItem);
      cart.total += item.price;
    });

    // });

    totalDisplay.textContent = `$${cart.total.toFixed(2)}`;
  }
}

// Call the function to update the cart display when the cart page loads
updateCartDisplay();
