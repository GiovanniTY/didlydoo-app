import { postEvent, postDates, postAttend } from "./postRequest.js"
import { patchEvent } from "./patchRequest.js"
import { closeModale } from "./eventModale.js"


/**
 * Affiche tous les evenements 
 */
export function displayEvents() {
    fetch('http://localhost:3000/api/events/')
        .then(response => {
            if (!response.ok) {
                console.log('no found')
            }
            return response.json()
        })
        .then(dataEvent => {
            creatDomEvent(dataEvent)
        })
        .catch(error => {
            console.error('Erreur:', error)
        })
}
/**
 * Affiche tous les evenements 
 */
export async function displayEvent(id) {
    try {
        const response = await fetch('http://localhost:3000/api/events/' + id);
        if (!response.ok) {
            console.log('Not found');
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}
/**
 * Affiche les participants
 */
export function displayAttendees() {
    fetch('http://localhost:3000/api/attendees/')
        .then(response => {
            if (!response.ok) {
                console.log('no found')
            }
            return response.json()
        })
        .then(dataAttendee => {
            for (const data of dataAttendee) {
                console.log(data.name)
            }
        })
        .catch(error => {
            console.error('Erreur:', error)
        })
}
/**
 * affiche un partiicpant en fonction de son nom
 * @param {*} name nom du participant
 */
export async function displayAttendee(name) {
    try {
        const response = await fetch('http://localhost:3000/api/attendees/' + name);
        if (!response.ok) {
            console.log('Not found');
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erreur:', error);
        return null;
    }
}

/**
 * récupère les données dans le form Add Event 
 * envoi ces données dans l'api via une fucntion post ou patch
 * @param {*} methode d'envoi des donnée pour l'api
 * @param {*} id de l'event a modifier (methode Patch)
 */
export async function displayAddEvent(methode, id) {

    let arrayBody = []

    //show modale
    const modale = document.querySelector('#createEvent')
    modale.style.display = 'block'

    //data Element 
    const form = document.querySelector('#createEventForm')
    const eventName = document.querySelector('#eventName')
    const eventDescription = document.querySelector('#eventDescription')
    const AuteurEven = document.querySelector('#AuteurEven')
    const btnSubmitEvent = document.querySelector('#submitEvent')
    const titleParent = document.querySelector('#createEvent')
    const title = titleParent.querySelector('h2')

    if (methode == 'post') {
        btnSubmitEvent.innerHTML = 'Add Event'
    } else {
        btnSubmitEvent.innerHTML = "Patch Event"

        try {
            const dataEvent = await displayEvent(id)
            eventName.value = dataEvent.name
            eventDescription.value = dataEvent.description
            AuteurEven.value = dataEvent.author

            title.innerHTML = 'Patch un événement : ' + dataEvent.name
        } catch (error) {
            console.error('Error processing data:', error)
        }
    }
    /**
     * Event click
     * en fonction de la methode ceci appel une fonction
     * Post :: verifie si tous les input sont encodées, si pas message errer dans le modale
     */
    btnSubmitEvent.addEventListener('click', event => {
        event.preventDefault()

        if (methode == 'post' && eventName.value != '' & eventDescription.value != '' && AuteurEven.value != '') {
            arrayBody = {
                "name": eventName.value,
                "description": eventDescription.value,
                "author": AuteurEven.value,
                "dates": []
            }
            postEvent(arrayBody)
        } else if (methode == 'patch') {
            arrayBody = {
                "name": eventName.value,
                "description": eventDescription.value,
                "author": AuteurEven.value,
            }
            patchEvent(arrayBody, id)
        } else {
            const eventNameError = modale.querySelector('#eventNameError')
            const eventDescriptionError = modale.querySelector('#eventDescriptionError')
            const auteurEvenError = modale.querySelector('#AuteurEvenError')

            //refresh input
            eventNameError.innerHTML = ''
            eventDescriptionError.innerHTML = ''
            auteurEvenError.innerHTML = ''

            if (eventName.value == '')
                eventNameError.innerHTML = 'Requis'
            if (eventDescription.value == '')
                eventDescriptionError.innerHTML = 'Requis'
            if (AuteurEven.value == '')
                auteurEvenError.innerHTML = 'Requis'

        }
    })
}
/**
 * Ajote des dates
 * @param {*} id event
 */
async function displayAddDate(id) {

    let arrayBody = []
    let arrayDates = []
    let arrayDatesSelected = []

    //curent Date
    const currentDate = new Date()
    const currentDateMonth = ((currentDate.getMonth() + 1) < 9) ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)
    const currentDateDate = (currentDate.getDate() < 9) ? '0' + currentDate.getDate() : currentDate.getDate()
    const curentDateFormat = currentDate.getFullYear() + '-' + currentDateMonth + '-' + currentDateDate

    //show modale
    const modale = document.querySelector('#ajouterDates')
    modale.style.display = 'block'

    const addDatesFrom = document.querySelector('#ajouterDatesForm')
    const date = addDatesFrom.querySelector('#disponibilite')
    date.setAttribute('min', curentDateFormat);
    const btnSubmitDate = addDatesFrom.querySelector('#btnAddDate')
    btnSubmitDate.innerHTML = 'Add Date'

    const theadElem = document.querySelector('thead')
    const dateSlected = theadElem.querySelectorAll('th')

    const datesSlected = document.querySelector('#datesSelected')
    /**
     * recupere les data de l'event (id) dans l'api
     */
    try {
        const dataEvent = await displayEvent(id)
        for (const data of dataEvent.dates) {
            arrayDates.push(data.date)
        }
        /**
         * event Change add date
         * Verifie si la date existe ==>
         * oui : message erreur
         * Non: Ajout dans un element la date et un bouton delete
         */
        date.addEventListener('change', event => {
            let dateValue = date.value

            // création en DOME de la zone de selection de date
            if (parseInt(arrayDates.indexOf(dateValue)) >= 0) {
                alert(dateValue + ' se trouve dans l\'evenement')

            } else {
                const selected = document.createElement('div')
                const btnDateSelected = document.createElement('button')
                datesSlected.appendChild(selected)
                selected.innerHTML = dateValue
                selected.classList.add('date-selected')
                selected.appendChild(btnDateSelected)
                btnDateSelected.innerHTML = 'X'

                arrayDatesSelected.push(dateValue)

                //supressionde la date
                btnDateSelected.addEventListener('click', event => {
                    event.preventDefault()
                    datesSlected.removeChild(selected)
                    let datesPostion = arrayDatesSelected.indexOf(dateValue)
                    arrayDatesSelected.splice(datesPostion, 1)

                    arrayDates = []
                })
            }
        })
        // event Click Submit
        btnSubmitDate.addEventListener('click', event => {
            event.preventDefault()
            arrayBody = {
                "dates":
                    arrayDatesSelected
            }
            postDates(id, arrayBody)
        })
    } catch (error) {
        console.error('Error processing data:', error);
    }
}
/**
 * Ajouter un new attend dans event
 * @param {*} id de l'event
 */
export async function displayAddAttend(id) {

    let arrayDates = []
    let arrayDatesSelected = []
    let arrayNmaExists = []
    let cpt = 0
    let nameExist

    //show modale
    const modale = document.querySelector('#ajouterDisponibilite')
    modale.style.display = 'block'
    const dateAttend = modale.querySelector('.date-attend')
    const btnSubmit = modale.querySelector('#submitDisponibilite')
    const name = modale.querySelector('#attend')
    dateAttend.innerHTML = '' //initialise l'element

    /**
     * recupere les données des dates dans l'api
     */
    try {
        const dataEvent = await displayEvent(id)
        /**
         * event du Changement de l'input name 
         * Verifie via les data de l'api si le name existe deja dans l'event 
         */
        name.addEventListener('change', async event => {

            try {
                const dataAttend = await displayAttendee(name.value)

                for (const event of dataAttend.events) {
                    arrayNmaExists.push(event.id)
                }
                const idString = id
                nameExist = arrayNmaExists.indexOf(idString)
                console.log(nameExist);
                console.log('iD:' + arrayNmaExists);
                console.log(id.toString());

            } catch (error) {
                console.error('Error processing data:', error);
            }
        })
        /**
         * Si il n'y a pas de dates dans l'event 
         * Affiche le modal Adddates et ferme le modale AddAttend
         */
        if (dataEvent.dates.length == 0) {
            displayAddDate(id)
            closeModale('#ajouterDisponibilite')

        } else {
            for (const data of dataEvent.dates) {
                /**
                 * recupere les data de l'api et affiche via DOM les disponibilitées
                 */
                const dateBox = document.createElement('div')
                const label = document.createElement('lable')
                const checkBox = document.createElement('input')
                checkBox.setAttribute('type', 'checkbox')

                dateAttend.appendChild(dateBox)
                dateBox.appendChild(label)
                label.innerHTML = data.date
                label.setAttribute('for', 'checkBox' + cpt)
                dateBox.appendChild(checkBox)
                checkBox.id = 'checkBox' + cpt
                checkBox.checked = false

                arrayDates.push(data.date)

                cpt++
            }
            /**
             * envent click du bouton Submit
             */
            btnSubmit.addEventListener('click', event => {

                event.preventDefault()
                if (name.value != '' && nameExist === -1) { 

                    for (let i = 0; i < arrayDates.length; i++) {
                        const checkBoxSelected = dateAttend.querySelector('#checkBox' + i)
                        console.log(checkBoxSelected.checked);

                        const selected = "available:" + checkBoxSelected.checked
                        arrayDatesSelected.push({ date: arrayDates[i], available: checkBoxSelected.checked })
                    }

                    postAttend(id, arrayDatesSelected, name.value)
                } else {
                    // indique les messages d'erruer 
                    const disponibiliteError = modale.querySelector('#disponibiliteError')

                    if (name.value == '')
                        disponibiliteError.innerHTML = 'Requis'

                    if (nameExist <= 0)
                        disponibiliteError.innerHTML = 'Attendee ' +name.value+ ' already exists'
                }
            })
        }
        //console.log(arrayDates);
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

/**
 * Création des events via le DOM
 * @param {*} data de l'api
 */
function creatDomEvent(data) {


    // create DOMsection
    const mainElem = document.querySelector('main')
    const sectionElem = document.createElement('section')
    const btnAddEvent = document.querySelector('#addEvent')

    mainElem.appendChild(sectionElem)

    for (const event of data) {

        let arrayDates = []
        let arrayAttendees = []

        let idEvent = event.id

        //create DOM Event
        const eventElem = document.createElement('div')
        sectionElem.appendChild(eventElem)
        eventElem.id = event.id
        eventElem.classList.add('events-list')

        // create DOM Name
        const eventNameElem = document.createElement('div')
        eventElem.appendChild(eventNameElem)
        eventNameElem.classList.add('events-list-title')
        eventNameElem.innerHTML = event.name + ' ( ' + event.author + ' )'

        // create DOM Description
        const eventDescriptionElem = document.createElement('div')
        eventElem.appendChild(eventDescriptionElem)
        eventDescriptionElem.classList.add('events-list-description')
        eventDescriptionElem.innerHTML = event.description

        // create DOM attendess
        arrayDates = [...event.dates]
        // create DOm table
        const availabilityElem = document.createElement('div')
        eventElem.appendChild(availabilityElem)
        availabilityElem.classList.add('events-availability')

        if (arrayDates != 0) {
            const tableElem = document.createElement('table')
            availabilityElem.appendChild(tableElem)

            // create  de thead
            const thead = document.createElement('thead')
            const headerRow = document.createElement('tr')
            tableElem.appendChild(thead)
            thead.appendChild(headerRow)
            const th = document.createElement('th')
            headerRow.appendChild(th)
            th.innerHTML = 'name'

            //create de tbody
            const tbody = document.createElement('tbody')
            tableElem.appendChild(tbody)

            /**
             * recupere les date et les disponibilté par user 
             * ex : Jean-Daniel {2022-03-17: false, 2022-03-18: null, 2022-03-21: true, 2022-03-22: null
             */

            console.log(arrayDates);

            if (arrayDates != 0) {

            }
            for (const availability of arrayDates) {

                const thDate = document.createElement('th')
                headerRow.appendChild(thDate)
                thDate.innerHTML = availability.date

                for (const attendee of availability.attendees) {
                    const name = attendee.name
                    const available = attendee.available

                    if (!arrayAttendees[name]) {
                        arrayAttendees[name] = {}
                    }
                    arrayAttendees[name][availability.date] = available
                }
            }

            /**
             * list le arrayAttendees et l'ajoute via le DOM
             */
            for (const name in arrayAttendees) {
                // create de row
                const trAttendee = document.createElement('tr')
                tbody.appendChild(trAttendee)
                // create de column des noms
                const tdList = document.createElement('td')
                trAttendee.appendChild(tdList)
                tdList.innerHTML = name
                //create button edit
                const btnEdit = document.createElement('button')
                btnEdit.classList.add("btn-edit");
                tdList.append(btnEdit);
                btnEdit.id = name + idEvent
                btnEdit.innerHTML = ''

                // Event 
                btnEdit.addEventListener('click', event => {
                    //console.log('edit' + name + ' - id:' + idEvent)
                    displayPatchAttend(idEvent, name)
                })
                const availabilityBol = arrayAttendees[name]

                for (const dateInfo in availabilityBol) {

                    // creat de column des disponibilitées
                    const tdList2 = document.createElement('td')
                    trAttendee.appendChild(tdList2)
                    if (availabilityBol[dateInfo])
                        tdList2.innerHTML = 'V'
                    else if (availabilityBol[dateInfo] == null)
                        tdList2.innerHTML = ''
                    else
                        tdList2.innerHTML = 'X'
                }
            }
        }

        // btn div
        const btnDiv = document.createElement('div')
        sectionElem.appendChild(btnDiv)
        btnDiv.classList.add('event-button')
        // create btn DOM
        const btnAddDates = document.createElement('button')
        btnDiv.appendChild(btnAddDates)
        btnAddDates.id = 'btnAddDates'
        btnAddDates.innerHTML = 'Add Dates'

        // create btn DOM
        const btnPatchEvent = document.createElement('button')
        btnDiv.appendChild(btnPatchEvent)
        btnPatchEvent.id = 'btnAddDates'
        btnPatchEvent.innerHTML = 'Patch Event'

        // create btn DOM Add Attend
        const btnPostAttend = document.createElement('button')
        btnDiv.appendChild(btnPostAttend)
        btnPostAttend.id = 'btnAddDates'
        btnPostAttend.innerHTML = 'Add Attend'

        //event
        btnAddDates.addEventListener('click', event => {
            displayAddDate(idEvent)
        })

        //event
        btnPatchEvent.addEventListener('click', event => {
            displayAddEvent('patch', idEvent)
        })

        //event
        btnPostAttend.addEventListener('click', event => {
            displayAddAttend(idEvent)
        })
    }
}
/**
 * Affiche un modale pour infomer l'etat de l'action 
 * @param {*} result 
 */
export function displayMessage(result) {

    //show modale
    const eventElem = document.querySelector('.events')
    const modale = eventElem.querySelector('#messageLog')
    const btnCloseModale = eventElem.querySelector('#closeMessage')
    modale.style.display = 'block'
    const modaleText = modale.querySelector('p')
    modaleText.innerHTML = result

    //console.log(modaleText);

    // close modale messageLog
    btnCloseModale.addEventListener('click', event => {
        closeModale('#messageLog')
        location.reload()
    })


}

  async function displayPatchAttend(id, UserName) {
    //console.log(id, name);
    let arrayDisponibilite = [];
  //show modale
  const modale = document.querySelector('#ajouterDisponibilite')
  modale.style.display = 'block'
  const dateAttendElem= modale.querySelector('.date-attend')
  const btnSubmit = modale.querySelector('#submitDisponibilite')
  const name = modale.querySelector('#attend')
  dateAttendElem.innerHTML = '' //initialise l'element

  name.value = UserName

  try {
    const dataAttend = await displayAttendee(name.value)

    //console.log(dataAttend.events);
    for (const data of dataAttend.events) {
        //console.log(data.id)
        if (data.id === id) {
        //console.log(true)
        //console.log(data.dates)

    for (const dateAttend of data.dates) {
                const dateBox = document.createElement('div')
                const label = document.createElement('lable')
                const checkBox = document.createElement('input')
                checkBox.setAttribute('type', 'checkbox')

                dateAttendElem.appendChild(dateBox)
                dateBox.appendChild(label)
                label.innerHTML = dateAttend.date
                label.setAttribute('for', dataAttend.date)
                dateBox.appendChild(checkBox)
                checkBox.id = dataAttend.date
                checkBox.checked = dateAttend.available
        
    }
        
    }}
    //console.log(arrayDisponibilite)

} catch (error) {
    console.error('Error processing data:', error);
}
};