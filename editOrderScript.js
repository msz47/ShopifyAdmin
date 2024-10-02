// Create a custom section
const customSection = document.createElement('div');
customSection.className = 'Polaris-Box';
customSection.id = 'ratesSection';
customSection.style.marginTop = '0'; // Set top margin to 0
customSection.style.paddingBottom = '16px'; // Set bottom padding
customSection.style.borderRadius = '20px';

// Get the order number and store name from the URL
const orderUrl = window.location.href;
const orderNumber = orderUrl.split('/').slice(-2, -1)[0]; // Extract order number
const storeName = orderUrl.split('/')[4]; // Extract store name

// Mock shipping rates data
const mockRates = [
    {
        service_code: "INTERNATIONAL_ECONOMY___57056938-bb99-4da2-b3e4-61fbfb22e25c",
        service_name: "FedEx International Economy® in 3-5 business days + Est. Duties & Taxes (Shown as USD; Est. Duties and Taxes are not refundable)",
        description: "Shipping: $28.48 + Est. Duty: $30.93 + General Sales Tax: $315.48",
        currency: "USD",
        total_price: "37489",
        total_tax: "34,641.00"
    },
    {
        service_code: "FEDEX_INTERNATIONAL_PRIORITY_EXPRESS___57056938-bb99-4da2-b3e4-61fbfb22e25c",
        service_name: "FedEx International Priority® Express in 1-3 business days + Est. Duties & Taxes (Shown as USD; Est. Duties and Taxes are not refundable)",
        description: "Shipping: $30.00 + Est. Duty: $30.96 + General Sales Tax: $315.79",
        currency: "USD",
        total_price: "37675",
        total_tax: "34,675.00"
    },
    {
        service_code: "FEDEX_INTERNATIONAL_CONNECT_PLUS___57056938-bb99-4da2-b3e4-61fbfb22e25c",
        service_name: "FedEx International Connect Plus in 1-5 business days + Est. Duties & Taxes (Shown as USD; Est. Duties and Taxes are not refundable)",
        description: "Shipping: $93.25 + Est. Duty: $32.23 + General Sales Tax: $328.70",
        currency: "USD",
        total_price: "45417.99999999999",
        total_tax: "36,093.00"
    },
    {
        service_code: "08___57056938-bb99-4da2-b3e4-61fbfb22e25c",
        service_name: "UPS Worldwide Expedited in 2-5 business days + Est. Duties & Taxes (Shown as USD; Est. Duties and Taxes are not refundable)",
        description: "Shipping: $32.96 + Est. Duty: $31.02 + General Sales Tax: $316.40",
        currency: "USD",
        total_price: "38038",
        total_tax: "34,742.00"
    }
];

function getShippingObj() {
         const url = `https://20f2-124-109-62-57.ngrok-free.app/Shopify/GetRatesObj?orderId=${orderNumber}&shopName=${storeName}`;

       fetch(url)
            .then(response => {
                // Log the response for debugging
                console.log('Response status:', response.status);
                return response.text(); // Use text() instead of json() to see the raw response
            })
            .then(data => {
                console.log('Response data:', data);
                try {
                    const jsonData = JSON.parse(data); // Try parsing as JSON
                    console.log('Parsed JSON:', jsonData);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
// Function to format price
const formatPrice = (price) => {
    return (parseFloat(price) / 100).toFixed(2); // Divide by 100 and format to 2 decimal places
};

// Function to display the shipping rates
const displayCarrierRates = (rates) => {
    const ratesContainer = document.getElementById('shippingRates');
    ratesContainer.innerHTML = ''; // Clear previous rates

    if (rates && rates.length > 0) {
        rates.forEach(rate => {
            const rateElement = document.createElement('div');
            rateElement.innerHTML = `
                <p style="font-weight:600">${rate.service_name}</p>
                <p>${rate.description}</p>
                <p><em>Total Price: ${rate.currency} ${formatPrice(rate.total_price)}</em></p>
                <hr style="border:0; border-top: 1px solid var(--p-color-border-secondary); color:var(--p-color-border-secondary);"/>
            `;
            ratesContainer.appendChild(rateElement);
        });
    } else {
        ratesContainer.innerHTML = '<p>No shipping rates available.</p>';
    }
};

// Create the button
const calculateButton = document.createElement('button');
calculateButton.className = 'Polaris-Button Polaris-Button--pressable Polaris-Button--variantSecondary Polaris-Button--sizeLarge Polaris-Button--textAlignCenter'; // Use Polaris button styles
calculateButton.innerText = 'Get rates';

// Add event listener to the button
calculateButton.addEventListener('click', () => {
    displayCarrierRates(mockRates); // Display mock rates when button is clicked
    getShippingObj();
});

// Create the rates header and main div
customSection.innerHTML += `
    <div class="Polaris-Box" style="padding: 16px; background-color: var(--p-color-bg-surface); border-radius: var(--p-border-radius-200);">
        <div>
        <div id="ratesHeadDiv" style="display: flex; justify-content: space-between; align-items: flex-start;">
        <h2 class="Polaris-Text--root Polaris-Text--headingMd" style="margin-bottom:15px;">Shipping rates</h2>
        </div>
            
            <div id="ratesMainDiv" >
                <div id="shippingRates" style="padding: 12px; margin-top:10px; background-color: var(--p-color-bg-surface); border: 1px solid var(--p-color-border-secondary); border-radius: var(--p-border-radius-200);">
                    <p>Get new shipping rates for this order's products and shipping address<br>Shipping address must be added to ge rates.</P
                </div>
            </div>
        </div>
    </div>
`;

// Append the button to the rates header


// Find the payment section
const paymentSection = Array.from(document.querySelectorAll('.Polaris-Box')).find(box => {
    const heading = box.querySelector('h2.Polaris-Text--headingSm'); // Adjust class if necessary
    return heading && heading.textContent.trim().includes('Payment');
});
const ratesSection = document.getElementById('ratesSection');

if(orderUrl.endsWith('/edit')){
    if (paymentSection && !ratesSection) {
    // Append the custom section after the payment section
    paymentSection.after(customSection);
    console.log('Custom section added successfully.');
        document.getElementById('ratesHeadDiv').appendChild(calculateButton);
    } else if (ratesSection) {
        console.error('Already added');
    } else {
        console.error('Payment section not found.');
    }
}


