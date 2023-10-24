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
    const uniqueItems = new Map();

    cart.items.forEach((item) => {
      if (uniqueItems.has(item.id)) {
        const existingItem = uniqueItems.get(item.id);
        existingItem.quantity++;
      } else {
        uniqueItems.set(item.id, { ...item, quantity: 1 });
      }
    });
    uniqueItems.forEach((item) => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
            <div class="card">
                <img src = "${item.image} alt="...">
                <div class="card-body">
                <h5 class="card-title">${
                  item.title.length > 20
                    ? item.title.substring(0, 20).concat("...")
                    : item.title
                }</h5>
                <div class = "product-price-container">
                    <h3 class = "poduct-price">$$(item.price * item.quantity).toFixed(2)}</h3>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            </div>
        </div>
        `;
      cartItems.appendChild(listItem);
      cart.total += item.price * item.quantity;
    });

    totalDisplay.textContent = `$${cart.total.toFixed(2)}`;
  }
}

// Call the function to update the cart display when the cart page loads
updateCartDisplay();
