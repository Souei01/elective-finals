let products = [
    { id: 1, name: "Chicken Burger", price: 89, category: "Burger", image: "Assets/images/1.png" },
    { id: 2, name: "Beef Burger", price: 99, category: "Burger", image: "Assets/images/2.png" },
    { id: 3, name: "Chicken Sisig", price: 160, category: "Meal", image: "Assets/images/3.png" },
    { id: 4, name: "Petcho Inasal", price: 120, category: "Meal", image: "Assets/images/4.png" },
    { id: 5, name: "Pierna Inasal", price: 110, category: "Meal", image: "Assets/images/5.png" },
    { id: 6, name: "Fried Chicken", price: 110, category: "Meal", image: "Assets/images/6.png" },
    { id: 7, name: "Knicker Bocker", price: 99, category: "Dessert", image: "Assets/images/7.png" },
    { id: 8, name: "Halo Halo", price: 99, category: "Dessert", image: "Assets/images/8.png" },
    { id: 9, name: "Fries", price: 65, category: "Side Dish", image: "Assets/images/9.png" },
    { id: 10, name: "Fruit Soda", price: 65, category: "Drinks & Beverages", image: "Assets/images/10.png" },
    { id: 11, name: "Pancit Sotanghon", price: 225, category: "Short Orders", image: "Assets/images/11.png" },
    { id: 12, name: "Pancit Miki", price: 170, category: "Short Orders", image: "Assets/images/12.png" }
];




function renderProducts() {
    let rows = products.map(product => {
        let imageElement = product.image ? `<img src="${product.image}" alt="${product.name}" class="product-image">` : '<div class="placeholder"></div>';
        return `
            <tr>
                <td>${product.id}</td>
                <td>${imageElement}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.category}</td>
                <td>
                    <button onclick="editProduct(${product.id})" class="edit-button">Edit</button>
                    <button onclick="deleteProduct(${product.id})" class="delete-button">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
    document.getElementById('productTable').querySelector('tbody').innerHTML = rows;
}

function editProduct(productId) {
    let product = products.find(p => p.id === productId);
    document.getElementById('productId').value = product.id;
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productCategory').value = product.category;
    document.getElementById('productImage').setAttribute('src', product.image); // Show current image
    document.getElementById('productModal').style.display = 'block';
}

function saveProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const price = document.getElementById('productPrice').value;
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').files[0] ? URL.createObjectURL(document.getElementById('productImage').files[0]) : null;
    
    if (id === '0') {
        // Add new product
        let newId = products.length + 1;
        let newProduct = { id: newId, name: name, price: parseFloat(price), category: category, image: image };
        products.push(newProduct);
    } else {
        // Update existing product
        let product = products.find(p => p.id.toString() === id);
        product.name = name;
        product.price = parseFloat(price);
        product.category = category;
        if (image) product.image = image; // Only update the image if a new image was uploaded
    }
    closeModal();
    renderProducts();
}

function deleteProduct(productId) {
    deleteProductId = productId; // Store the product ID for deletion
    document.getElementById("deleteConfirmModal").style.display = "block";
    
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
function showAddProductModal() {
    // Reset the form values for a new product entry
    document.getElementById('productId').value = '0';
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCategory').selectedIndex = 0; // Reset the dropdown to the first option
    document.getElementById('productImage').value = ''; // Reset the file input for the image

    // Show the modal
    document.getElementById('productModal').style.display = 'block';
}
function confirmDeletion() {
    if (deleteProductId !== null) {
        products = products.filter(p => p.id !== deleteProductId);
        renderProducts();
    }
    closeDeleteModal();
}

function closeDeleteModal() {
    deleteProductId = null;
    document.getElementById("deleteConfirmModal").style.display = "none";
}