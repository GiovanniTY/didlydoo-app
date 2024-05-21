

/**
 * Affiche tous les evenements 
 */
export function displayEvents(id){
    fetch('http://localhost:3000/api/events/'+id)
    .then(response => {
        if (!response.ok) {
            console.log('no found')
        }
        return response.json();
    })
    .then(dataEvent => {
        creatDomEvent(dataEvent);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}
/**
 * Affiche les participants
 */
export function displayAttendees(){
    fetch('http://localhost:3000/api/attendees/')
    .then(response => {
        if (!response.ok) {
            console.log('no found')
        }
        return response.json();
    })
    .then(dataAttendee => {
        for (const data of dataAttendee) {
            console.log(data.name);
        }
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}
/**
 * affiche un partiicpant selectionner 
 * @param {*} name nom du participant
 */
export function displayAttendee(name){
    fetch('http://localhost:3000/api/attendees/' + name)
    .then(response => {
        if (!response.ok) {
            console.log('no found')
        }
        return response.json();
    })
    .then(dataAttendee => {
        console.log(dataAttendee.name);
    })
    .catch(error => {
        console.error('Erreur:', error);
    });
}


function creatDomEvent(data){

    //console.log(data);
    // creat section
    const mainElem = document.querySelector('main')
    const sectionElem = document.createElement('section')
    mainElem.appendChild(sectionElem)

}