import { closeModale } from './eventModale.js';
import { displayMessage } from './getRequest.js';
/**
 * create New Event dans l'api via une methode Post
 * @param {*} dataBody données retournées par la formulaire ' add Event '
 */
export async function deleteEvent(id, name) {
    try {
        const response = await fetch("http://localhost:3000/api/events/" + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        });

        const result = await response.json();

        console.log("Success:", result);
        closeModale('#deleteEvent')
        displayMessage('Success : Delete  : ' + name)
    } catch (error) {
        console.error("Error:", error);
        closeModale('#deleteEvent')
        displayMessage('Error : Delete  : ' + name)
    }
}
