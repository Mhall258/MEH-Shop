// scripts.js

// Initialize the cart array
let cart = [];

// Load cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem('cart');
    cart = storedCart ? JSON.parse(storedCart) : [];
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add an item to the cart
function addToCart(productName, price) {
    const existingItem = cart.find(item => item.name === productName);

    if (existingItem) {
        existingItem.quantity += 1;  // Increase quantity if item already in cart
    } else {
        cart.push({ name: productName, price: price, quantity: 1 });  // Add new item to cart
    }

    saveCart();
    showAddedToCartMessage();  // Display message confirming item was added
}

// Display "added to cart" message

function showAddedToCartMessage() {
    const messageElement = document.getElementById("addedToCart");
    messageElement.classList.remove("hidden");

    setTimeout(() => {
        messageElement.classList.add("hidden");
    }, 2000);
}

// Display cart contents on the cart page
function displayCart() {
    const cartItems = document.querySelector('#cart-items ul');
    cartItems.innerHTML = '';  // Clear existing items
    let total = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('li');

        // Create and append span for item name and price
        const span = document.createElement('span');
        span.textContent = `${item.name} - $${item.price.toFixed(2)} `;
        itemElement.appendChild(span);

        // Create and append input for quantity
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '1';
        quantityInput.value = item.quantity;
        quantityInput.onchange = function() {
            updateQuantity(index, quantityInput.value);
        };
        itemElement.appendChild(quantityInput);

        // Create and append button for removing item
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function() {
            removeItem(index);
        };
        itemElement.appendChild(removeButton);

        // Append item element to cart list
        cartItems.appendChild(itemElement);

        // Calculate total
        total += item.price * item.quantity;
    });

    // Display total price
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.innerText = `Total: $${total.toFixed(2)}`;
}
// Update the quantity of an item in the cart
function updateQuantity(index, quantity) {
    quantity = parseInt(quantity);
    if (quantity > 0) {
        cart[index].quantity = quantity;
        saveCart();
        displayCart();
    }
}

// Remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1);  // Remove the item from the cart array
    saveCart();
    displayCart();
}

 // Simulate checkout action
 function checkout() {
    alert('Checkout feature coming soon!');
}

// Initialize cart on page load
window.onload = function() {
    loadCart();
    displayCart();
};
