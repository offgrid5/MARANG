(function() {

	"use strict";


	document.addEventListener('DOMContentLoaded', function() {
            // Configuration
            const projectsPerPage = window.innerWidth <= 767 ? 6 : 9;
            let currentPage = 1;
            let filteredProjects = [];
            let cart = [];
            let currentModalProduct = null;
            
            // DOM elements
            const projectsContainer = document.getElementById('projectsContainer');
            const paginationContainer = document.getElementById('pagination');
            const resultCount = document.getElementById('resultCount');
            const totalProjects = document.getElementById('totalProjects');
            const currentPageSpan = document.getElementById('currentPage');
            const totalPagesSpan = document.getElementById('totalPages');
            const filterCheckboxes = document.querySelectorAll('input[type="checkbox"][data-filter]');
            const powerSlider = document.getElementById('powerRange');
            const priceSlider = document.getElementById('priceRange');
            const applyFiltersBtn = document.getElementById('applyFilters');
            const resetFiltersBtn = document.getElementById('resetFilters');
            const searchInput = document.getElementById('searchInput');
            const searchButton = document.getElementById('searchButton');
            const maxPowerDisplay = document.getElementById('maxPower');
            const minPowerDisplay = document.getElementById('minPower');
            const mobileFilterToggle = document.getElementById('mobileFilterToggle');
            const sidebar = document.querySelector('.filter-sidebar');
            const overlay = document.getElementById('overlay');
            const closeSidebar = document.querySelector('.close-sidebar');
            const cartIndicator = document.getElementById('cartIndicator');
            const cartCount = document.getElementById('cartCount');
            const cartItemsContainer = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            const modalAddToCart = document.getElementById('modalAddToCart');
            const toastContainer = document.getElementById('toastContainer');
            const productModal = new bootstrap.Modal(document.getElementById('productModal'));
            
            // Equipment data
            const equipment = [
                {
                    id: 1,
                    name: "Solar Panel 300W",
                    description: "High efficiency monocrystalline solar panel with 20% efficiency rating and 25-year performance warranty",
                    type: "solar",
                    condition: "new",
                    power: 0.3,
                    price: 12000,
                    location: "Gaborone Warehouse",
                    manufacturer: "SunPower",
                    specs: ["300W", "24V", "Monocrystalline", "25yr warranty"],
                    image: "https://placehold.co/600x400.png"
                },
                {
                    id: 2,
                    name: "Solar Inverter 5kW",
                    description: "Hybrid solar inverter with battery backup and grid-tie capability for residential use",
                    type: "solar",
                    condition: "new",
                    power: 5,
                    price: 45000,
                    location: "Francistown Depot",
                    manufacturer: "SolarEdge",
                    specs: ["5kW", "Hybrid", "MPPT", "WiFi monitoring"],
                    image: "https://placehold.co/600x400.png"
                },
                {
                    id: 3,
                    name: "Solar Battery 10kWh",
                    description: "Lithium-ion solar storage battery with 10-year warranty and smart management",
                    type: "solar",
                    condition: "new",
                    power: 10,
                    price: 85000,
                    location: "Gaborone Warehouse",
                    manufacturer: "Tesla",
                    specs: ["10kWh", "Li-ion", "10yr warranty", "Expandable"],
                    image: "https://placehold.co/600x400.png"
                },
                {
                    id: 4,
                    name: "Diesel Generator 100kVA",
                    description: "Industrial grade diesel generator with auto-start for backup power solutions",
                    type: "generator",
                    condition: "used",
                    power: 100,
                    price: 350000,
                    location: "Lobatse Yard",
                    manufacturer: "Cummins",
                    specs: ["100kVA", "Diesel", "Auto-start", "Soundproof"],
                    image: "https://placehold.co/600x400.png"
                },
                {
                    id: 5,
                    name: "Solar Water Pump 2HP",
                    description: "DC solar-powered water pump for agricultural irrigation systems",
                    type: "solar",
                    condition: "new",
                    power: 1.5,
                    price: 28000,
                    location: "Maun Depot",
                    manufacturer: "Lorentz",
                    specs: ["2HP", "DC", "Solar-powered", "Submersible"],
                    image: "https://placehold.co/600x400.png"
                },
                {
                    id: 6,
                    name: "Excavator 20 Ton",
                    description: "Heavy-duty excavator for construction and mining applications",
                    type: "construction",
                    condition: "used",
                    power: 110,
                    price: 1200000,
                    location: "Selebi-Phikwe Site",
                    manufacturer: "Caterpillar",
                    specs: ["20 Ton", "Bucket 1.2m³", "GPS", "Low hours"],
                    image: "https://placehold.co/600x400.png0"
                },
                {
                    id: 7,
                    name: "Solar Street Light",
                    description: "All-in-one solar street light with motion sensor and 3-day autonomy",
                    type: "solar",
                    condition: "new",
                    power: 0.06,
                    price: 6500,
                    location: "Gaborone Warehouse",
                    manufacturer: "Philips",
                    specs: ["50W LED", "Motion sensor", "IP65", "5yr warranty"],
                    image: "https://placehold.co/600x400.png"
                },
                {
                    id: 8,
                    name: "Portable Solar Generator",
                    description: "2000W portable power station with solar charging capability",
                    type: "solar",
                    condition: "refurbished",
                    power: 2,
                    price: 35000,
                    location: "Francistown Depot",
                    manufacturer: "Jackery",
                    specs: ["2kW", "Portable", "Solar charging", "8 outlets"],
                    image: "https://placehold.co/600x400.png"
                },
                {
                    id: 9,
                    name: "Tractor 75HP",
                    description: "Agricultural tractor with loader and 3-point hitch system",
                    type: "agricultural",
                    condition: "used",
                    power: 75,
                    price: 420000,
                    location: "Palapye Farm",
                    manufacturer: "John Deere",
                    specs: ["75HP", "4WD", "Loader", "Low hours"],
                    image: "https://placehold.co/600x400.png"
                },
                {
                    id: 10,
                    name: "Solar Charge Controller 60A",
                    description: "MPPT solar charge controller for off-grid solar systems",
                    type: "solar",
                    condition: "new",
                    power: 3,
                    price: 15000,
                    location: "Gaborone Warehouse",
                    manufacturer: "Victron",
                    specs: ["60A", "MPPT", "Bluetooth", "98% efficiency"],
                    image: "https://placehold.co/600x400.png"
                }
            ];
            
            // Apply filters function
            function applyFilters() {
                currentPage = 1;
                filterProjects();
            }
            
            // Filter projects based on criteria
            function filterProjects() {
                // Get active filters
                const activeFilters = {
                    type: getCheckedValues('type'),
                    condition: getCheckedValues('condition'),
                    maxPower: parseInt(powerSlider.value),
                    maxPrice: parseInt(priceSlider.value)
                };
                
                // Get search term
                const searchTerm = searchInput.value.toLowerCase();
                
                // Filter projects
                filteredProjects = equipment.filter(item => {
                    const typeMatch = activeFilters.type.length === 0 || activeFilters.type.includes(item.type);
                    const conditionMatch = activeFilters.condition.length === 0 || activeFilters.condition.includes(item.condition);
                    const powerMatch = item.power <= activeFilters.maxPower;
                    const priceMatch = item.price <= activeFilters.maxPrice;
                    const searchMatch = searchTerm === '' || 
                                       item.name.toLowerCase().includes(searchTerm) || 
                                       item.description.toLowerCase().includes(searchTerm) ||
                                       item.manufacturer.toLowerCase().includes(searchTerm);
                    
                    return typeMatch && conditionMatch && powerMatch && priceMatch && searchMatch;
                });
                
                // Update result count
                resultCount.textContent = filteredProjects.length;
                totalProjects.textContent = equipment.length;
                
                // Render projects and pagination
                renderProjects();
                renderPagination();
            }
            
            // Render projects for current page
            function renderProjects() {
                projectsContainer.innerHTML = '';
                
                if (filteredProjects.length === 0) {
                    projectsContainer.innerHTML = `
                        <div class="no-results">
                            <i class="bi bi-search"></i>
                            <h5>No equipment found</h5>
                            <p>Try adjusting your filters or search terms</p>
                        </div>
                    `;
                    return;
                }
                
                // Get projects per page based on screen size
                const perPage = window.innerWidth <= 767 ? 6 : 6;
                
                // Calculate start and end index for current page
                const startIndex = (currentPage - 1) * perPage;
                const endIndex = Math.min(startIndex + perPage, filteredProjects.length);
                const pageProjects = filteredProjects.slice(startIndex, endIndex);
                
                // Create project cards
                pageProjects.forEach(item => {
                    // Determine badge class based on type
                    let badgeClass = "badge-info";
                    if (item.type === "solar") badgeClass = "badge-solar";
                    else if (item.type === "generator") badgeClass = "badge-warning";
                    else if (item.type === "construction") badgeClass = "badge-secondary";
                    else if (item.type === "mining") badgeClass = "badge-success";
                    
                    // Format price
                    const priceText = item.price >= 1000000 
                        ? `BWP ${(item.price / 1000000).toFixed(1)}M` 
                        : item.price >= 1000
                            ? `BWP ${(item.price / 1000).toFixed(0)}K` 
                            : `BWP ${item.price}`;
                    
                    // Format type
                    const typeMap = {
                        solar: "Solar Product",
                        generator: "Generator",
                        construction: "Construction",
                        mining: "Mining",
                        agricultural: "Agricultural",
                        other: "Other"
                    };
                    const typeText = typeMap[item.type] || item.type;
                    
                    // Format condition
                    const conditionMap = {
                        new: "New",
                        used: "Used",
                        refurbished: "Refurbished"
                    };
                    const conditionText = conditionMap[item.condition] || item.condition;
                    
                    // Create specs badges
                    const specsHTML = item.specs.slice(0, 3).map(spec => {
                        const isSolar = item.type === "solar";
                        return `<span class="badge specs-badge ${isSolar ? 'solar-badge' : ''}">${spec}</span>`;
                    }).join('');
                    
                    const cardHTML = `
                        <div class="project-card">
                            <div class="card-image" style="background-image: url('${item.image}');"></div>
                            <div class="card-body">
                                <span class="badge ${badgeClass} project-badge">${typeText}</span>
                                <h3 class="project-title">${item.name}</h3>
                                <p class="card-text">${item.description}</p>
                                
                                <div class="project-detail">
                                    <i class="bi bi-lightning"></i> <strong>Power:</strong> ${item.power} kW
                                </div>
                                <div class="project-detail">
                                    <i class="bi bi-cash"></i> <strong>Price:</strong> ${priceText}
                                </div>
                                
                                <div class="mt-1 mb-1">
                                    ${specsHTML}
                                </div>
                                
                                <div class="card-footer">
                                    <button class="btn ${item.type === 'solar' ? 'btn-solar' : 'btn-primary'} btn-sm view-details" data-id="${item.id}">
                                        <i class="bi bi-info-circle"></i> Details
                                    </button>
                                    <button class="btn btn-success btn-sm add-to-cart" data-id="${item.id}">
                                        <i class="bi bi-cart-plus"></i> Add to Basket
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                 /*
                    
            <div class="featured-card">
                     <div class="featured-image" style="background-image: url('${item.image}');">
                            <span class="badge bg-success ${badgeClass}">${typeText}</span>
                        </div>
                        <div class="featured-content">
                            <h3 class="featured-title" data-bs-toggle="modal" data-bs-target="#featuredModal3">${item.name}</h3>
                            <p class="featured-description">${item.description}</p>
                            <div class="featured-details">
                                <div class="featured-price">${price.text}</div>
                                <div class="featured-location">
                                    <i class="bi bi-geo-alt"></i> ${product.location}
                                </div>
                            </div>
                            <div class="featured-actions">
                                <button class="btn btn-outline-primary">
                                    <i class="bi bi-cart-plus"></i> Add to Cart
                                </button>
                                <button class="btn ${item.type === 'solar' ? 'btn-solar' : 'btn-primary'} btn-sm view-details" data-bs-toggle="modal" data-bs-target="#featuredModal3">
                                    <i class="bi bi-info-circle"></i> Details
                                </button>
                            </div>
                        </div>
            </div>
            

                 */
                    
                    projectsContainer.innerHTML += cardHTML;
                });
                
                // Add event listeners to buttons
                document.querySelectorAll('.view-details').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.dataset.id);
                        const product = equipment.find(p => p.id === id);
                        if (product) {
                            showProductModal(product);
                        }
                    });
                });
                
                document.querySelectorAll('.add-to-cart').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.dataset.id);
                        const product = equipment.find(p => p.id === id);
                        if (product) {
                            addToCart(product);
                        }
                    });
                });
            }
            
            // Show product modal
            function showProductModal(product) {
                currentModalProduct = product;
                
                // Format price
                const priceText = product.price >= 1000000 
                    ? `BWP ${(product.price / 1000000).toFixed(1)}M` 
                    : product.price >= 1000
                        ? `BWP ${(product.price / 1000).toFixed(0)}K` 
                        : `BWP ${product.price}`;
                
                // Format condition
                const conditionMap = {
                    new: "New",
                    used: "Used",
                    refurbished: "Refurbished"
                };
                const conditionText = conditionMap[product.condition] || product.condition;
                
                // Create specs HTML
                const specsHTML = product.specs.map(spec => `<li class="list-group-item">${spec}</li>`).join('');
                
                const modalContent = `
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid rounded">
                        </div>
                        <div class="col-md-6">
                            <h4>${product.name}</h4>
                            <p class="text-muted">${product.manufacturer}</p>
                            <p>${product.description}</p>
                            
                            <div class="spec-grid mt-4">
                                <div class="spec-item">
                                    <div class="spec-value">${priceText}</div>
                                    <div class="spec-label">Price</div>
                                </div>
                                <div class="spec-item">
                                    <div class="spec-value">${product.power} kW</div>
                                    <div class="spec-label">Power</div>
                                </div>
                                <div class="spec-item">
                                    <div class="spec-value">${conditionText}</div>
                                    <div class="spec-label">Condition</div>
                                </div>
                                <div class="spec-item">
                                    <div class="spec-value">${product.location}</div>
                                    <div class="spec-label">Location</div>
                                </div>
                            </div>
                            
                            <h5 class="mt-4">Specifications</h5>
                            <ul class="list-group">
                                ${specsHTML}
                            </ul>
                        </div>
                    </div>
                `;
                
                document.getElementById('modalTitle').textContent = product.name;
                document.getElementById('modalBody').innerHTML = modalContent;
                productModal.show();
            }
            
            // Add to cart
            function addToCart(product) {
                // Check if product already in cart
                const existingItem = cart.find(item => item.id === product.id);
                
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        quantity: 1
                    });
                }
                
                updateCart();
                showToast(`${product.name} added to cart`);
            }
            
            // Update cart display
            function updateCart() {
                cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
                
                // Update cart modal
                if (cart.length === 0) {
                    cartItemsContainer.innerHTML = '<p class="text-center py-3">Your cart is empty</p>';
                    cartTotal.textContent = 'BWP 0';
                    return;
                }
                
                let itemsHTML = '';
                let total = 0;
                
                cart.forEach(item => {
                    const itemTotal = item.price * item.quantity;
                    total += itemTotal;
                    
                    const itemPrice = item.price >= 1000 
                        ? `BWP ${(item.price / 1000).toFixed(0)}K` 
                        : `BWP ${item.price}`;
                    
                    const itemTotalFormatted = itemTotal >= 1000 
                        ? `BWP ${(itemTotal / 1000).toFixed(1)}K` 
                        : `BWP ${itemTotal}`;
                    
                    itemsHTML += `
                        <div class="d-flex align-items-center mb-3">
                            
                            <div class="flex-grow-1">
                                <h6 class="mb-0">${item.name}</h6>
                                <div class="d-flex justify-content-between">
                                    <span>${itemPrice} × ${item.quantity}</span>
                                    <strong>${itemTotalFormatted}</strong>
                                </div>
                            </div>
                            <button class="btn btn-sm btn-outline-danger remove-item" data-id="${item.id}">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    `;
                });
                
                cartItemsContainer.innerHTML = itemsHTML;
                cartTotal.textContent = total >= 1000 
                    ? `BWP ${(total / 1000).toFixed(1)}K` 
                    : `BWP ${total}`;
                
                // Add event listeners to remove buttons
                document.querySelectorAll('.remove-item').forEach(btn => {
                    btn.addEventListener('click', function() {
                        const id = parseInt(this.dataset.id);
                        removeFromCart(id);
                    });
                });
            }
            
            // Remove from cart
            function removeFromCart(id) {
                cart = cart.filter(item => item.id !== id);
                updateCart();
            }
            
            // Show toast notification
            function showToast(message) {
                const toast = document.createElement('div');
                toast.className = 'toast';
                toast.innerHTML = `
                    <i class="bi bi-check-circle-fill"></i>
                    <div class="toast-body">
                        <div class="toast-title">Success!</div>
                        <div>${message}</div>
                    </div>
                `;
                
                toastContainer.appendChild(toast);
                
                // Auto remove after 3 seconds
                setTimeout(() => {
                    toast.remove();
                }, 3000);
            }
            
            // Render pagination controls
            function renderPagination() {
                paginationContainer.innerHTML = '';
                
                const perPage = window.innerWidth <= 767 ? 6 : 9;
                const totalPages = Math.ceil(filteredProjects.length / perPage);
                currentPageSpan.textContent = currentPage;
                totalPagesSpan.textContent = totalPages;
                
                if (totalPages <= 1) {
                    return;
                }
                
                // Previous button
                let prevClass = currentPage === 1 ? 'disabled' : '';
                paginationContainer.innerHTML += `
                    <li class="page-item ${prevClass}">
                        <a class="page-link" href="#" data-page="${currentPage - 1}">
                            <i class="bi bi-chevron-left"></i>
                        </a>
                    </li>
                `;
                
                // Page numbers
                for (let i = 1; i <= totalPages; i++) {
                    let activeClass = i === currentPage ? 'active' : '';
                    paginationContainer.innerHTML += `
                        <li class="page-item ${activeClass}">
                            <a class="page-link" href="#" data-page="${i}">${i}</a>
                        </li>
                    `;
                }
                
                // Next button
                let nextClass = currentPage === totalPages ? 'disabled' : '';
                paginationContainer.innerHTML += `
                    <li class="page-item ${nextClass}">
                        <a class="page-link" href="#" data-page="${currentPage + 1}">
                            <i class="bi bi-chevron-right"></i>
                        </a>
                    </li>
                `;
                
                // Add event listeners to pagination links
                document.querySelectorAll('.page-link').forEach(link => {
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        const page = parseInt(this.dataset.page);
                        if (!isNaN(page)) {
                            currentPage = page;
                            renderProjects();
                            renderPagination();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    });
                });
            }
            
            // Helper function to get checked values by filter type
            function getCheckedValues(filterType) {
                return Array.from(document.querySelectorAll(`input[data-filter="${filterType}"]:checked`))
                    .map(checkbox => checkbox.value);
            }
            
            // Mobile filter toggle
            mobileFilterToggle.addEventListener('click', function() {
                sidebar.classList.add('mobile-visible');
                overlay.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
            
            closeSidebar.addEventListener('click', function() {
                sidebar.classList.remove('mobile-visible');
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            });
            
            overlay.addEventListener('click', function() {
                sidebar.classList.remove('mobile-visible');
                overlay.style.display = 'none';
                document.body.style.overflow = '';
            });
            
            // Update slider values display
            powerSlider.addEventListener('input', function() {
                maxPowerDisplay.textContent = `${this.value} kW`;
            });
            
            priceSlider.addEventListener('input', function() {
                const value = parseInt(this.value);
                maxPriceDisplay.textContent = value >= 1000000 
                    ? `${(value / 1000000).toFixed(1)}M+` 
                    : `${(value / 1000).toFixed(0)}K+`;
            });
            
            // Event listeners
            applyFiltersBtn.addEventListener('click', applyFilters);
            searchButton.addEventListener('click', applyFilters);
            
            resetFiltersBtn.addEventListener('click', function() {
                // Reset checkboxes - solar checked, others unchecked
                filterCheckboxes.forEach(checkbox => {
                    if (checkbox.id === 'solarCheck' || 
                        checkbox.id === 'newCheck' || 
                        checkbox.id === 'usedCheck') {
                        checkbox.checked = true;
                    } else {
                        checkbox.checked = false;
                    }
                });
                
                // Reset sliders
                powerSlider.value = 1000;
                priceSlider.value = 5000000;
                maxPowerDisplay.textContent = "1000 kW";
                maxPriceDisplay.textContent = "5M+";
                
                // Reset search
                searchInput.value = '';
                
                // Apply filters
                applyFilters();
            });
            
            // Apply filters on search
            searchInput.addEventListener('keyup', applyFilters);
            
            // Apply filters on checkbox change
            filterCheckboxes.forEach(checkbox => {
                checkbox.addEventListener('change', applyFilters);
            });
            
            // Apply filters on slider change
            powerSlider.addEventListener('change', applyFilters);
            priceSlider.addEventListener('change', applyFilters);
            
            // Add to cart from modal
            modalAddToCart.addEventListener('click', function() {
                if (currentModalProduct) {
                    addToCart(currentModalProduct);
                    productModal.hide();
                }
            });
            
            // Initialize filters
            applyFilters();
        });
})()