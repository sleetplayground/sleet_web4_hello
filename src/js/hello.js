// Initial console log
console.log('❄️ Hello');

// Function to check and update network based on URL
function checkAndUpdateNetwork() {
    const currentUrl = window.location.hostname;
    console.log('Current URL:', currentUrl);
    
    // Get header element
    const headerElement = document.getElementById('header');
    const loginButton = document.getElementById('near_login_button');
    
    // Check if URL contains .near.page or .testnet.page
    if (currentUrl.endsWith('.near.page')) {
        console.log('Network: mainnet');
        localStorage.setItem('network', 'mainnet');
        // Keep header as is for mainnet
    } else if (currentUrl.endsWith('.testnet.page')) {
        console.log('Network: testnet');
        localStorage.setItem('network', 'testnet');
        // Update header for testnet
        headerElement.textContent = 'hello.sleet.testnet';
    } else {
        console.log('Not a NEAR account URL');
        // Hide login button if not a NEAR account URL
        if (loginButton) {
            loginButton.style.display = 'none';
        }
    }

    // Update og:url meta tag
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta) {
        ogUrlMeta.content = window.location.href;
        console.log('Updated og:url to:', window.location.href);
    }
}

// Clear functions for resetting state
function clearNetwork() {
    localStorage.removeItem('network');
    console.log('Network setting cleared');
}

function clearAll() {
    localStorage.clear();
    console.log('All local storage cleared');
}

// Run the check when the page loads
document.addEventListener('DOMContentLoaded', checkAndUpdateNetwork);

// Export functions for potential external use
window.clearNetwork = clearNetwork;
window.clearAll = clearAll;