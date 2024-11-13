
function showAddedToCartMessage() {
    const messageElement = document.getElementById("addedToCart");
    messageElement.classList.remove("hidden");

    setTimeout(() => {
        messageElement.classList.add("hidden");
    }, 2000);
}