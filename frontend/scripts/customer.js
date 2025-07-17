import { 
    fetchSweets, 
    searchSweets, 
    sortSweets, 
    purchaseSweet 
} from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const customerSweets = document.getElementById('customerSweets');
    const customerSearch = document.getElementById('customerSearch');
    const customerSort = document.getElementById('customerSort');
    
    await loadSweets();
    
    customerSearch.addEventListener('input', debounce(async () => {
        const query = customerSearch.value.trim();
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
    
    customerSort.addEventListener('change', async () => {
        const sortBy = customerSort.value;
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
    
    async function loadSweets() {
        try {
            const sweets = await fetchSweets();
            renderSweets(sweets);
        } catch (error) {
            console.error('Error loading sweets:', error);
            customerSweets.innerHTML = '<p class="error">Failed to load sweets. Please try again later.</p>';
        }
    }
    
    function renderSweets(sweets) {
        if (sweets.length === 0) {
            customerSweets.innerHTML = '<p>No sweets found.</p>';
            return;
        }
        
        customerSweets.innerHTML = sweets.map(sweet => `
            <div class="sweet-card ${sweet.quantity === 0 ? 'unavailable' : ''}" data-id="${sweet._id}">
                <h3>${sweet.name}</h3>
                <p class="category">${sweet.category}</p>
                <p class="price">₹${sweet.price.toFixed(2)}</p>
                <p class="quantity">
                    Available: ${sweet.quantity}
                </p>
                ${sweet.quantity > 0 ? `
                <div class="purchase-form">
                    <input type="number" id="purchase-${sweet._id}" min="1" max="${sweet.quantity}" value="1">
                    <button class="btn purchase-btn" data-id="${sweet._id}">Purchase</button>
                </div>
                ` : ''}
            </div>
        `).join('');
        
        document.querySelectorAll('.purchase-btn').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const quantityInput = document.getElementById(`purchase-${id}`);
                const quantity = parseInt(quantityInput.value);
                const max = parseInt(quantityInput.max);
                
                if (isNaN(quantity) || quantity < 1) {
                    alert('Please enter a valid quantity');
                    return;
                }
                
                if (quantity > max) {
                    alert(`Only ${max} items available`);
                    return;
                }
                
                try {
                    const updatedSweet = await purchaseSweet(id, quantity);
                    alert(`Successfully purchased ${quantity} ${quantity === 1 ? 'item' : 'items'} of ${updatedSweet.name}`);
                    await loadSweets();
                } catch (error) {
                    alert(error.message);
                }
            });
        });
    }
    
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