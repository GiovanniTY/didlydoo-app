import { displayEvents , displayMessage} from './getRequest.js'
import { closeModale } from './eventModale.js';

/**
 * create New Event dans l'api via une methode Post
 * @param {*} dataBody données retournées par la formulaire ' add Event '
 */
export async function postEvent(dataBody) {

    try {
        const response = await fetch("http://localhost:3000/api/events/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataBody),
        });

        const result = await response.json();
        closeModale('#createEvent')
        displayMessage('Success : Add Event' + dataBody.name)

        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
        closeModale('#createEvent')
        displayMessage('Error : Add event' + dataBody.name)
    }
}


export async function postDates(id, dataBody) {

    try {
        const response = await fetch("http://localhost:3000/api/events/" + id + "/add_dates", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataBody),
        });

        const result = await response.json();
        closeModale('#ajouterDates')
        displayMessage('Success : Add Date(s) : ' + dataBody.dates)

        console.log(id,dataBody);
       console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
        closeModale('#ajouterDates')
        displayMessage('Success : Add Date(s) : ' + dataBody.dates)
    }
}