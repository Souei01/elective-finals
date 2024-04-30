const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const iconPopup = document.querySelector('.icon-head');
const closeIcon = document.querySelector('.close-icon');
const loginForm = document.querySelector('.form-box.login form');

// Function to perform admin validation
function validateAdmin(email, password) {
    // Replace these hardcoded admin credentials with your actual admin credentials
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin123';

    // Check if the entered credentials match the admin credentials
    if (email === adminEmail && password === adminPassword) {
        // Redirect to admin page
        window.location.href = "admin.html";
    } else {
        alert('Invalid email or password. Please try again.');
    }
}

// Event listeners
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

iconPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup');
});

closeIcon.addEventListener('click', () => {
    wrapper.classList.remove('active-popup');
});

// Event listener for login form submission
if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission

        // Get the values of email and password fields
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Perform admin validation
        validateAdmin(email, password);
    });
}
