function displayCart() {
    const cartItemsContainer = document.getElementById('cart-item-list');
    const totalPriceElement = document.getElementById('total-price');
    
    cartItemsContainer.innerHTML = '';  // Clear current items
    let total = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('li');
        itemElement.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x 
            <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${index}, this.value)">
            <button onclick="removeItem(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalPriceElement.innerText = `Total: $${total.toFixed(2)}`;
}

// Function to update the quantity of an item in the cart
function updateQuantity(index, quantity) {
    quantity = parseInt(quantity);
    if (quantity > 0) {
        cart[index].quantity = quantity;
        saveCart();
        displayCart();  // Refresh the cart display
    }
}

// Function to remove an item from the cart
function removeItem(index) {
    cart.splice(index, 1);  // Remove item from the cart array
    saveCart();  // Save updated cart to localStorage
    displayCart();  // Refresh cart display
}

// Display cart contents when page loads
window.onload = displayCart;