import { products } from './products.js';
import { saveCart, loadCart } from './storage.js';

export const state = {
    products: products,
    cart: loadCart() // [{ productId, quantity }] loaded from storage
};

export function addToCart(productId) {
    const numericId = Number(productId);
    const existing = state.cart.find(item => item.productId === numericId);
    
    if (existing) {
        existing.quantity++;
    } else {
        state.cart.push({ productId: numericId, quantity: 1 });
    }
    
    saveCart(state.cart);
}

export function updateQuantity(productId, quantity) {
    const numericId = Number(productId);
    const item = state.cart.find(item => item.productId === numericId);
    
    if (item) {
        item.quantity = parseInt(quantity, 10);
        if (item.quantity <= 0) {
            removeFromCart(numericId);
        } else {
            saveCart(state.cart);
        }
    }
}

export function removeFromCart(productId) {
    const numericId = Number(productId);
    state.cart = state.cart.filter(item => item.productId !== numericId);
    saveCart(state.cart);
}

export function clearCartState() {
    state.cart = [];
    saveCart(state.cart);
}

export function getCartTotal() {
    return state.cart.reduce((total, item) => {
        const product = state.products.find(p => p.id === item.productId);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}
