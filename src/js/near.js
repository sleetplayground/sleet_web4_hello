import { login, logout, isSignedIn, getAccountId, view, call } from 'web4-api-js';

// Contract IDs based on network
const CONTRACT_IDS = {
    mainnet: 'hello.sleet.near',
    testnet: 'hello.sleet.testnet'
};

// Get current network and contract ID
const getCurrentNetwork = () => localStorage.getItem('networkId') || 'testnet';
const getCurrentContractId = () => CONTRACT_IDS[getCurrentNetwork()];

// UI Elements
const loginButton = document.getElementById('near_login_button');
const currentGreetingElement = document.getElementById('current_greeting');
const newGreetingInput = document.getElementById('new_greeting_input');
const updateGreetingButton = document.getElementById('update_greeting_button');

// Update UI based on sign-in state
function updateUI() {
    loginButton.textContent = isSignedIn() ? 'LOGOUT' : 'LOGIN';
    if (isSignedIn()) {
        console.log('Logged in as:', getAccountId());
    }
}

// Handle login/logout
loginButton.addEventListener('click', () => {
    if (isSignedIn()) {
        logout();
        updateUI();
    } else {
        login({ contractId: getCurrentContractId(), callbackPath: window.location.pathname });
    }
});

// Get greeting from contract
async function getGreeting() {
    try {
        const greeting = await view(getCurrentContractId(), 'get_greeting', {});
        currentGreetingElement.textContent = typeof greeting === 'string' ? greeting : greeting.greeting || JSON.stringify(greeting);
    } catch (error) {
        console.error('Error getting greeting:', error);
        currentGreetingElement.textContent = 'Error getting greeting';
    }
}

// Update greeting in contract
async function updateGreeting() {
    if (!isSignedIn()) {
        alert('Please login first');
        return;
    }

    const newGreeting = newGreetingInput.value.trim();
    if (!newGreeting) {
        alert('Please enter a greeting');
        return;
    }

    try {
        await call(getCurrentContractId(), 'set_greeting', { greeting: newGreeting });
        await getGreeting();
        newGreetingInput.value = '';
    } catch (error) {
        console.error('Error updating greeting:', error);
        alert('Error updating greeting');
    }
}

// Event listener for update greeting
updateGreetingButton.addEventListener('click', updateGreeting);

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
    getGreeting();
});