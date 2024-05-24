const btnEdit = document.querySelector('.btn-edit');


import { closeModale } from './eventModale.js';
import { displayMessage } from './getRequest.js';

/**
 * Modifie New Event dans l'api via une methode Post
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
        closeModale('#createEvent') // Close le modale 
        displayMessage('Success : Patch event : ' + dataBody.name) // modale avec message du status

        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
        closeModale('#createEvent')
        displayMessage('Error : Patch event : ' + dataBody.name)
    }
}
/**
 * Modifie attend  dans l'api via une methode Post
 * @param {*} id de l'event
 * @param {*} dataBody donnée des modifications dates
 * @param {*} name de l'attend
 */
export async function patchAttend(id, dataBody, name) {
    console.log(id,dataBody,name,);
    try {
        const response = await fetch("http://localhost:3000/api/events/"+ id +"/attend", {
            method: "PATCH",
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
        displayMessage('Success : Patch Date(s) pour  : ' + name)

        console.log(id, dataBody);
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
        closeModale('#ajouterDisponibilite')
        displayMessage('Success : Patch Date(s) : ' + name)
    }
}