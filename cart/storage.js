export function saveCart(cartItems) {
    try {
        localStorage.setItem('shopping_cart', JSON.stringify(cartItems));
    } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
    }
}

export function loadCart() {
    try {
        const data = localStorage.getItem('shopping_cart');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
        return [];
    }
}
