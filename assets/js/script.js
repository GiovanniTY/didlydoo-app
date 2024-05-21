<<<<<<< HEAD
import {displayEvents ,  displayAttendees , displayAttendee} from './modules/getRequest.js'

const id =''
const name = 'Michou'

displayEvents(id)
displayAttendees()
displayAttendee(name)
=======
import { toggleDarkMode } from './darkmode.js';

document.addEventListener('DOMContentLoaded', () => {
    const darkModeButton = document.getElementById('dark-mode-btn');
    darkModeButton.addEventListener('click', toggleDarkMode);
});
>>>>>>> dev
