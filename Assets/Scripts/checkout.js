document.addEventListener('DOMContentLoaded', () => {
    const summaryList = document.querySelector('.summary-list');
    const totalPriceElement = document.querySelector('.total-price');
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Function to format price
    function formatPrice(price) {
        return '₱' + price.toFixed(2);
    }

    // Function to update total price
    function updateTotalPrice() {
        const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
        totalPriceElement.textContent = formatPrice(totalPrice);
    }

    // Populate order summary with items and images
   // ...

   cartItems.forEach(item => {
    const li = document.createElement('li');
    li.className = 'summary-item';
    li.innerHTML = `
        <div class="summary-item-info">
            <img src="Assets/images/${item.image}" alt="${item.name}" class="summary-item-image">
            <div class="summary-item-details">
                <span>${item.name}</span>
                <span> x ${item.quantity}</span>
            </div>
        </div>
        <span>${formatPrice(item.price)}</span>
    `;
    summaryList.appendChild(li);
});


// ...


    // Update the total price
    updateTotalPrice();
});
