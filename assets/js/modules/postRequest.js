import { displayEvents } from './getRequest.js'

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
        window.location
        

        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}
