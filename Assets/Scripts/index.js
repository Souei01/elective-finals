let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCart = document.querySelector('.listCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
});

let products = [
    {
        id: 1,
        name: 'Chicken Burger',
        image: '1.png',
        price: 89
    },
    {
        id: 2,
        name: 'Beef Burger',
        image: '2.png',
        price: 99
    },
    {
        id: 3,
        name: 'Chicken Sisig',
        image: '3.png',
        price: 160
    },
    {
        id: 4,
        name: 'Petcho Inasal',
        image: '4.png',
        price: 120
    },
    {
        id: 5,
        name: 'Pierna Inasal',
        image: '5.png',
        price: 110
    },
    {
        id: 6,
        name: 'Fried Chicken',
        image: '6.png',
        price: 110
    },
    {
        id: 7,
        name: 'Knicker Bocker',
        image: '7.png',
        price: 99
    },
    {
        id: 8,
        name: 'Halo Halo',
        image: '8.png',
        price: 99
    },
    {
        id: 9,
        name: 'fries',
        image: '9.png',
        price: 65
    },
    {
        id: 10,
        name: 'Fruit Soda',
        image: '10.png',
        price: 65
    },
    {
        id: 11,
        name: 'Pancit Sotanghon',
        image: '11.png',
        price: 225
    },
    {
        id: 12,
        name: 'Pancit Miki',
        image: '12.png',
        price: 170
    }
];
// Retrieve cart content from localStorage on page load or initialize an empty array if not present
let listCarts = JSON.parse(localStorage.getItem('cartItems')) || [];


function initApp() {
    products.forEach((product, index) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        if (product.id <= 2) {
            newDiv.dataset.category = "Burger";
        } else if (product.id <= 6) {
            newDiv.dataset.category = "Meal";
        } else if (product.id <= 10) {
            newDiv.dataset.category = "Drinks & beverages";
        } else {
            newDiv.dataset.category = "Short Orders";
        }
        newDiv.dataset.id = product.id.toString();
        newDiv.innerHTML = `
            <img src="Assets/images/${product.image}" />
            <div class="title">${product.name}</div>
            <div class="price">₱${product.price.toLocaleString()}</div>
            <button onclick="addToCart(${index})">Add To Cart</button>
        `;
        document.querySelector('.list').appendChild(newDiv);
    });

    reloadCart();
}

function reloadCart() {
    listCart.innerHTML = ''; 
    let totalQuantity = 0;
    let totalPrice = 0;

    listCarts.forEach((item, index) => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
        
        let cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <img src="Assets/images/${item.image}" />
            <div>${item.name}</div>
            <div>₱${item.price.toLocaleString()}</div>
            <div>
                <button onclick="changeQuantity(${index}, 'decrement', event)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 'increment', event)">+</button>
            </div>
        `;
        listCart.appendChild(cartItem);
    });

    total.innerText = `Total: ₱${totalPrice.toLocaleString()}`;
    quantity.innerText = totalQuantity;
}



function changeQuantity(key, action, event) {
    event.stopPropagation(); 

    const product = listCarts[key];
    if (action === 'increment') {
        product.quantity++;
    } else if (action === 'decrement') {
        if (product.quantity > 0) { 
            product.quantity--;
        }
        if (product.quantity === 0) { 
            listCarts.splice(key, 1);
        }
    }

    product.price = products[product.id - 1].price * product.quantity; 
    updateLocalStorage(); 
    reloadCart(); 
}




function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(listCarts));
}
document.addEventListener('click', (event) => {
    const cart = document.querySelector('.cart');
    const isClickInsideCart = cart.contains(event.target);
    const isClickOnOpenButton = event.target.closest('.shopping');
    // Identify if the click is on a quantity change button
    const isQuantityChangeButton = event.target.closest('.listCart li div button');

    if (!isClickInsideCart && !isClickOnOpenButton && !isQuantityChangeButton) {
        console.log("Closing cart due to outside click");
        body.classList.remove('active');
    } else {
        console.log("Not closing cart");
    }
});

document.addEventListener('DOMContentLoaded', () => {
            const checkoutButton = document.querySelector('.checkout');
            checkoutButton.addEventListener('click', () => {
                window.location.href = 'checkout.html';
            });
        });
const categoryMapping = {
    "Show All": ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    "Burger": ["1", "2"],
    "Meal": ["3", "4", "5", "6"],
    "Drinks & beverages": ["7", "8", "9", "10"],
    "Short Orders": ["11", "12"]
};

function filterItems(category) {
    const allItems = document.querySelectorAll('.item');
    const idsToShow = categoryMapping[category]; // Define idsToShow within the function scope

    allItems.forEach(item => {
        if (idsToShow.includes(item.dataset.id)) {
            item.style.display = ''; // Revert to default display style, which is determined by CSS
        } else {
            item.style.display = 'none';
        }
    });
}

document.querySelectorAll('.filterButton').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submit if it's inside a form
        event.stopPropagation(); // Stop the event from bubbling up to higher elements
        filterItems(this.dataset.category);
    });
});

window.onload = () => {
    initApp(); // Initialize the app
    filterItems("Show All"); // Display all items on initial load
  };
  function addToCart(index) {
    const product = products[index];
    let productInCart = listCarts.find(item => item.id === product.id);

    if (productInCart) {
        productInCart.quantity++;
    } else {
        productInCart = { ...product, quantity: 1 };
        listCarts.push(productInCart);
    }

    updateLocalStorage();
    reloadCart();
}




