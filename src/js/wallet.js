import Cookies from 'js-cookie';

// Function to handle login
function login() {
    window.location.href = '/web4/login';
}

// Function to handle logout
function logout() {
    window.location.href = '/web4/logout';
}

// Function to update UI based on login state
function updateLoginState() {
    const accountId = Cookies.get('web4_account_id');
    const updateButton = document.getElementById('update_greeting_button');
    
    if (accountId) {
        // User is logged in
        updateButton.textContent = `Update Greeting (${accountId})`;
        updateButton.disabled = false;
    } else {
        // User is not logged in
        updateButton.textContent = 'Please login first';
        updateButton.disabled = true;
    }
}

// Check login state when page loads
document.addEventListener('DOMContentLoaded', updateLoginState);