// Generate sample parts
const categories = ["Engine", "Brakes", "Suspension", "Electrical", "Exhaust", "Transmission", "Cooling", "Fuel System"];
const conditions = ["New"];

function generateSampleParts() {
    const parts = [];

    for (let i = 1; i <= 200; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)];
        const condition = conditions[Math.floor(Math.random() * conditions.length)];

        parts.push({
            id: i,
            title: `Sample Part ${i}`,
            description: `This is a sample description for part ${i}. Replace with actual description for this ${category.toLowerCase()} component.`,
            price: `$${(Math.random() * 500 + 20).toFixed(2)}`,
            category: category,
            condition: condition,
            image: "images/parts/part" + (i % 10) + ".jpg"
        });
    }

    return parts;
}

// Inventory data
let inventoryData = generateSampleParts();
let currentPage = 1;
const itemsPerPage = 12;
let filteredData = [...inventoryData];

// DOM Elements
const inventoryContainer = document.getElementById('inventory-container');
const paginationContainer = document.getElementById('pagination');
const searchInput = document.getElementById('search-input');
const resultsCount = document.getElementById('results-count');

// Function to render inventory items
function renderInventory() {
    inventoryContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredData.slice(startIndex, endIndex);

    if (currentItems.length === 0) {
        inventoryContainer.innerHTML = '<p class="no-results">No parts found matching your search.</p>';
        return;
    }

    currentItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'part-card';

        itemElement.innerHTML = `
            <div class="part-img">
                <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'; this.parentNode.innerHTML='Image ${item.id}';">
            </div>
            <div class="part-info">
                <div class="part-category">${item.category} • ${item.condition}</div>
                <h3 class="part-name">${item.title}</h3>
                <p class="part-desc">${item.description}</p>
                <div class="part-price">${item.price}</div>
                <div class="part-actions">
                    <button class="details-btn">Details (Coming Soon)</button>
                </div>
            </div>
        `;

        inventoryContainer.appendChild(itemElement);
    });

    updateResultsCount();
}

// Function to update results count
function updateResultsCount() {
    const total = filteredData.length;
    const start = Math.min((currentPage - 1) * itemsPerPage + 1, total);
    const end = Math.min(start + itemsPerPage - 1, total);

    resultsCount.textContent = `Showing ${start}-${end} of ${total} parts`;
}

// Function to render pagination
function renderPagination() {
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    if (pageCount <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    let paginationHTML = '';

    // Previous button
    paginationHTML += `<button onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>`;

    // Page numbers
    for (let i = 1; i <= pageCount; i++) {
        if (i === 1 || i === pageCount || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `<button onclick="changePage(${i})" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += `<span>...</span>`;
        }
    }

    // Next button
    paginationHTML += `<button onclick="changePage(${currentPage + 1})" ${currentPage === pageCount ? 'disabled' : ''}>Next</button>`;

    paginationContainer.innerHTML = paginationHTML;
}

// Function to change page
function changePage(page) {
    const pageCount = Math.ceil(filteredData.length / itemsPerPage);

    if (page < 1 || page > pageCount) return;

    currentPage = page;
    renderInventory();
    renderPagination();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Function to handle search
function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm === '') {
        filteredData = [...inventoryData];
    } else {
        filteredData = inventoryData.filter(item =>
            item.title.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm) ||
            item.category.toLowerCase().includes(searchTerm)
        );
    }

    currentPage = 1;
    renderInventory();
    renderPagination();
}

// Function to load custom parts data
function loadCustomParts(customParts) {
    inventoryData = customParts;
    filteredData = [...inventoryData];
    currentPage = 1;
    renderInventory();
    renderPagination();
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize inventory
    renderInventory();
    renderPagination();

    // Add event listeners
    searchInput.addEventListener('input', handleSearch);
});