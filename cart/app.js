import { state, addToCart, removeFromCart, clearCartState } from './state.js';
import { renderProducts, renderCart } from './ui.js';

function init() {
    // Initial UI render
    renderProducts(state.products, handleAdd);
    renderCart(state, handleRemove, handleClear);
}

function handleAdd(productId) {
    addToCart(productId);
    renderCart(state, handleRemove, handleClear);
}

function handleRemove(productId) {
    removeFromCart(productId);
    renderCart(state, handleRemove, handleClear);
}

function handleClear() {
    clearCartState();
    renderCart(state, handleRemove, handleClear);
}

// Run app initialization on load
init();