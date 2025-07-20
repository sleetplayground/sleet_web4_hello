import { login, logout, isSignedIn, getAccountId, view, call } from 'web4-api-js';

// Contract IDs based on network
const CONTRACT_IDS = {
    mainnet: 'hello.sleet.near',
    testnet: 'hello.sleet.testnet'
};

// Get current network and contract ID
const getCurrentNetwork = () => {
    const network = localStorage.getItem('networkId') || 'testnet';
    console.log('Current network:', network);
    return network;
};
const getCurrentContractId = () => {
    const contractId = CONTRACT_IDS[getCurrentNetwork()];
    console.log('Current contract ID:', contractId);
    return contractId;
};

// UI Elements
const loginButton = document.getElementById('near_login_button');
const currentGreetingElement = document.getElementById('current_greeting');
const newGreetingInput = document.getElementById('new_greeting_input');
const updateGreetingButton = document.getElementById('update_greeting_button');

// Update UI based on sign-in state
function updateUI() {
    const signedIn = isSignedIn();
    console.log('User signed in:', signedIn);
    loginButton.textContent = signedIn ? 'LOGOUT' : 'LOGIN';
    if (signedIn) {
        const accountId = getAccountId();
        console.log('Logged in as:', accountId);
    }
}

// Handle login/logout
loginButton.addEventListener('click', () => {
    if (isSignedIn()) {
        console.log('Logging out...');
        logout();
        updateUI();
    } else {
        console.log('Initiating login...');
        login({ contractId: getCurrentContractId(), callbackPath: window.location.pathname });
    }
});

// Get greeting from contract
async function getGreeting() {
    try {
        console.log('Fetching greeting from contract...');
        const greeting = await view(getCurrentContractId(), 'get_greeting', {});
        console.log('Greeting received:', greeting); // Log the raw value from get_greeting
        currentGreetingElement.textContent = typeof greeting === 'string' ? greeting : greeting.greeting || JSON.stringify(greeting);
    } catch (error) {
        console.error('Error getting greeting:', error);
        currentGreetingElement.textContent = 'Error getting greeting';
    }
}

// Update greeting in contract
async function updateGreeting() {
    if (!isSignedIn()) {
        console.log('Update attempted without login');
        alert('Please login first');
        return;
    }

    const newGreeting = newGreetingInput.value.trim();
    if (!newGreeting) {
        console.log('No greeting entered');
        alert('Please enter a greeting');
        return;
    }

    try {
        console.log('Updating greeting to:', newGreeting);
        await call(getCurrentContractId(), 'set_greeting', { greeting: newGreeting });
        console.log('Greeting updated successfully');
        await getGreeting();
        newGreetingInput.value = '';
    } catch (error) {
        console.error('Error updating greeting:', error);
        alert('Error updating greeting');
    }
}

// Event listener for update greeting
updateGreetingButton.addEventListener('click', () => {
    console.log('Update greeting button clicked');
    updateGreeting();
});

// Initialize UI
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing UI...');
    updateUI();
    getGreeting();
});