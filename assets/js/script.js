import { displayEvents, displayAttendees, displayAttendee, displayAddEvent } from './modules/getRequest.js'
import { toggleDarkMode } from './darkmode.js';
import { closeModale } from './modules/eventModale.js';



document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.getElementById('dark-mode-btn');
    darkModeButton.addEventListener('click', toggleDarkMode);

    // event btn Add Event
    const btnAddEvent = document.querySelector('#addEvent')
    btnAddEvent.addEventListener('click', event => {
        displayAddEvent('post')
    })

    // close modale Event
    const btnCloseCreateEvent = document.querySelector('#closeCreateEvent')
    btnCloseCreateEvent.addEventListener('click', event => {
        closeModale('#createEvent')
    })

    // close modale Add date
    const btnCloseAddDates = document.querySelector('#closeAjouterDates')
    btnCloseAddDates.addEventListener('click', event => {
        closeModale('#ajouterDates')
    })

    displayEvents()
});
