const API_BASE_URL = 'http://localhost:3000/api/sweets';

// Fetch all sweets
export async function fetchSweets() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch sweets');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching sweets:', error);
        throw error;
    }
}

// Add a new sweet
export async function addSweet(sweetData) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sweetData),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to add sweet');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error adding sweet:', error);
        throw error;
    }
}

// Delete a sweet
export async function deleteSweet(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete sweet');
        }
        
        return true;
    } catch (error) {
        console.error('Error deleting sweet:', error);
        throw error;
    }
}

// Search sweets
export async function searchSweets(query) {
    try {
        const queryString = new URLSearchParams(query).toString();
        const response = await fetch(`${API_BASE_URL}/search?${queryString}`);
        
        if (!response.ok) {
            throw new Error('Failed to search sweets');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error searching sweets:', error);
        throw error;
    }
}

// Sort sweets
export async function sortSweets(sortBy) {
    try {
        const response = await fetch(`${API_BASE_URL}/sort?sort=${sortBy}`);
        
        if (!response.ok) {
            throw new Error('Failed to sort sweets');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error sorting sweets:', error);
        throw error;
    }
}

// Purchase sweet
export async function purchaseSweet(id, quantity) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: parseInt(quantity) }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to purchase sweet');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error purchasing sweet:', error);
        throw error;
    }
}

// Restock sweet
export async function restockSweet(id, quantity) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}/restock`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ quantity: parseInt(quantity) }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to restock sweet');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error restocking sweet:', error);
        throw error;
    }
}