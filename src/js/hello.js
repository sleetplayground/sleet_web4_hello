// Initial console log
console.log('❄️ Hello');

// Contract addresses for different networks
const CONTRACT_ADDRESS = {
    mainnet: 'hello.sleet.near',
    testnet: 'hello.sleet.testnet'
};

// Function to check and update network based on URL
function checkAndUpdateNetwork() {
    const currentUrl = window.location.hostname;
    console.log('Current URL:', currentUrl);
    
    // Get header element
    const headerElement = document.getElementById('header');
    const loginButton = document.getElementById('near_login_button');
    
    let currentNetwork;
    let contractAddress;
    
    // Check if URL contains .near.page or .testnet.page
    if (currentUrl.endsWith('.near.page')) {
        console.log('Network: mainnet');
        currentNetwork = 'mainnet';
        contractAddress = CONTRACT_ADDRESS.mainnet;
        localStorage.setItem('networkId', 'mainnet');
        // Keep header as is for mainnet
    } else if (currentUrl.endsWith('.testnet.page')) {
        console.log('Network: testnet');
        currentNetwork = 'testnet';
        contractAddress = CONTRACT_ADDRESS.testnet;
        localStorage.setItem('networkId', 'testnet');
        // Update header for testnet
        headerElement.textContent = 'hello.sleet.testnet';
    } else {
        console.log('Not a NEAR account URL');
        currentNetwork = 'local';
        contractAddress = CONTRACT_ADDRESS.testnet; // Default to testnet for local development
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

    return {
        network: currentNetwork,
        contractAddress: contractAddress
    };
}

// Export the contract addresses and network check function
export const getContractAddress = () => CONTRACT_ADDRESS;
export const getCurrentNetwork = checkAndUpdateNetwork;

// Run the check when the page loads
document.addEventListener('DOMContentLoaded', checkAndUpdateNetwork);

