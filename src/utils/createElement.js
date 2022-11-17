function createElement(tag = 'div', options = {}) {
    const element = document.createElement(tag);
    for (const key in options) {
        element[key] = options[key];
    }
    return element
}

export default createElement;

// Функция создания элементов, как на flash