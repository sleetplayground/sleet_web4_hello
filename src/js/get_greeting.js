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
        
        // Check if response is ok
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Try to get the response as text first
        const textData = await response.text();
        
        // Try to parse as JSON if it looks like JSON
        let data;
        try {
            data = JSON.parse(textData);
        } catch (parseError) {
            // If it's not JSON, use the text directly
            data = textData;
        }
        
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