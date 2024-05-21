import { toggleDarkMode } from './darkmode.js';

document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.getElementById('dark-mode-btn');
    darkModeButton.addEventListener('click', toggleDarkMode);
});
