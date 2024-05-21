import {displayEvents ,  displayAttendees , displayAttendee} from './modules/getRequest.js'
import { toggleDarkMode } from './darkmode.js';




document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.getElementById('dark-mode-btn');
    darkModeButton.addEventListener('click', toggleDarkMode);

    displayEvents()
});
