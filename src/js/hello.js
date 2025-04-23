// Initial console log
console.log('❄️ Hello');

// Network configuration including contract addresses and RPC endpoints
const NETWORK_CONFIG = {
    mainnet: {
        contractId: 'hello.sleet.near',
        rpcEndpoint: 'https://rpc.mainnet.near.org'
    },
    testnet: {
        contractId: 'hello.sleet.testnet',
        rpcEndpoint: 'https://rpc.testnet.near.org'
    }
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
        contractAddress = NETWORK_CONFIG.mainnet.contractId;
        localStorage.setItem('networkId', 'mainnet');
        // Keep header as is for mainnet
    } else if (currentUrl.endsWith('.testnet.page')) {
        console.log('Network: testnet');
        currentNetwork = 'testnet';
        contractAddress = NETWORK_CONFIG.testnet.contractId;
        localStorage.setItem('networkId', 'testnet');
        // Update header for testnet
        headerElement.textContent = 'hello.sleet.testnet';
    } else {
        console.log('Not a NEAR account URL');
        currentNetwork = 'local';
        contractAddress = NETWORK_CONFIG.testnet.contractId; // Default to testnet for local development
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

    // Get RPC endpoint based on network
    const rpcEndpoint = currentNetwork === 'local' 
        ? NETWORK_CONFIG.testnet.rpcEndpoint 
        : NETWORK_CONFIG[currentNetwork].rpcEndpoint;

    return {
        network: currentNetwork,
        contractAddress: contractAddress,
        rpcEndpoint: rpcEndpoint
    };
}

// Export the network configuration and network check function
export const getNetworkConfig = () => NETWORK_CONFIG;
export const getCurrentNetwork = checkAndUpdateNetwork;

// Run the check when the page loads
document.addEventListener('DOMContentLoaded', checkAndUpdateNetwork);

