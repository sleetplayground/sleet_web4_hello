// Import network utilities from hello.js
import { getCurrentNetwork } from './hello.js';

// Function to get current greeting
async function getGreeting() {
    try {
        // Get current network, contract address and RPC endpoint
        const { network, contractAddress, rpcEndpoint } = getCurrentNetwork();
        console.log('Getting greeting from network:', network, 'contract:', contractAddress, 'RPC:', rpcEndpoint);

        // Get the greeting display element
        const greetingElement = document.getElementById('current_greeting');
        
        // Show loading state
        greetingElement.textContent = 'Loading...';

        // Prepare the RPC request
        const rpcRequest = {
            jsonrpc: '2.0',
            id: 'dontcare',
            method: 'query',
            params: {
                request_type: 'call_function',
                finality: 'final',
                account_id: contractAddress,
                method_name: 'get_greeting',
                args_base64: 'e30=' // Empty JSON object {}
            }
        };

        // Fetch the greeting using RPC
        const response = await fetch(rpcEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rpcRequest)
        });
        
        if (!response.ok) {
            throw new Error(`RPC request failed: ${response.status}`);
        }

        const result = await response.json();
        if (result.error) {
            throw new Error(`RPC error: ${result.error.message || JSON.stringify(result.error)}`);
        }

        // Decode the result
        const resultBytes = Uint8Array.from(atob(result.result.result), c => c.charCodeAt(0));
        const resultText = new TextDecoder().decode(resultBytes);
        const data = JSON.parse(resultText);
        
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