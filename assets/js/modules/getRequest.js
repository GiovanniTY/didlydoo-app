

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
 * Cr"ation des events via le DOM
 * @param {*} data de l'api
 */
function creatDomEvent(data) {

    //console.log(data)
    // create DOMsection
    const mainElem = document.querySelector('main')
    const sectionElem = document.createElement('section')
    mainElem.prepend(sectionElem)

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

        //create button del
        const btnDel = document.createElement('button')
        eventNameElem.appendChild(btnDel)
        btnDel.id = idEvent
        btnDel.innerHTML = 'del'

        // Event del
        btnDel.addEventListener('click', event => {
            console.log('edit' + ' - id:' + idEvent)
        })
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

        const tableElem = document.createElement('table')
        availabilityElem.appendChild(tableElem)

        // create  de thead
        const thead = document.createElement('thead')
        const headerRow = document.createElement('tr')
        tableElem.appendChild(thead)
        thead.appendChild(headerRow)
        const th = document.createElement('th')
        headerRow.appendChild(th)
        headerRow.innerHTML = 'name'

        //create de tbody
        const tbody = document.createElement('tbody')
        tableElem.appendChild(tbody)

        /**
         * recupere les date et les disponibilté par user 
         * ex : Jean-Daniel {2022-03-17: false, 2022-03-18: null, 2022-03-21: true, 2022-03-22: null
         */
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
        console.log(arrayAttendees)

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
}