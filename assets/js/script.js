import {displayEvents ,  displayAttendees , displayAttendee , displayAddEvent} from './modules/getRequest.js'
import { toggleDarkMode } from './darkmode.js';




document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.getElementById('dark-mode-btn');
    darkModeButton.addEventListener('click', toggleDarkMode);

    // event btn Add Event
    const btnAddEvent = document.querySelector('#addEvent')
    btnAddEvent.addEventListener('click',event =>{
        displayAddEvent('post')
    })

    displayEvents()
});
