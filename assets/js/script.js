document.addEventListener('DOMContentLoaded', () => {
    const addEventButton = document.querySelector('.add-event-btn');
    const popupForm = document.getElementById('popup-form');
    const closeBtn = document.querySelector('.close-btn');
    const eventForm = document.getElementById('event-form');

    addEventButton.addEventListener('click', () => {
        console.log("Button clicked!");
        popupForm.classList.remove('popup-hidden');
        console.log("Removed 'popup-hidden' class:", popupForm.classList);
    });

    closeBtn.addEventListener('click', () => {
        console.log("Close button clicked!");
        popupForm.classList.add('popup-hidden');
        console.log("Added 'popup-hidden' class:", popupForm.classList);
    });

    window.addEventListener('click', (event) => {
        if (event.target === popupForm) {
            console.log("Clicked outside popup!");
            popupForm.classList.add('popup-hidden');
            console.log("Added 'popup-hidden' class:", popupForm.classList);
        }
    });

    eventForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const author = document.getElementById('author').value;
        const date1 = document.getElementById('date1').value;
        const date2 = document.getElementById('date2').value;

        console.log("Form submitted!");
        console.log("Name:", name);
        console.log("Description:", description);
        console.log("Author:", author);
        console.log("Date 1:", date1);
        console.log("Date 2:", date2);

        const eventsDiv = document.getElementById('events');

        const eventHTML = `
            <h2>${name}</h2>
            <p>${description} by ${author}</p>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>${date1}</th>
                        <th>${date2 || ''}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Participant 1</td>
                        <td class="yes">V</td>
                        <td class="yes">V</td>
                    </tr>
                    <tr>
                        <td>Participant 2</td>
                        <td class="no">X</td>
                        <td class="yes">V</td>
                    </tr>
                    <tr>
                        <td>Participant 3</td>
                        <td class="yes">V</td>
                        <td class="no">X</td>
                    </tr>
                </tbody>
            </table>
        `;

        eventsDiv.insertAdjacentHTML('beforeend', eventHTML);
        eventForm.reset();
        popupForm.classList.add('popup-hidden');
        console.log("Event added and form reset!");
        console.log("Added 'popup-hidden' class:", popupForm.classList);
    });
});
