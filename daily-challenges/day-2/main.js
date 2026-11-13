const searchInput = document.querySelector('#search-input');
const historyDropdown = document.querySelector('#search-history-dropdown');

let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];

function renderHistory() {
    if (recentSearches.length == 0) {
        historyDropdown.style.display = 'none';
        return;
    }

    historyDropdown.innerHTML = '';
    recentSearches.forEach(term => {
        const li = document.createElement('li');
        li.textContent = term;
        li.style.padding = '8px';
        li.style.cursor = 'pointer';

        li.addEventListener('click' , () => {
            searchInput.value = term;
            historyDropdown.style.display = "none";
        });

        historyDropdown.appendChild(li);
        
    });
    historyDropdown.style.display = 'block';
}

searchInput.addEventListener('focus', () => {
    if (recentSearches.length > 0) renderHistory();
});

searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const term = searchInput.value.trim();
        if (term) {
            recentSearches = [term, ...recentSearches.filter(item => item !== term)];

            recentSearches = recentSearches.slice(0, 5);

            localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
            historyDropdown.style.display = 'none';
        }
    }
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
        historyDropdown.style.display = 'none';
    }
});