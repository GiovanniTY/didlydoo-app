import { postEvent, postDates } from "./postRequest.js"
import { patchEvent } from "./patchRequest.js"


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
 * affiche un partiicpant selectionner 
 * @param {*} name nom du participant
 */
export function displayAttendee(name) {
    fetch('http://localhost:3000/api/attendees/' + name)
        .then(response => {
            if (!response.ok) {
                console.log('no found')
            }
            return response.json()
        })
        .then(dataAttendee => {
            console.log(dataAttendee.name)
        })
        .catch(error => {
            console.error('Erreur:', error)
        })
}

/**
 * récupère les données dans le form Add Event 
 * envoi ces données dans l'api via une fucntion post ou patch
 * @param {*} methode d'envoi des donnée pour l'api
 * @param {*} id de l'event a modifier (methode Patch)
 */
export function displayAddEvent(methode, id) {

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

        fetch('http://localhost:3000/api/events/' + id)
            .then(response => {
                if (!response.ok) {
                    console.log('no found')
                }
                return response.json()
            })
            .then(dataEvent => {
                eventName.value = dataEvent.name
                eventDescription.value = dataEvent.description
                AuteurEven.value = dataEvent.author

                title.innerHTML = 'Patch un événement : ' + dataEvent.name
            })
            .catch(error => {
                console.error('Erreur:', error)
            })
    }

    btnSubmitEvent.addEventListener('click', event => {
        event.preventDefault()

        arrayBody = {
            "name": eventName.value,
            "description": eventDescription.value,
            "author": AuteurEven.value,
            "dates": []
        }

        if (methode == 'post') {
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
        }
    })
}

function displayAddDate(id) {

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



    date.addEventListener('change', event => {
        let dateValue = date.value

        for (const dates of dateSlected) {
            arrayDates.push(dates.innerHTML)
        }

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
                arrayDatesSelected.splice(datesPostion,1)
            })
        }
    })
    // event Click Submit
    btnSubmitDate.addEventListener('click', event => {
        event.preventDefault()

        console.log(arrayDatesSelected);
        arrayBody = {
            "dates": 
                arrayDatesSelected
        }
       postDates(id, arrayBody)
    })
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
                tdList.append(btnEdit)
                btnEdit.id = name + idEvent
                btnEdit.innerHTML = 'Edit'

                // Event 
                btnEdit.addEventListener('click', event => {
                    console.log('edit' + name + ' - id:' + idEvent)
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

        //event
        btnAddDates.addEventListener('click', event => {
            displayAddDate(idEvent)
        })

        //event
        btnPatchEvent.addEventListener('click', event => {
            displayAddEvent('patch', idEvent)
        })
    }
}