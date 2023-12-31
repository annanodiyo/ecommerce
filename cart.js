const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total-price");
// const reduceQuantity = document.getElementById("decrease");
const cart = {
  items: [],
  total: 0,
};

//display products
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
                <div class="pro_Image">
                    <img src = "${item.image}" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <div class = "product-price-container">
                    <h3 class = "poduct-price">$${item.price.toFixed(2)}</h3>
                      <p>Quantity: </p>
                      <div>
                      <input type="submit" id="decrease" value="-">
                      <input type="number" min="1" value="${
                        item.quantity
                      }" id ="qnty-${item.id}">
                      <input type ="submit" id ="add" value ="+">
                      </div>
                      <input type="submit" value="Remove from cart" class="remove">
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

//reducing and increasing items

const addButtons = document.querySelectorAll("#add");
const decreaseButtons = document.querySelectorAll("#decrease");

addButtons.forEach((addButton, index) => {
  addButton.addEventListener("click", (e) => {
    const quantityInput = document.getElementById(
      `qnty-${cart.items[index].id}`
    );
    if (quantityInput) {
      const currentValue = parseInt(quantityInput.value);
      quantityInput.value = currentValue + 1;
    }
  });
});

decreaseButtons.forEach((decreaseButton, index) => {
  decreaseButton.addEventListener("click", (e) => {
    const quantityInput = document.getElementById(
      `qnty-${cart.items[index].id}`
    );
    if (quantityInput) {
      const currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    }
  });
});
