// Inventory Manager - Handles all inventory-related functionality
class InventoryManager {
    constructor() {
        this.inventoryData = this.generateSampleParts();
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.filteredData = [...this.inventoryData];
        this.initializeElements();
    }

    initializeElements() {
        this.inventoryContainer = document.getElementById('inventory-container');
        this.paginationContainer = document.getElementById('pagination');
        this.searchInput = document.getElementById('search-input');
        this.resultsCount = document.getElementById('results-count');
    }

    generateSampleParts() {
        const parts = [
            // Part ID 1
            {
                id: 1,
                title: "1969 Chevelle Right Fender",
                description: "This is an original 1969 Chevelle right front fender. It's a used, OEM steel replacement part, showing typical wear but is solid and ready for restoration.",
                price: "$65.00",
                category: "Fender",
                condition: "Used",
                image: "images/parts/IMG_7870.jpeg"
            },
            // Part ID 2
            {
                id: 2,
                title: "1970-1972 A/C Heater Box & Control Unit",
                description: "This original GM A/C heater box assembly with controller fits 1970-1972 GM A-body cars, including Chevelle, El Camino, and Monte Carlo. A complete unit ideal for a correct restoration.",
                price: "$350.00",
                category: "Air Conditioning",
                condition: "Used",
                image: "images/parts/IMG_7871.jpeg"
            },
            // Part ID 3
            {
                id: 3,
                title: "1969-1972 Chevelle A/C System: Complete Heater Box, Condenser & Blower Motor",
                description: "This is a complete, original A/C assembly for 1969-1972 Chevelles. The unit includes the main heater box, condenser, and blower motor, ideal for a full factory air conditioning restoration.",
                price: "$350.00",
                category: "Air Conditioning",
                condition: "Used",
                image: "images/parts/Image_250928_115524.jpeg"
            },
            {
                id: 4,
                title: "1968-89 Chevelle Headlight Harness & Core Support - Needs Repair",
                description: "Selling a used Chevelle headlight harness and core support for 1968-1989 models. This lot needs work but can be repaired.",
                price: "$75.00",
                category: "Electrical",
                condition: "Used",
                image: "images/parts/Image_250928_120748.jpeg"
            },
            {
                id: 5,
                title: "2012-2014 Challenger SRT Exhaust Pipes - $100 OBO",
                description: "Used exhaust pipes off a 2012-2014 Challenger SRT. Sold as-is. Great for a project or as replacements.",
                price: "$100.00",
                category: "Exhaust",
                condition: "Used",
                image: "images/parts/Image_250928_121513.jpeg"
            },
            {
                id: 6,
                title: "2015-2021 Chevy Silverado 4.3L LV3 Cylinder Heads w/ Rocker Arms - OBO",
                description: "Complete set of cylinder heads with rocker arms, removed from a running 4.3L LV3 V6 engine. $1,100 for the set or $600 each. All prices are OBO.",
                price: "$600",
                category: "Engine",
                condition: "Used",
                image: "images/parts/Image_250928_121726.jpeg"
            },
            {
                id: 7,
                title: "1971-1972 Chevelle Rear Bumper",
                description: "Used original rear bumper for 1971-1972 Chevelle. Shows typical wear but is solid and ready for restoration or as a core.",
                price: "$150.00",
                category: "Body & Trim",
                condition: "Used",
                image: "images/parts/Image_250928_122901.jpeg"
            },
            {
                id: 8,
                title: "2015-2020 Dodge Challenger SRT Brake Booster & Master Cylinder Assembly",
                description: "Used OEM brake booster and master cylinder assembly removed from a 2015-2020 Dodge Challenger SRT. This complete unit is ready for installation.",
                price: "$300.00",
                category: "Brakes",
                condition: "Used",
                image: "images/parts/Image_250928_123131.jpeg"
            },
            {
                id: 9,
                title: "1971-1972 Chevelle Front Bumper - Original GM",
                description: "This is an original GM front bumper for a 1971-1972 Chevelle. It is a used part showing typical wear but is structurally solid. A great candidate for re-chroming or as a solid driver-quality piece.",
                price: "$250.00",
                category: "Body & Trim",
                condition: "Used",
                image: "images/parts/Image_250928_123907.jpeg"
            },
            {
                id: 10,
                title: "1971-1972 Chevelle Front & Rear Bumper Set - Original GM Pair",
                description: "Selling a complete set of original GM front and rear bumpers for a 1971-1972 Chevelle. These used bumpers are structurally solid and are ideal for restoration or as driver-quality pieces. Sold as a matching set.",
                price: "$450.00",
                category: "Body & Trim",
                condition: "Used",
                image: "images/parts/Image_250928_124314.jpeg"
            },
            {
                id: 11,
                title: "1968 Chevelle Front Bumper - Has Dings - $150 OBO",
                description: "This is an original front bumper for a 1968 Chevelle. It has some dings and typical wear, but is solid with no major rust or damage. A great project piece for restoration.",
                price: "$150.00",
                category: "Body & Trim",
                condition: "Used",
                image: "images/parts/Image_250928_124611.jpeg"
            },
            {
                id: 12,
                title: "1972 Chevelle Front Bumper with Brackets Attached - Original GM",
                description: "This is an original GM front bumper for a 1972 Chevelle, complete with the mounting brackets still attached. This saves you the hassle of sourcing them separately. The bumper shows typical wear but is solid and ready for restoration. A complete, ready-to-install unit.",
                price: "$125.00",
                category: "Body & Trim",
                condition: "Used",
                image: "images/parts/Image_250928_125144.jpeg"
            },
            {
                id: 13,
                title: "2012 Corvette C6 ABS Module with Mounting Brackets",
                description: "Used OEM ABS module with all mounting brackets included. Removed from a 2012 Corvette C6. Part is in working condition.",
                price: "$250.00",
                category: "Brakes",
                condition: "Used",
                image: "images/parts/Image_250928_125440.jpeg"
            },
            {
                id: 14,
                title: "2016-2021 Dodge Challenger Dash Pad - Needs Repair",
                description: "Used OEM dash pad for 2016-2021 Dodge Challenger models. Needs to be repaired.",
                price: "$75.00",
                category: "Interior",
                condition: "Used",
                image: "images/parts/Image_250928_131042.jpeg"
            },
            {
                id: 15,
                title: "Dodge Challenger Auto-Dimming Rearview Mirror w/ Harness 68088624AA",
                description: "OEM auto-dimming rearview mirror with wiring harness. Part # 68088624AA. A direct plug-and-play replacement. In good used condition.",
                price: "$80.00",
                category: "Interior",
                condition: "Used",
                image: "images/parts/Image_250928_131659.jpeg"
            },
            {
                id: 16,
                title: "Corvette C6 Radio Bezel - Dash Trim Panel",
                description: "Used OEM radio bezel (dash trim panel) for a C6 Corvette. This is the surround that houses the radio and climate controls. Shows some light wear but is in good condition with no broken tabs. A direct fit replacement.",
                price: "$300.00",
                category: "Interior",
                condition: "Used",
                image: "images/parts/Image_250928_131945.jpeg"
            },
            {
                id: 17,
                title: "2019 Dodge Charger SRT Daytona Rear Tail Light Assembly 68213145AD",
                description: "OEM passenger-side tail light for a 2019 Dodge Charger SRT Daytona. Part # 68213145AD. This is the right/rear assembly. In excellent used condition, ready to install.",
                price: "$300.00",
                category: "Lighting",
                condition: "Used",
                image: "images/parts/Image_250928_132923.jpeg"
            },
            {
                id: 18,
                title: "Cadillac CTS Lower Right Side Grille Insert - Base Model",
                description: "This is a used OEM lower right-side grille insert for a base model Cadillac CTS. It is the specific piece for the passenger side of the lower bumper opening. In good condition, ready for installation.",
                price: "$140.00",
                category: "Body & Trim",
                condition: "Used",
                image: "images/parts/Image_250928_133709.jpeg"
            },
            {
                id: 19,
                title: "2019-2023 Dodge Charger SRT 392 Brake Pump Module P04779789AG",
                description: "OEM brake pump module for 2019-2023 Dodge Charger SRT 392 models. Part # P04779789AG. Removed from a working vehicle. A direct plug-and-play replacement for your performance sedan.",
                price: "$200.00",
                category: "Brakes",
                condition: "Used",
                image: "images/parts/Image_250928_134205.jpeg"
            },
            {
                id: 20,
                title: "2007-2010 Audi Q7 Airbag",
                description: "Used OEM airbag module for 2007-2010 Audi Q7 models. Sold as-is. Handle with care and consult a professional for installation.",
                price: "$45.00",
                category: "Safety",
                condition: "Used",
                image: "images/parts/Image_250928_135251.jpeg"
            },
            {
                id: 21,
                title: "2013-2014 Chevy Camaro Convertible Side Mirror Set - Pair (Left & Right)",
                description: "Complete set of used OEM side mirrors for a 2013-2014 Chevrolet Camaro Convertible. Includes both the driver and passenger side mirrors. In good working condition. Sold as a pair.",
                price: "$300.00",
                category: "Body & Trim",
                condition: "Used",
                image: "images/parts/Image_250928_142917.jpeg"
            },
            {
                id: 22,
                title: "2015 Camaro Z/28 TR6060 6-Speed Manual Transmission - TUET10910",
                description: "OEM TR6060 6-speed manual transmission from a 2015 Camaro Z/28. Part # TUET10910. This is a high-performance TREMEC unit. Removed from a running vehicle. An excellent direct replacement or upgrade.",
                price: "$2,300.00",
                category: "Drivetrain & Transmission",
                condition: "Used",
                image: "images/parts/Image_250928_145749.jpeg"
            }
        ];

        return parts;
    }

    renderInventory() {
        this.inventoryContainer.innerHTML = '';

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const currentItems = this.filteredData.slice(startIndex, endIndex);

        if (currentItems.length === 0) {
            this.inventoryContainer.innerHTML = '<p class="no-results">No parts found matching your search. <a href="#quote">Request a custom quote</a> for the part you need.</p>';
            return;
        }

        currentItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'part-card';

            itemElement.innerHTML = `
                <div class="part-img">
                    <img src="${item.image}" alt="${item.title}"
                         onerror="this.onerror=null; this.style.display='none'; this.parentNode.innerHTML='<span>Image ${item.id}</span>';">
                </div>
                <div class="part-info">
                    <div class="part-category">${item.category} • ${item.condition}</div>
                    <h3 class="part-name">${item.title}</h3>
                    <p class="part-desc">${item.description}</p>
                    <div class="part-price">${item.price}</div>
                    <div class="part-actions">
                        <button class="quote-btn" onclick="inventoryManager.requestPartQuote('${item.title.replace(/'/g, "\\'")}')">
                            <i class="fas fa-quote-left"></i> Get Quote
                        </button>
                        <button class="btn btn-outline">Details (Coming Soon)</button>
                    </div>
                </div>
            `;

            this.inventoryContainer.appendChild(itemElement);
        });

        this.updateResultsCount();
    }

    updateResultsCount() {
        const total = this.filteredData.length;
        const start = Math.min((this.currentPage - 1) * this.itemsPerPage + 1, total);
        const end = Math.min(start + this.itemsPerPage - 1, total);

        this.resultsCount.textContent = `Showing ${start}-${end} of ${total} parts`;
    }

    renderPagination() {
        const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);

        if (pageCount <= 1) {
            this.paginationContainer.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        // Previous button
        paginationHTML += `<button onclick="inventoryManager.changePage(${this.currentPage - 1})" ${this.currentPage === 1 ? 'disabled' : ''}>Previous</button>`;

        // Page numbers
        for (let i = 1; i <= pageCount; i++) {
            if (i === 1 || i === pageCount || (i >= this.currentPage - 2 && i <= this.currentPage + 2)) {
                paginationHTML += `<button onclick="inventoryManager.changePage(${i})" class="${i === this.currentPage ? 'active' : ''}">${i}</button>`;
            } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
                paginationHTML += `<span>...</span>`;
            }
        }

        // Next button
        paginationHTML += `<button onclick="inventoryManager.changePage(${this.currentPage + 1})" ${this.currentPage === pageCount ? 'disabled' : ''}>Next</button>`;

        this.paginationContainer.innerHTML = paginationHTML;
    }

    changePage(page) {
        const pageCount = Math.ceil(this.filteredData.length / this.itemsPerPage);

        if (page < 1 || page > pageCount) return;

        this.currentPage = page;
        this.renderInventory();
        this.renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    handleSearch() {
        const searchTerm = this.searchInput.value.toLowerCase();

        if (searchTerm === '') {
            this.filteredData = [...this.inventoryData];
        } else {
            this.filteredData = this.inventoryData.filter(item =>
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.category.toLowerCase().includes(searchTerm)
            );
        }

        this.currentPage = 1;
        this.renderInventory();
        this.renderPagination();
    }

    requestPartQuote(partName) {
        document.getElementById('part-needed').value = partName;
        document.getElementById('quote-request-form').scrollIntoView({
            behavior: 'smooth'
        });
        this.trackConversion('part_quote_click');
    }

    trackConversion(type) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                'event_category': 'quote_request',
                'event_label': type
            });
        }
        console.log(`Conversion tracked: ${type}`);
    }

    initialize() {
        this.renderInventory();
        this.renderPagination();

        this.searchInput.addEventListener('input', () => this.handleSearch());

        // Phone number tracking
        document.getElementById('tracked-phone').addEventListener('click', () => {
            this.trackConversion('phone_click');
        });
    }
}

// Initialize global instance
const inventoryManager = new InventoryManager();