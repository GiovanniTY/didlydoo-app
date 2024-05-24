import { displayEvents, displayMessage } from './getRequest.js'
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

/**
 * Ajoute des date dans un event
 * @param {*} id de l'event
 * @param {Array} dataBody array qui regroupe tous les dates selectionnées
 */
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
        closeModale('#ajouterDates') // Close le modale 
        displayMessage('Success : Add Date(s) : ' + dataBody.dates) // modale avec message du status

        console.log(id, dataBody);
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
        closeModale('#ajouterDates')
        displayMessage('Success : Add Date(s) : ' + dataBody.dates)
    }
}
/**
 * Ajout une Attend dans un event
 * @param {*} id de l'event
 * @param {Array} dataBody regroupe les dates de l'event et la disponibilité 
 * @param {*} name de l'attend
 */
export async function postAttend(id, dataBody, name) {
    console.log(id,dataBody,name);
    try {
        const response = await fetch("http://localhost:3000/api/events/" + id + "/attend", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                dates: dataBody
            })
        });

        const result = await response.json();
        closeModale('#ajouterDisponibilite')
        displayMessage('Success : Add Date(s) pour  : ' + name)

        console.log(id, dataBody);
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
        closeModale('#ajouterDisponibilite')
        displayMessage('Success : Add Date(s) : ' + name)
    }
}