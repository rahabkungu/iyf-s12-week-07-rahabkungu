export function renderProducts(products, onAdd) {
    const container = document.querySelector('#products-container');
    container.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div>
                <span style="font-size: 22px; margin-right: 8px;">${product.image}</span>
                <strong>${product.name}</strong> - $${product.price.toFixed(2)}
            </div>
            <button data-id="${product.id}">Add to Cart</button>
        `;
        container.appendChild(card);
    });

    container.onclick = (e) => {
        if (e.target.tagName === 'BUTTON') {
            onAdd(e.target.dataset.id);
        }
    };
}

export function renderCart(state, onRemove, onClear) {
    const itemsList = document.querySelector('#cart-items-list');
    const emptyMsg = document.querySelector('#empty-cart-msg');
    const clearBtn = document.querySelector('#clear-cart-btn');
    const totalEl = document.querySelector('#cart-total');

    itemsList.innerHTML = '';

    if (state.cart.length === 0) {
        emptyMsg.style.display = 'block';
        clearBtn.style.display = 'none';
        totalEl.textContent = '0.00';
        return;
    }

    emptyMsg.style.display = 'none';
    clearBtn.style.display = 'block';

    let total = 0;

    state.cart.forEach(cartItem => {
        const product = state.products.find(p => p.id === cartItem.productId);
        if (!product) return;

        const subtotal = product.price * cartItem.quantity;
        total += subtotal;

        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <span>${product.name} (x${cartItem.quantity})</span>
            <div>
                <span>$${subtotal.toFixed(2)}</span>
                <button data-id="${product.id}" class="danger-btn" style="padding: 2px 6px; margin-left: 6px;">Remove</button>
            </div>
        `;
        itemsList.appendChild(itemEl);
    });

    totalEl.textContent = total.toFixed(2);

    itemsList.onclick = (e) => {
        if (e.target.tagName === 'BUTTON') {
            onRemove(e.target.dataset.id);
        }
    };

    clearBtn.onclick = onClear;
}
