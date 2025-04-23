

import { getHelloContract } from './config.js';

// Function to submit the greeting transaction
async function submitGreeting(event) {
    event.preventDefault();
    const greeting = document.getElementById('new_greeting_input').value;
    if (!greeting) {
        alert('Please enter a greeting');
        return;
    }

    try {
        const contractId = getHelloContract();
        const response = await fetch(`/web4/contract/${contractId}/set_greeting`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ greeting })
        });

        if (!response.ok) {
            throw new Error('Transaction failed');
        }

        alert('Greeting updated successfully!');
        document.getElementById('new_greeting_input').value = '';
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to update greeting: ' + error.message);
    }
}

// Attach event listener to the update button
document.getElementById('update_greeting_button').addEventListener('click', submitGreeting);