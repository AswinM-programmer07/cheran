// Initialize the plan details page
if (window.location.href.includes("planPage.html")) {
    // This page will show customers matching the selected plan
    const params = new URLSearchParams(window.location.search);
    const rfmThreshold = params.get('rfm'); // Get the RFM threshold from URL query params

    displayCustomersForPlan(rfmThreshold);
}

// Function to display customers that match the selected plan's criteria
function displayCustomersForPlan(rfmThreshold) {
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    const tableBody = document.getElementById("plan-customer-table").getElementsByTagName("tbody")[0];
    
    customers.forEach(customer => {
        if (customer.rfmValue >= rfmThreshold) {  // If the RFM value meets the threshold
            let row = tableBody.insertRow();
            row.innerHTML = `
                <td><a href="customerDetails.html?phone=${customer.phone}">${customer.name}</a></td>
                <td>${customer.phone}</td>
                <td>${customer.date}</td>
                <td>${customer.cost}</td>
                <td>${customer.rfmValue}</td>
            `;
        }
    });
}

// Initialize the customer details page
if (window.location.href.includes("customerDetails.html")) {
    const params = new URLSearchParams(window.location.search);
    const phoneNumber = params.get('phone');

    displayCustomerDetails(phoneNumber);
}

// Function to display customer details and plot RFM graph
function displayCustomerDetails(phoneNumber) {
    let customers = JSON.parse(localStorage.getItem("customers")) || [];
    const customer = customers.find(c => c.phone === phoneNumber);

    if (customer) {
        // Show customer details
        const customerInfoDiv = document.getElementById("customer-info");
        customerInfoDiv.innerHTML = `
            <p>Name: ${customer.name}</p>
            <p>Phone: ${customer.phone}</p>
            <p>Date of Purchase: ${customer.date}</p>
            <p>Cost of Purchase: ?${customer.cost}</p>
            <p>RFM Value: ${customer.rfmValue}</p>
        `;

        // Plot RFM graph
        const ctx = document.getElementById('rfmGraph').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Recency', 'Frequency', 'Monetary'],
                datasets: [{
                    label: 'RFM Breakdown',
                    data: [customer.rfmValue, customer.rfmValue, customer.rfmValue], // For demonstration
                    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                    borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        alert("Customer not found.");
    }
}