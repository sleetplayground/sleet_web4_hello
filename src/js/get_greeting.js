// Import network utilities from hello.js
import { getCurrentNetwork } from './hello.js';

// Function to get current greeting
async function getGreeting() {
    try {
        // Get current network and contract address
        const { network, contractAddress } = getCurrentNetwork();
        console.log('Getting greeting from network:', network, 'contract:', contractAddress);

        // Get the greeting display element
        const greetingElement = document.getElementById('current_greeting');
        
        // Show loading state
        greetingElement.textContent = 'Loading...';

        // Fetch the greeting from the contract
        const response = await fetch(`/web4/contract/${contractAddress}/get_greeting`);
        const data = await response.json();
        
        // Update the display with the greeting
        greetingElement.textContent = data;
        console.log('Greeting fetched:', data);

    } catch (error) {
        console.error('Error fetching greeting:', error);
        // Update display with error message
        const greetingElement = document.getElementById('current_greeting');
        greetingElement.textContent = 'Error: Could not fetch greeting';
    }
}

// Add click event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const getGreetingButton = document.getElementById('get_current_greeting');
    if (getGreetingButton) {
        getGreetingButton.addEventListener('click', getGreeting);
    }
});

// Export the getGreeting function
export { getGreeting };