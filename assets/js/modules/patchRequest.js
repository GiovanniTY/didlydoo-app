import { closeModale } from './eventModale.js';

/**
 * create New Event dans l'api via une methode Post
 * @param {*} dataBody données retournées par la formulaire ' add Event '
 */
export async function patchEvent(dataBody, id) {

    try {
        const response = await fetch("http://localhost:3000/api/events/" + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataBody),
        });

        const result = await response.json();
        closeModale('#createEvent')
        location.reload()

        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}