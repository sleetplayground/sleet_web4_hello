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
    const loginButton = document.getElementById('near_login_button');
    
    if (accountId) {
        // User is logged in
        updateButton.textContent = 'Update Greeting';
        updateButton.disabled = false;
        loginButton.textContent = accountId;
        loginButton.onclick = logout;
    } else {
        // User is not logged in
        updateButton.textContent = 'Update Greeting';
        updateButton.disabled = true;
        loginButton.textContent = 'LOGIN';
        loginButton.onclick = login;
    }
}

// Check login state when page loads
document.addEventListener('DOMContentLoaded', () => {
    updateLoginState();
});