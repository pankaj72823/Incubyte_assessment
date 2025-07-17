import { 
    fetchSweets, 
    addSweet, 
    deleteSweet, 
    searchSweets, 
    sortSweets, 
    restockSweet 
} from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    // DOM elements
    const sweetsList = document.getElementById('sweetsList');
    const addForm = document.getElementById('addForm');
    const showAddForm = document.getElementById('showAddForm');
    const cancelAdd = document.getElementById('cancelAdd');
    const addSweetForm = document.getElementById('addSweetForm');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    
    // Load sweets on page load
    await loadSweets();
    
    // Toggle add form visibility
    showAddForm.addEventListener('click', () => {
        addForm.classList.remove('hidden');
    });
    
    cancelAdd.addEventListener('click', () => {
        addForm.classList.add('hidden');
        addSweetForm.reset();
    });
    
    // Add new sweet
    addSweetForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const sweetData = {
            name: document.getElementById('name').value,
            category: document.getElementById('category').value || 'uncategorized',
            price: parseFloat(document.getElementById('price').value),
            quantity: parseInt(document.getElementById('quantity').value)
        };
        
        try {
            await addSweet(sweetData);
            addForm.classList.add('hidden');
            addSweetForm.reset();
            await loadSweets();
        } catch (error) {
            alert(error.message);
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', debounce(async () => {
        const query = searchInput.value.trim();
        if (query) {
            try {
                const results = await searchSweets({ name: query });
                renderSweets(results);
            } catch (error) {
                console.error('Search error:', error);
            }
        } else {
            await loadSweets();
        }
    }, 300));
    
    // Sort functionality
    sortSelect.addEventListener('change', async () => {
        const sortBy = sortSelect.value;
        if (sortBy) {
            try {
                const sorted = await sortSweets(sortBy);
                renderSweets(sorted);
            } catch (error) {
                console.error('Sort error:', error);
            }
        } else {
            await loadSweets();
        }
    });
    
    // Load sweets from API
    async function loadSweets() {
        try {
            const sweets = await fetchSweets();
            renderSweets(sweets);
        } catch (error) {
            console.error('Error loading sweets:', error);
            sweetsList.innerHTML = '<p class="error">Failed to load sweets. Please try again later.</p>';
        }
    }
    
    // Render sweets to the DOM
    function renderSweets(sweets) {
        if (sweets.length === 0) {
            sweetsList.innerHTML = '<p>No sweets found.</p>';
            return;
        }
        
        sweetsList.innerHTML = sweets.map(sweet => `
            <div class="sweet-card" data-id="${sweet._id}">
                <h3>${sweet.name}</h3>
                <p class="category">${sweet.category}</p>
                <p class="price">₹${sweet.price.toFixed(2)}</p>
                <p class="quantity ${sweet.quantity < 10 ? 'low-stock' : ''} ${sweet.quantity === 0 ? 'out-of-stock' : ''}">
                    Stock: ${sweet.quantity}
                </p>
                <div class="actions">
                    <button class="btn delete-btn" data-id="${sweet._id}">Delete</button>
                    <div class="restock-form">
                        <input type="number" id="restock-${sweet._id}" min="1" value="10">
                        <button class="btn restock-btn" data-id="${sweet._id}">Restock</button>
                    </div>
                </div>
            </div>
        `).join('');
        
        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                if (confirm('Are you sure you want to delete this sweet?')) {
                    try {
                        await deleteSweet(id);
                        await loadSweets();
                    } catch (error) {
                        alert(error.message);
                    }
                }
            });
        });
        
        // Add event listeners to restock buttons
        document.querySelectorAll('.restock-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const quantityInput = document.getElementById(`restock-${id}`);
                const quantity = parseInt(quantityInput.value);
                
                if (isNaN(quantity)) {
                    alert('Please enter a valid quantity');
                    return;
                }
                
                try {
                    await restockSweet(id, quantity);
                    await loadSweets();
                } catch (error) {
                    alert(error.message);
                }
            });
        });
    }
    
    // Debounce function for search input
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }
});