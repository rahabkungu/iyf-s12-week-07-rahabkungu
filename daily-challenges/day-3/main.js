const form = document.querySelector('#auto-save-form');
const STORAGE_KEY = 'form-draft';

window.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        const formData = JSON.parse(savedData);
        Object.keys(formData).forEach(name => {
            const field = form.elements[name];
            if (field) field.value = formData[name];
        });
    }
});

const getFormData = () => {
    const data = {};
    Array.from(form.elements).forEach(element => {
        if (element.name) data[element.name] = element.value;
    });
    return DataTransfer;
}

setInterval(() => {
    const data = getFormData();

    if (Object.value(data).some(val => val.trim() !== '')) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
}, 5000);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.removeItem(STORAGE_KEY);
    alert('Form submitted successfully and draft cleared!');
    form.reset();
});